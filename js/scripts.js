var datatable = $('#datosUsuario').DataTable({
  processing: true,
  serverSide: true,
  ordering: false,
  order: [],
  ajax: {
    url: 'obtener_registros.php',
    type: 'POST',
  },
  columnsDefs: [
    {
      targets: 0,
      orderable: false,
    },
  ],
});

$(document).ready(function () {
  $('#btnCrear').click(function (e) {
    e.preventDefault();
    document.querySelector('#formulario').reset();
    $('.modal-title').text('Crear usuario');
    $('#action').val('Crear');
    $('#operacion').val('Crear');
    $('#operacion').val('Crear');
    $('#imagenSubida').html('');
  });
});

$('#formulario').submit(function (evt) {
  evt.preventDefault();
  var nombres = $('#nombre').val();
  var apellido = $('#apellido').val();
  var email = $('#email').val();
  var telefono = $('#telefono').val();
  var extension = $('#imagenUsuario').val().split('.').pop().toLowerCase();

  if (extension != '') {
    if ($.inArray(extension, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
      alert('Formato de imagen inválido');
      $('imagenUsuario').val('');
      return false;
    }
  }

  if (nombres != '' && apellido != '' && telefono != '' && email != '') {
    $.ajax({
      method: 'POST',
      url: 'crear.php',
      data: new FormData(this),
      contentType: false,
      processData: false,
      success: function (response) {
        console.log(response);
        $('#formulario')[0].reset();
        $('#modalUsuario').modal('hide');
        datatable.ajax.reload();
      },
    }).fail(function (jqXHR, textStatus, errorThrown) {
      var errorMessage =
        jqXHR.text + ': ' + jqXHR.textStatus + '- ' + textStatus;
      console.log(errorMessage);
      if (jqXHR.status === 0) {
        alert('Not connect: Verify Network.');
      } else if (jqXHR.status == 404) {
        alert('Requested page not found [404]');
      } else if (jqXHR.status == 500) {
        alert('Internal Server Error [500].');
      } else if (textStatus === 'parsererror') {
        alert('Requested JSON parse failed.');
      } else if (textStatus === 'timeout') {
        alert('Time out error.');
      } else if (textStatus === 'abort') {
        alert('Ajax request aborted.');
      } else {
        alert('Uncaught Error: ' + jqXHR.responseText);
      }
    });
  }
});

// const formulario = document.querySelector('#formulario');
// formulario.addEventListener('submit', (evt) => {
//   evt.preventDefault();
// });
