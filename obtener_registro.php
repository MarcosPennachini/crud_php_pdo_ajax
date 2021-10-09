<?php

ini_set("display_errors", 1);
include_once 'connection.php';
include_once 'funciones.php';

if (isset($_GET['idUsuario'])) {
    $id_usuario = $_GET['idUsuario'];
    $query = "SELECT * FROM usuarios WHERE id='$id_usuario' LIMIT 1";
}

try {
    $stmt = $connection->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo "Error! ", $e->getMessage();
    die();
}

$data = array();

foreach ($result as $fila) {
    $data['nombre'] = $fila['nombre'];
    $data['apellido'] = $fila['apellido'];
    $data['telefono'] = $fila['telefono'];
    $data['email'] = $fila['email'];

    if ($fila['imagen'] != '') {
        $data['imagen'] = '<img src="img/' . $fila["imagen"] . '" class="img-thumbnail" width="50" height="50"><input type="hidden" name="imagen_usuario_oculta" value="' . $fila['imagen'] . '">';
    } else {
        $data['imagen'] = '<input type="hidden" name="imagen_usuario_oculta" value="' . $fila['imagen'] . '">';
    }
}

echo json_encode($data);
