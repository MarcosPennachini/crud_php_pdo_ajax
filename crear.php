<?php
ini_set('display_errors', 1);
include_once 'connection.php';
include_once 'funciones.php';

if ($_POST['operacion'] == 'Crear') {
    $imagen = '';
    if ($_FILES['imagen_usuario'] != '') {
        $imagen = subir_imagen();
    }

    // CAMPOS DEL FORM
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $telefono = $_POST['telefono'];
    $email = $_POST['email'];

    $query = "INSERT INTO usuarios(nombre, apellido, imagen, telefono, email) VALUES (:nombre, :apellido, :imagen, :telefono, :email)";

    try {
        $stmt = $connection->prepare($query);
        $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
        $stmt->bindParam(':apellido', $apellido, PDO::PARAM_STR);
        $stmt->bindParam(':telefono', $telefono, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':imagen', $imagen, PDO::PARAM_STR);

        $stmt->execute();
        $result = $connection->lastInsertId();
    } catch (PDOException $e) {
        echo 'Error!', $e->getMessage();
        die();
    }

    $input = array(
        'id' => $result,
        'nombre' => $nombre,
        'apellido' => $apellido,
        'telefono' => $telefono,
        'email' => $email,
        'imagen' => $imagen
    );

    if ($result) {
        header("HTTP/1.1 200 OK");
        echo json_encode($input);
        exit();
    }
}

if ($_POST['operacion'] == 'Editar') {
    $imagen = '';
    if ($_FILES['imagen_usuario'] != '') {
        $imagen = subir_imagen();
    } else {
        $imagen = $_POST['imagen_usuario_oculta'];
    }

    //CAMPOS DEL FORM
    $id = $_POST['id_usuario'];
    $nombreEdit = $_POST['nombre'];
    $apellidoEdit = $_POST['apellido'];
    $telefonoEdit = $_POST['telefono'];
    $emailEdit = $_POST['email'];

    $query = "UPDATE usuarios SET nombre=:nombre, apellido=:apellido, imagen=:imagen, telefono=:telefono, email=:email WHERE id=:id";

    try {
        $stmt = $connection->prepare($query);
        $stmt->bindParam(':nombre', $nombreEdit, PDO::PARAM_STR);
        $stmt->bindParam(':apellido', $apellidoEdit, PDO::PARAM_STR);
        $stmt->bindParam(':imagen', $imagen, PDO::PARAM_STR);
        $stmt->bindParam(':telefono', $telefonoEdit, PDO::PARAM_STR);
        $stmt->bindParam(':email', $emailEdit, PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        $stmt->execute();
    } catch (PDOException $e) {
        echo "Error!", $e->getMessage();
        die();
    }

    $updatedUser = array(
        "updated_id" => $id
    );

    header("HTTP/1.1 200 OK");
    echo json_encode($updatedUser);
    exit();
}
