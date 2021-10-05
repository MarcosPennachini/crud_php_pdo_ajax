// INICIALIZACIÓN DATATABLE
var datatable = $('#datosUsuario').DataTable({
  bLengthChange: false,
  language: {
    loadingRecords: 'Cargando datos...',
    emptyTable: 'No se encontraron resultados',
    paginate: {
      next: 'Siguiente',
      previous: 'Anterior',
    },
    search: 'Buscar:',
    info: 'Mostrando _START_ - _END_ de _TOTAL_ de registros',
  },
  ordering: false,
  order: [],
  ajax: {
    url: 'obtener_registros.php',
    type: 'POST',
    dataType: 'json',
    dataSrc: function (response) {
      if (response) {
        return response;
      } else {
        alert('Error al cargar los datos');
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
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
    },
  },
  columnsDefs: [
    {
      targets: 0,
      orderable: false,
    },
  ],
});

// CARGA DE LA PÁGINA
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

  /*
   * CARGA DE COMBO
   */
  $.ajax({
    type: 'post',
    url: 'obtener_nombres.php',
    dataType: 'json',
    success: function (response) {
      var template = '';
      $.each(response, function (index, element) {
        template += `<option value="${element.nombre}">${element.nombre}</option>`;
      });
      $('#selectNombre').html(template).fadeIn(150);
    },
  }).fail(function (jqXHR, textStatus, errorThrown) {
    var errorMessage = jqXHR.text + ': ' + jqXHR.textStatus + '- ' + textStatus;
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

  /*
   *RELOAD DE DATATABLE AL FILTRAR
   */

  $('#formularioSelect').submit(function (e) {
    e.preventDefault();
    var selectNombre = $('#selectNombre').val();
    $.ajax({
      method: 'post',
      url: '../obtener_nombres.php',
      data: { selectNombre: selectNombre },
      dataType: 'json',
      success: function (response) {
        console.log(response);
      },
    });
  });
});

// SUBMIT DE FORMULARIO
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

//EDITAR
$('input[name=editar]').click(function (e) {
  e.preventDefault();
  var idUsuario = $(this).attr('id');
  $.ajax({
    url: 'obtener_registro.php',
    method: 'post',
    data: { idUsuario: idUsuario },
    dataType: 'json',
    success: function (response) {},
  });
});
