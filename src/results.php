<?php

require_once dirname(__DIR__) . "/vendor/autoload.php";

$isProd = isset($_SERVER['SERVER_SOFTWARE']) && substr($_SERVER['SERVER_SOFTWARE'], 0, 17) == 'Google App Engine';

define("ISPROD", $isProd);

$hashes = require_once __DIR__ . "/hash.php";

$memcache = new Memcache;

switch (strtolower($_SERVER['REQUEST_METHOD'])) {
    case "get":
        $data = $memcache->get("stats");
        if ($data === false) {
            header("X-Memcache: miss");
            $data = gen_stats();
            $memcache->set("stats", $data);
        }
        header("Cache-Control: public, max-age 3600");
        echo json_encode($data);
        break;
    case "post":
        // generate id
        if (!isset($_COOKIE['sid'])) {
            $id = hash("sha256", (time() . microtime(true) . mt_rand() . uniqid()));
            // Not really important, but let's set it anyway.
            setcookie("sid", $id, 2 << 32 - 1);
        } else {
            $id = $_COOKIE['sid'];
        }
        $data = @json_decode(file_get_contents('php://input'));
        if ($data) {
            processData($data, $id);
            $stats = gen_stats();
            $memcache->set("stats", $stats);
            echo json_encode($stats);
        }
        break;
    default:
        header("Status: 400 Bad Request");
        echo "Unknown Request";
}

function processData($data, $id) {
    global $hashes;
    $valid = [];
    foreach ($data as $key => $val) {
        if (!isset($hashes[$key])) {
            continue;
        }
        if ($hashes[$key]['test']['hash2'] == hash("sha512", $data[$key] . SECRET_KEY)) {
            $valid[$key] = true;
        }
    }
    if (!empty($valid)) {
        storeValidData($valid, $id);
    }
}

function storeValidData($rawdata, $id) {
    $client = getPDO();
    $sql = "INSERT INTO hash_results.results (id ";
    $data = [$id];
    $total = 0;
    foreach ($rawdata as $key => $value) {
        $sql .= ", hash$key";
        $data[] = 1;
        $total += 1;
    }
    $data[] = $total;
    $sql .= ", total) VALUES (" . implode(", ", array_fill(0, count($data), '?')) . ') ON DUPLICATE KEY UPDATE ';
    foreach ($rawdata as $key => $value) {
        $sql .= " hash$key = VALUES(hash$key), ";
    }
    $sum = "";
    $sep = "";
    for ($i = 0; $i < 15; $i++) {
        $sum .= $sep . (isset($rawdata[$i]) ? " VALUES(hash$i) " : " hash_results.results.hash$i ");
        $sep = "+";
    } 
    $sql .= "total = ($sum)";
    $client->prepare($sql)->execute($data);
}

function getPDO() {
    static $client;
    if (is_null($client)) {
        if (ISPROD) {
            // generate a new instance!
            $client = new PDO("mysql:unix_socket=/cloudsql/hashguesser:taerga34gawegrt;", "root", "");
        } else {
            $client = new PDO("mysql:host=127.0.0.1", "hashchecker", "hashchecker");
        }
//        needsUpdate($client);
    }
    return $client;
}

function needsUpdate($client) {
    $client->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $query = "SELECT * FROM hash_results.versions";
    $needsUpdate = false;
    $version = 1;
    $currentVersion = 0;
    try {
        foreach ($client->query($query)->fetchAll() as $row) {
            if ($row['version'] < $version) {
                $currentVersion = $row['version'];
                $needsUpdate = true;
            }
        }
    } catch (\PDOException $e) {
        $needsUpdate = true;
    }
    if ($needsUpdate) {
        updateDb($client);
    }
}

function updateDb($pdo) {
    $sql = "CREATE DATABASE IF NOT EXISTS hash_results;";
    $pdo->exec($sql);
    switch ($currentVersion) {
        case 0:
            $sql = "CREATE TABLE hash_results.versions ( version INT )";
            $pdo->exec($sql);
            $sql = "CREATE TABLE hash_results.results (
                id VARCHAR(255) UNIQUE KEY,
                hash0 TINYINT DEFAULT 0,
                hash1 TINYINT DEFAULT 0,
                hash2 TINYINT DEFAULT 0,
                hash3 TINYINT DEFAULT 0,
                hash4 TINYINT DEFAULT 0,
                hash5 TINYINT DEFAULT 0,
                hash6 TINYINT DEFAULT 0,
                hash7 TINYINT DEFAULT 0,
                hash8 TINYINT DEFAULT 0,
                hash9 TINYINT DEFAULT 0,
                hash10 TINYINT DEFAULT 0,
                hash11 TINYINT DEFAULT 0,
                hash12 TINYINT DEFAULT 0,
                hash13 TINYINT DEFAULT 0,
                hash14 TINYINT DEFAULT 0,
                total TINYINT,
                INDEX total_idx (total)
            )";
            $pdo->exec($sql);
            $sql = "INSERT INTO hash_results.versions (1)";
            $pdo->exec($sql);
            //fall through intentional
    }
}

function gen_stats() {
    $results = [];
    $pdo = getPDO();
    $sql = "SELECT COUNT(*) AS users, MAX(total) AS best, AVG(total) AS average FROM hash_results.results";
    $results['all'] = $pdo->query($sql)->fetch(PDO::FETCH_ASSOC);
    $results['hash'] = [];
    $sql = "SELECT ";
    $sep = "";
    for ($i = 0; $i < 15; $i++) {
        $sql .= "$sep SUM(hash$i) AS hash$i";
        $sep = ",";
    }
    $sql .= " FROM hash_results.results";
    $row = $pdo->query($sql)->fetch(PDO::FETCH_ASSOC);
    for ($i = 0; $i < 15; $i++) {
        $results['hash'][$i] = (int) $row['hash' . $i];
    }
    return $results;
}
