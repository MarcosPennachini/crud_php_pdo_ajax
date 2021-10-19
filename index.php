<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <!-- Data Tables -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.1/css/jquery.dataTables.min.css">

    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">

    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/style.css">

    <title>CRUD con Php, PDO, Ajax y DataTables</title>
</head>

<body>
    <div class="container mb-4 pb-4">
        <h1 class="text-center display-5">CRUD con Php, PDO, Ajax y DataTables</h1>
        <div class="row my-4 justify-content-end">
            <div class="col-lg-2 col-xl-2">
                <div class="text-center">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalUsuario" id="btnCrear">
                        <i class="bi bi-plus-circle-fill"> Crear</i>
                    </button>
                </div>
            </div>
        </div>
        <br />

        <div class="card mb-4">
            <div class="card-body">
                <h5>Filtro</h5>
                <form class="row row-cols-lg-auto g-3 align-items-center" id="formularioFiltro">

                    <div class="col-6">
                        <label class="visually-hidden" for="selectNombre">Nombre</label>
                        <select class="form-select" id="selectNombre">
                        </select>
                    </div>

                    <div class="col-6">
                        <button type="submit" class="btn btn-primary">Filtrar</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <div class="table table-responsive table-bordered">
                    <table id="datosUsuario" class="table table-bordered table-striped">
                    </table>
                </div>
            </div>
        </div>
    </div>


    <!-- Modal -->
    <div class="modal fade" id="modalUsuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitle">Crear Usuario</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="POST" id="formulario" enctype="multipart/form-data">

                        <label for="nombre">Ingrese el/los nombres:</label>
                        <input type="text" name="nombre" id="nombre" class="form-control mb-3">

                        <label for="apellido">Ingrese el/los apellidos:</label>
                        <input type="text" name="apellido" id="apellido" class="form-control mb-3">

                        <label for="mail">Ingrese el mail:</label>
                        <input type="email" name="email" id="email" class="form-control mb-3">

                        <label for="telefono">Ingrese el teléfono:</label>
                        <input type="text" name="telefono" id="telefono" class="form-control mb-3">

                        <label for="imagen">Selecciona una imágen:</label>
                        <input type="file" name="imagen_usuario" id="imagenUsuario" class="form-control mb-3">
                        <span id="imagenSubida"></span>

                        <div class="modal-footer">
                            <input type="hidden" name="id_usuario" id="idUsuario">
                            <input type="hidden" name="operacion" id="operacion">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <input type="submit" name="action" id="action" class="btn btn-success" value="Crear">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>



    <!-- Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <!-- JQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

    <!-- DataTables -->
    <script src="https://cdn.datatables.net/1.11.1/js/jquery.dataTables.min.js"></script>

    <!-- Scripts -->
    <script type="text/javascript" src="./js/scripts.js?1.6"></script>
</body>

</html>