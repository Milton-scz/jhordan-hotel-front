import { UserRole } from "./UserRole";

export class User {
  id!: number;
  name: string;
  cedula: string;
  telefono: string;
  direccion: string;
  email: string;
  role: string; // Utiliza el tipo del enumerado UserRole

  constructor(name: string,cedula: string,telefono: string,direccion: string, email: string, role: string) {
    this.name = name;
    this.cedula = cedula;
    this.telefono = telefono;
    this.direccion = direccion;
    this.email = email;
    this.role = role;
  }
}
