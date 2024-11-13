// src/app/pages/usuarios/usuarios.routes.ts
import { Routes } from '@angular/router';
import { DeviceComponent } from './device.component';
import { CrearDeviceComponent } from './create.component';

export const DeviceRoutes: Routes = [
  {
    path: '',
    component: DeviceComponent,
    data: { titulo: 'Devices' },

  },
  {
    path: 'create-device',
    component: CrearDeviceComponent,
    data: { titulo: 'Crear Device' },

  }
];
