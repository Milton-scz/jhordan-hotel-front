import { gql } from 'apollo-angular';


const listaDevices = gql`
  query getDevices($page: Int!, $size: Int!) {
    getDevices(page: $page, size: $size) {
     pageInfo {
        totalPaginas
        totalElementos
        paginaActual
        pageSize
      }
      items{
        id
        uuid
        nombre
        tipo
        descripcion
        status
        ocupadoDisponible
      }
    }
  }
`;
const getAllDevices= gql `
query {
  getAllDevices {
    id
    uuid
    nombre
    tipo
    descripcion
    status
    ocupadoDisponible
    }
}
`;

export { listaDevices, getAllDevices};
