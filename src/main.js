import './style.css';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';

const API_URL = "https://gist.githubusercontent.com/AnndresRodriguez/a4216e3f82f45fc4514dc954f967fe9a/raw/a41bf12c2e12cc5e2db88ee30b0d7d3ddaf3f6c2/models.json";

async function cargarDatos() {
  try {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
      throw new Error('Error al consumir la API');
    }

    const datos = await respuesta.json();

    new DataTable('#tabla-posts', {
      data: datos.marcas,
      columns: [
        { data: 'id' },
        { data: 'nombre' },
        {
          data: 'modelos',
          render: function (modelos) {
            return modelos.join(', ');
          }
        }
      ],
      pageLength: 10,
      language: {
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ registros',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
        paginate: {
          previous: 'Anterior',
          next: 'Siguiente'
        }
      }
    });
  } catch (error) {
    console.error(error);
    document.querySelector('#app').innerHTML += `
      <p class="error">No se pudieron cargar los datos.</p>
    `;
  }
}

cargarDatos();