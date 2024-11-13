import { gql } from 'apollo-angular';

const listaHabitaciones = gql`
  query getHabitaciones($page: Int!, $size: Int!) {
    getHabitaciones(page: $page, size: $size) {
      pageInfo {
        totalPaginas
        totalElementos
        paginaActual
        pageSize
      }
      items {
        id
        numeroHabitacion
        capacidad
        detalles
        precioPorNoche
        estado
        tipo
        device{
        id
        nombre
        tipo
        status
        ocupadoDisponible
        }
      }
    }
  }
`;

const getAllHabitaciones = gql`
  query {
    getAllHabitaciones {
      id
      numeroHabitacion
      capacidad
      detalles
      precioPorNoche
      estado
      tipo
    }
  }
`;

const getHabitacion = gql`
  query getHabitacion($id: ID!) {
    getHabitacion(id: $id){
    id
    numeroHabitacion
    precioPorNoche
    estado
    tipo
    capacidad
    detalles
    }
  }
`;

export { listaHabitaciones, getAllHabitaciones ,getHabitacion};
