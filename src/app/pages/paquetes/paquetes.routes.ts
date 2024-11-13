// src/app/pages/usuarios/usuarios.routes.ts
import { Routes } from '@angular/router';
import { PaqueteComponent } from './paquete.component';
import { CrearPaqueteComponent } from './create.component';

export const PaqueteRoutes: Routes = [
  {
    path: '',
    component: PaqueteComponent,
    data: { titulo: 'Paquetes' },

  },
  {
    path: 'create-paquete',
    component: CrearPaqueteComponent,
    data: { titulo: 'Crear Paquete' },

  }
];
