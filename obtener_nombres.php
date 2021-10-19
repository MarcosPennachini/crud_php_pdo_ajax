<?php
ini_set('display_errors', 1);
include_once 'connection.php';
include_once 'funciones.php';
header("Access-Control-Allow-Origin: *");

$query = "SELECT nombre FROM usuarios";



try {
    $stmt = $connection->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo 'Error! ', $e->getMessage();
}

echo json_encode($result);
