// src/app/pages/usuarios/usuarios.routes.ts
import { Routes } from '@angular/router';
import { HabitacionComponent } from './habitacion.component';
import { CrearHabitacionComponent } from './create.component';

export const HabitacionRoutes: Routes = [
  {
    path: '',
    component: HabitacionComponent,
    data: { titulo: 'Habitaciones' },

  },
  {
    path: 'create-habitacion',
    component: CrearHabitacionComponent,
    data: { titulo: 'Crear Habitacion' },

  }
];
