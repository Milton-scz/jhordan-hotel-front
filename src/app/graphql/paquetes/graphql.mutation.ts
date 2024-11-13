import { gql } from 'apollo-angular';

const createPaquete = gql`
  mutation createPaquete($paquete: NewPaquete!) {
    createPaquete(paquete: $paquete) {
      paqueteId
      nombre
      precio
      detalle
    }
  }
`;


const deletePaquete = gql`
  mutation deletePaquete($paqueteId: ID!) {
    deletePaquete(paqueteId: $paqueteId)
  }
`;

export { createPaquete, deletePaquete };
