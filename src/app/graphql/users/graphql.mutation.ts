import { gql } from 'apollo-angular';

const authenticateUser = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const createUser = gql`
      mutation createUser($name: String!, $cedula: String!, $telefono: String!, $direccion: String!, $email: String!, $password: String!, $role: Role!) {
  createUser(user: { name: $name,cedula: $cedula,telefono: $telefono,direccion: $direccion, email: $email, password: $password, role: $role }) {
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

const updateUser = gql`
      mutation UpdateUser($name: String!, $cedula: String!, $telefono: String!, $direccion: String!, $email: String!, $role: Role!) {
  updateUser(user: { name: $name,cedula: $cedula,telefono: $telefono,direccion: $direccion, email: $email,role: $role }) {
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


const deleteUser = gql`
mutation deleteUser($id: ID!) {
  deleteUser(id: $id)
}
`;


export { authenticateUser, createUser,deleteUser,updateUser };
