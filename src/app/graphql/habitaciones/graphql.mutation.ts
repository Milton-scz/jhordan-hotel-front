import { gql } from 'apollo-angular';

// Mutation para crear una habitación
const createHabitacion = gql`
  mutation createHabitacion($habitacion: NewHabitacion!) {
    createHabitacion(habitacion: $habitacion) {
      id
      numeroHabitacion
      capacidad
      detalles
      precioPorNoche
      estado
      tipo
      device{
      id
      uuid
      nombre
      tipo
      status
      ocupadoDisponible
      }
    }
  }
`;

// Mutation para eliminar una habitación
const deleteHabitacion = gql`
  mutation deleteHabitacion($id: ID!) {
    deleteHabitacion(id: $id)
  }
`;

export { createHabitacion, deleteHabitacion };
