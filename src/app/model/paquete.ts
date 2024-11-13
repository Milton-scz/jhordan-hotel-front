export class Paquete {
  paqueteId: number;
  nombre: string;
  precio: number;
  detalle: string;

  constructor(paqueteId: number, nombre: string,precio: number, detalle: string) {
    this.paqueteId = paqueteId;
    this.nombre = nombre;
    this.precio = precio;
    this.detalle = detalle;

  }

}
