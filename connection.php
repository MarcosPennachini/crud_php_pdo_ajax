<?php

$user = 'root';
$pass = '';
$host = 'localhost';
$database = 'crud_usuarios';

try {
    $connection = new PDO("mysql:host=$host;dbname=$database", $user, $pass);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'ERROR: No se pudo conectar a la base da datos', $e->getMessage();
}
