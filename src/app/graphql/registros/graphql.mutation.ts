import { gql } from 'apollo-angular';

const createRegistro = gql`
  mutation createRegistro($registro: NewRegistro!) {
    createRegistro(registro: $registro) {
      id
      metodo
      trxHash
      fechaCreacion
      fechaModificacion
    }
  }
`;




export { createRegistro};
