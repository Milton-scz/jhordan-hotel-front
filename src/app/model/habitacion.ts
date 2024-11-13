import { Device } from "./device";

export class Habitacion {
  id!: number;
  numeroHabitacion: number;
  capacidad: number;
  detalles: string;
  precioPorNoche: number;
  estado: Status;  // Usando el enum Status
  tipo: Tipo;      // Usando el enum Tipo
  device: Device;

  // Constructor
  constructor(
    id: number,
    numeroHabitacion: number,
    capacidad: number,
    detalles: string,
    precioPorNoche: number,
    estado: Status,
    tipo: Tipo,
    device: Device
  ) {
    this.id = id;
    this.numeroHabitacion = numeroHabitacion;
    this.capacidad = capacidad;
    this.detalles = detalles;
    this.precioPorNoche = precioPorNoche;
    this.estado = estado;
    this.tipo = tipo;
    this.device = device;
  }
}


export enum Tipo {
  SIMPLE = "SIMPLE",
  DOBLE = "DOBLE",
  SUITE = "SUITE"
}

export enum Status {
  MANTENIMIENTO = "MANTENIMIENTO",
  DISPONIBLE = "DISPONIBLE",
  RESERVADO = "RESERVADO",
  OCUPADO = "OCUPADO"
}


