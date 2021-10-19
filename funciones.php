<?php
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");

function subir_imagen()
{
    if (isset($_FILES['imagen_usuario'])) {
        $extension = explode('.', $_FILES['imagen_usuario']['name']);
        $nuevo_nombre = rand() . '.' . $extension[1];
        $ubicacion = './img/' . $nuevo_nombre;
        move_uploaded_file($_FILES['imagen_usuario']['tmp_name'], $ubicacion);
        return $nuevo_nombre;
    }
}

function obtener_nombre_imagen($idUsuario)
{
    try {
        require('connection.php');
        $query = "SELECT imagen FROM usuarios WHERE id=:id_usuario";
        $stmt = $connection->prepare($query);
        $stmt->bindParam(':id_usuario', $idUsuario, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll();
    } catch (PDOException $e) {
        echo 'Error! ', $e->getMessage();
    }

    foreach ($result as $fila) {
        return $fila['imagen'];
    }
}

function obtener_todos_registros()
{
    try {
        require('connection.php');
        $query = "SELECT * FROM usuarios";
        $stmt = $connection->prepare($query);
        $stmt->execute();
        $stmt->fetchAll();
        return $stmt->rowCount();
    } catch (PDOException $e) {
        echo 'Error! ', $e->getMessage();
    }
}
