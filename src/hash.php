<?php

const SECRET_KEY = "dfgusdg;oiauwhfioap84whgp98yrgb9ah48gilauw4hgfliwau4hglieryg9pzdrfygp9zerhg34w";
const NON_SECRET_KEY = "secretkeywhichisnotsecret"; 

$hashes = [
    function($password, $salt) {
        return md5($password . $salt);
    },
    function($password, $salt) {
        return sha1(md5($password) . $salt);
    },
    function($password, $salt) {
        $a = sha1($password . $salt);
        $b = sha1($salt . $password);
        $result = '';
        for ($i = 0; $i < 40; $i++) {
            $result .= $a[$i] . $b[$i];
        }
        return $result;
    },
    function($password, $salt) {
        return md5(crypt($password, $salt));
    },
    function($password, $salt) {
        return crypt(md5($password . $salt), '$2a$07$usesomesillystringforsalt$');
    },
    function($password, $salt) {
        $a = crypt($password, '$2a$04$' . $salt);
        return str_pad(str_replace(['.', '/'], '', substr($a, -32) . substr($a, -32)), 64, '0');
    },
    function($password, $salt) {
        return str_rot13(hash("sha256", $password . $salt));
    },
    function($password, $salt) {
        return md5(sha1(md5(md5($password) . sha1($salt)) . md5($password)));
    },
    function($password) {
        return md5($password . sha1(md5($password)));
    },
    function($password, $salt) {
        return hash('sha256', hash('sha256', $password) . hash('sha256', $salt));
    },
    function($password, $salt) {
        return (string) crc32(md5($password . $salt));
    },
    function($password) {
        return md5($password) . sha1($password);
    },
    function($password) {
        return str_rot13($password);
    },
    function($password, $salt) {
        return bin2hex($password ^ $salt);
    },
    function($password, $salt) {
        $hash = md5($password . $salt);
        for ($i = 0; $i < strlen($hash); $i++) {
            $hash[$i] = chr(ord($hash[$i]) + $i + 1);
        }
        return bin2hex($hash);
    },
];

$passwords = [
    ["password", "abcdefghijklmnopqrstuvwxyz012345"],
    ["password", "saltsaltsaltsaltsaltsaltsaltsalt"],
    ["apple", "pearpearpearpearpearpearpearpear"],
    ["apple", "orangeorangeorangeorangeorangeor"],
    ["foo", "barbarbarbarbarbarbarbarbarbarba"],
];

$results = [];

foreach ($hashes as $hash) {
    $tmp = [];
    foreach ($passwords as $pass) {
        $tmp[] = ["password" => $pass[0], "salt" => $pass[1], "hash" => $hash($pass[0], $pass[1])];
    }
    $test = array_pop($tmp);
    $test['hash2'] = hash("sha512", $test['hash'] . SECRET_KEY);
    $test['hash'] = hash("sha256", $test['hash'] . NON_SECRET_KEY);
    $results[] = [
        "oracles" => $tmp,
        "test" => $test,
    ];
}

return $results;
