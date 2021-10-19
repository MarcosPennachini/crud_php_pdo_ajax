<?php
//ini_set('display_errors', 1);
include_once 'connection.php';
include_once 'funciones.php';
header("Access-Control-Allow-Origin: *");

$query = "SELECT * FROM usuarios ";

if (isset($_GET['nombre'])) {
    // var_dump($_GET['nombre']);
    $nombreFiltrado = $_GET['nombre'];
    $query .= "WHERE nombre='$nombreFiltrado'";
}

try {
    $stmt = $connection->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $filtered_rows = $stmt->rowCount();
} catch (PDOException $e) {
    //echo 'Error! ', $e->getMessage();
    throw $e->getCode();
    die();
}


// PREPARO LA SALIDA
$datos = array();
$salida = array();

foreach ($result as $fila) {
    $imagen = '';
    if ($fila["imagen"] != '') {
        $imagen = '<img src="img/' . $fila["imagen"] . '" class="img-thumbnail" width="50" height="50">';
    } else {
        $imagen = '';
    }


    $datos['id'] = $fila["id"];
    $datos['nombre'] = $fila["nombre"];
    $datos['apellido'] = $fila["apellido"];
    $datos['telefono'] = $fila["telefono"];
    $datos['email'] = $fila["email"];
    $datos['imagen'] = $imagen;
    $datos['fecha'] = $fila["fecha_creacion"];
    $datos['editar'] = '<button type="button" name="editar" id="' . $fila["id"] . '" class="btn btn-warning btn-xs editar">Editar</button>';
    $datos['borrar'] = '<button type="button" name="borrar" id="' . $fila["id"] . '" class="btn btn-danger btn-xs borrar">Borrar</button>';
    $salida[] = $datos;
}

echo json_encode($salida);
