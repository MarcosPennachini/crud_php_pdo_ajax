<?php

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
    require_once('connection.php');
    $query = "SELECT imagen FROM usuarios WHERE id=:id_usuario";
    $stmt = $connection->prepare($query);
    $stmt->bindParam('id', $idUsuario, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetchAll();
    foreach ($result as $fila) {
        return $fila['imagen'];
    }
}

function obtener_todos_registros()
{
    require_once('connection.php');
    $query = "SELECT * FROM usuarios";
    $stmt = $connection->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();
    return $stmt->rowCount();
}
