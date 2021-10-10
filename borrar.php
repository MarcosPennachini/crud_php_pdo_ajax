<?php
ini_set("display_errors", 1);
include_once 'connection.php';
include_once 'funciones.php';

if (isset($_GET['idUsuario'])) {
    $id = $_GET['idUsuario'];
    $imagen = obtener_nombre_imagen($id);
    if ($imagen != '') {
        unlink('img/' . $imagen);
    }

    $query = "DELETE FROM usuarios WHERE id=:id";

    try {
        $stmt = $connection->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
    } catch (PDOException $e) {
        echo "Error!", $e->getMessage();
        die();
    }

    $deletedUser = array(
        'deleted_id' => $id
    );

    header("HTTP/1.1 200 OK");
    echo json_encode($deletedUser);
    exit();
}
