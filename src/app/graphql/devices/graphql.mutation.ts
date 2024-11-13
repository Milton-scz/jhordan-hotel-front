import { gql } from 'apollo-angular';

const createDevice = gql`
  mutation createDevice($device: NewDevice!) {
    createDevice(device: $device) {
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


const deleteDevice = gql`
  mutation deleteDevice($id: ID!) {
    deleteDevice(id: $id)
  }
`;

export { createDevice, deleteDevice };
