<?php
ini_set('display_errors', 1);
include_once 'connection.php';
include_once 'funciones.php';

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
    echo 'Error! ', $e->getMessage();
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

    $sub_array = array();
    $sub_array[] = $fila["id"];
    $sub_array[] = $fila["nombre"];
    $sub_array[] = $fila["apellido"];
    $sub_array[] = $fila["telefono"];
    $sub_array[] = $fila["email"];
    $sub_array[] = $imagen;
    $sub_array[] = $fila["fecha_creacion"];
    $sub_array[] = '<button type="button" name="editar" id="' . $fila["id"] . '" class="btn btn-warning btn-xs editar">Editar</button>';
    $sub_array[] = '<button type="button" name="borrar" id="' . $fila["id"] . '" class="btn btn-danger btn-xs borrar">Borrar</button>';
    $datos[] = $sub_array;
}

echo json_encode($datos);
