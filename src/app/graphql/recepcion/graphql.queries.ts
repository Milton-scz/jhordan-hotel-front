import { gql } from 'apollo-angular';


const listaRecepciones = gql`
  query getRecepciones($page: Int!, $size: Int!) {
    getRecepciones(page: $page, size: $size) {
     pageInfo {
        totalPaginas
        totalElementos
        paginaActual
        pageSize
      }
      items{
        id
        user{
        id
        name
        cedula
        email
        }
        paquete{
        paqueteId
        nombre
        precio
        detalle
        }
       fechaEntrada
       fechaSalida
       adelanto
       descuento
       totalAPagar
       preferencias
       observaciones
       tipo
      }
    }
  }
`;

const getAllRecepciones= gql `
query {
  getAllRecepciones {
    id
    habitacion{
    id
    numeroHabitacion
    estado
    precioPorNoche
    tipo
    }
    user{
    id
    name
    telefono
    cedula
    }

   fechaEntrada
   fechaSalida
   adelanto
   descuento
   totalAPagar
   preferencias
   observaciones
   tipo
   terminado
    }
}
`;

const getRecepcionByUser = gql`
      query getRecepcionByUser($cedula: String!) {
  getRecepcionByUser( cedula: $cedula) {
    id
    habitacion{
    id
    numeroHabitacion
    estado
    }
    user{
    name
    cedula
    telefono
    }

  }
}
`;

export { listaRecepciones ,getAllRecepciones,getRecepcionByUser};
