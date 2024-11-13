import { Habitacion } from "./habitacion";
import { Paquete } from "./paquete";
import { User } from "./user";

export class Recepcion {
  id: number;
  habitacion: Habitacion;
  user: User;
  paquete: Paquete;
  fechaEntrada: string;
  fechaSalida: string;
  adelanto: number;
  descuento: number;
  totalAPagar: number;
  tipo: string;
  preferencias: string;
  observaciones: string;
  terminado: boolean;

  constructor(
    id: number,
    habitacion:Habitacion,
    user: User,
    paquete: Paquete,
    fechaEntrada: string,
    fechaSalida: string,
    adelanto: number,
    descuento: number,
    totalAPagar: number,
    tipo: TIPO_REGISTRO,
    preferencias: string,
    observaciones: string,
    terminado:boolean
  ) {
    this.id = id;
    this.habitacion = habitacion;
    this.user = user;
    this.paquete = paquete;
    this.fechaEntrada = fechaEntrada;
    this.fechaSalida = fechaSalida;
    this.adelanto = adelanto;
    this.descuento = descuento;
    this.totalAPagar = totalAPagar;
    this.tipo = tipo;
    this.preferencias = preferencias;
    this.observaciones = observaciones;
    this.terminado = terminado;
  }
}
export enum TIPO_REGISTRO {
  hOSPEDAJE = "HOSPEDAJE",
  RESERVA = "RESERVA"
}
