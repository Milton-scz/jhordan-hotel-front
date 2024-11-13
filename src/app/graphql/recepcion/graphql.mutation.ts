import { gql } from 'apollo-angular';

const createRecepcion = gql`
  mutation createRecepcion(
    $numeroHabitacion: Int!,
    $cedula: String!,
    $paqueteId: ID,
    $fechaEntrada: String,
    $fechaSalida: String,
    $adelanto: Float,
    $descuento: Float,
    $totalAPagar: Float,
    $tipo: String!,
    $preferencias: String,
    $observaciones: String
  ) {
    createRecepcion(
      numeroHabitacion: $numeroHabitacion,
      cedula: $cedula,
      paqueteId: $paqueteId,
      fechaEntrada: $fechaEntrada,
      fechaSalida: $fechaSalida,
      adelanto: $adelanto,
      descuento: $descuento,
      totalAPagar: $totalAPagar,
      tipo: $tipo,
      preferencias: $preferencias,
      observaciones: $observaciones
    ) {
      id
    }
  }
`;

const updateRecepcion = gql`
      mutation UpdateRecepcion($id: ID!) {
  updateRecepcion( id: $id) {
    id

  }
}
`;

export { createRecepcion , updateRecepcion};
