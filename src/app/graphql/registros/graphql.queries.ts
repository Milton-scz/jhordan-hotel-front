import { gql } from 'apollo-angular';


const listaRegistros = gql`
  query getContratos($page: Int!, $size: Int!) {
    getContratos(page: $page, size: $size) {
     pageInfo {
        totalPaginas
        totalElementos
        paginaActual
        pageSize
      }
      items{
        id
        metodo
        trxHash
        fechaCreacion
        fechaModificacion
      }
    }
  }
`;


export { listaRegistros };
