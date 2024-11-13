export class Device {
  id!: number;
  uuid: string;
  nombre: string;
  tipo: string;
  descripcion: string;
  status: string;
  ocupadoDisponible: OcupadoDisponible;

  // Constructor corregido
  constructor(id: number, uuid: string, nombre: string, tipo: string, descripcion: string, status: string,ocupadoDisponible:OcupadoDisponible) {
    this.id = id;
    this.uuid = uuid;
    this.nombre = nombre;
    this.tipo = tipo;
    this.descripcion = descripcion;
    this.status = status;
    this.ocupadoDisponible = ocupadoDisponible;
  }


}
export enum OcupadoDisponible {
  DISPONIBLE = "DISPONIBLE",
  OCUPADO = "OCUPADO"
}
