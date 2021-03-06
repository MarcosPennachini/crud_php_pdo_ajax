// CARGA DE LA PÁGINA
$(document).ready(function () {
  $('#btnCrear').click(function (e) {
    e.preventDefault();
    document.querySelector('#formulario').reset();
    $('.modal-title').text('Crear usuario');
    $('#action').val('Crear');
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

  $('#formularioFiltro').submit(function (e) {
    e.preventDefault();
    let columns = [];
    var selectValue = $('#selectNombre').val();
    $.ajax({
      method: 'get',
      url: `obtener_registros.php`,
      data: { nombre: selectValue },
      dataType: 'json',
      success: function (response) {
        console.log(response);

        /**
         * Obtiene los valores de las llaves del objeto response
         * para cargar los nombres de las columnas dinámicamente
         */
        const columnNames = Object.keys(response[0]);
        for (let i in columnNames) {
          columns.push({
            data: columnNames[i],
            title: columnNames[i],
          });
        }

        /**
         * Inicializa la tabla Datatable.
         * Lo hace acá para cargar los nombres de las columnas,
         * en base a los valores obtenidos.
         */
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
          destroy: true, //Destruye la tabla para poder instanciar una nueva cada vez que cambia el valor del select
          data: response,
          columns: columns,
          columnsDefs: [
            {
              targets: 0,
              orderable: false,
            },
          ],
        });
        //datatable.clear().rows.add(value).draw();
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
  });

  //EDITAR
  $('#datosUsuario').on('click', '.editar', function (e) {
    e.preventDefault();
    var idUsuario = $(this).attr('id');
    $.ajax({
      url: 'obtener_registro.php',
      method: 'get',
      data: { idUsuario: idUsuario },
      dataType: 'json',
      success: function (response) {
        console.log(response);
        $('#modalUsuario').modal('show');
        $('#nombre').val(response.nombre);
        $('#apellido').val(response.apellido);
        $('#email').val(response.email);
        $('#telefono').val(response.telefono);
        $('#imagenSubida').html(response.imagen);
        $('#modalTitle').text('Editar usuario');
        $('#idUsuario').val(response.id);
        $('#action').val('Editar');
        $('#operacion').val('Editar');
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
  $('#datosUsuario').on('click', '.editar', function (e) {
    e.preventDefault();
    let idUsuario = $(this).attr('id');
    $.ajax({
      url: 'obtener_registro.php',
      method: 'get',
      data: { idUsuario: idUsuario },
      dataType: 'json',
      success: function (response) {
        console.log(response);
        $('#modalUsuario').modal('show');
        $('#nombre').val(response.nombre);
        $('#apellido').val(response.apellido);
        $('#email').val(response.email);
        $('#telefono').val(response.telefono);
        $('#imagenSubida').html(response.imagen);
        $('#modalTitle').text('Editar usuario');
        $('#idUsuario').val(response.id);
        $('#action').val('Editar');
        $('#operacion').val('Editar');
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
  });

  //BORRAR
  $('#datosUsuario').on('click', '.borrar', function (e) {
    e.preventDefault();
    let idUsuario = $(this).attr('id');
    if (
      confirm(
        'Está seguro de que desea borrar este registro: ' + idUsuario + '?'
      )
    ) {
      $.ajax({
        type: 'get',
        url: 'borrar.php',
        data: { idUsuario: idUsuario },
        dataType: 'json',
        success: function (response) {
          console.log(response);
          datatable.ajax.reload();
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
      });
    }
  });
});
