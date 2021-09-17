$(document).ready(function () {
  $('#datosUsuario').DataTable({
    processing: true,
    serverSide: true,
    order: [],
    ajax: {
      url: 'obtener_registros.php',
      type: 'POST',
    },
    columnsDefs: [
      {
        targets: [0, 3, 4],
        orderable: false,
      },
    ],
  });
});

$('#document').submit(function (evt) {
  evt.preventDefault();
  var nombres = $('#nombre').val();
  var apellido = $('#apellido').val();
  var mail = $('#mail').val();
  var telefono = $('#telefono').val();
  var extension = $('#imagenUsuario').val().split('.').pop().toLowerCase();

  if (extension != '') {
    if ($inArray(extension, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
      alert('Formato de imgen inválido');
      return false;
    }
  }

  if (nombres != '' && apellido != '' && telefono != '') {
    $.ajax({
      method: 'POST',
      url: 'crear.php',
      data: new FormData(this),
      contentType: false,
      processData: false,
      success: function (data) {
        alert(data);
        $('#formulario').reset();
        $('#modalUsuario').hide();
        dataTable.ajax.reload();
      },
    });
  } else {
    alert('Algunos datos son obligatorios');
  }
});

// const formulario = document.querySelector('#formulario');
// formulario.addEventListener('submit', (evt) => {
//   evt.preventDefault();
// });
