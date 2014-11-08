<?php

if (!isset($_GET['token']) || $_GET['token'] !== hash_hmac("sha256", floor(time() / 600), "supersecretkey")) {
    header("Status: 404 Not Found");
    $error = <<<ERROR
<html><head>
<meta http-equiv="content-type" content="text/html;charset=utf-8">
<title>404 Not Found</title>
</head>
<body text=#000000 bgcolor=#ffffff>
<h1>Error: Not Found</h1>
<h2>The requested URL <code>/foo</code> was not found on this server.</h2>
<h2></h2>
</body></html>
ERROR;
    echo $error;
    die();
}

$isProd = isset($_SERVER['SERVER_SOFTWARE']) && substr($_SERVER['SERVER_SOFTWARE'], 0, 17) == 'Google App Engine';

define("ISPROD", $isProd);

$memcache = new Memcache;

$data = $memcache->get("rawstats");
if ($data === false) {
    header("X-Memcache: miss");
    $data = gen_stats();
    $memcache->set("rawstats", $data);
}
header("Cache-Control: public, max-age 3600");
$options = defined('JSON_PRETTY_PRINT') ? JSON_PRETTY_PRINT : 0;
echo json_encode($data, $options);

function getPDO() {
    static $client;
    if (is_null($client)) {
        if (ISPROD) {
            // generate a new instance!
            $client = new PDO("mysql:unix_socket=/cloudsql/hashguesser:taerga34gawegrt;", "root", "");
        } else {
            $client = new PDO("mysql:host=127.0.0.1", "hashchecker", "hashchecker");
        }
    }
    return $client;
}


function gen_stats() {
    $results = [];
    $pdo = getPDO();
    $sql = "SELECT * FROM hash_results.results ORDER BY `total` DESC";
    $results = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    return $results;
}
