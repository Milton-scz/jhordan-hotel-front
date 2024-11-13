import { gql } from 'apollo-angular';

const getAllUsers= gql `
query {
  getAllUsers {
    id
    name
    cedula
    telefono
    direccion
    email
    role
    }
}
`;

export { getAllUsers };
