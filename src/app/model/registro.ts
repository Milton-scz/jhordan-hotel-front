export class Registro {
  id: number;
  cedulaCliente: string;
  metodo: string;
  trxHash: string;
  fechaCreacion: string;
  fechaModificacion: string;

  constructor(id: number, cedulaCliente:string,metodo: string,trxHash: string, fechaCreacion: string,fechaModificacion:string) {
    this.id = id;
    cedulaCliente = cedulaCliente;
    this.metodo = metodo;
    this.trxHash = trxHash;
    this.fechaCreacion = fechaCreacion;
    this.fechaModificacion = fechaModificacion;

  }

}
