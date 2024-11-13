// src/app/pages/usuarios/usuarios.routes.ts
import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
import { CrearUsuarioComponent } from './create.component';

export const UsuariosRoutes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    data: { titulo: 'Usuarios' },

  },
  {
    path: 'create-usuario',
    component: CrearUsuarioComponent,
    data: { titulo: 'Crear Usuarios' },

  }
];
