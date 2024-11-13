import { gql } from 'apollo-angular';


const listaPaquetes = gql`
  query getPaquetes($page: Int!, $size: Int!) {
    getPaquetes(page: $page, size: $size) {
     pageInfo {
        totalPaginas
        totalElementos
        paginaActual
        pageSize
      }
      items{
        paqueteId
        precio
        nombre
        detalle
      }
    }
  }
`;
const getAllPaquetes= gql `
query {
  getAllPaquetes {
    paqueteId
    nombre
    precio
    detalle
    }
}
`;

export { listaPaquetes, getAllPaquetes};
