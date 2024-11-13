// src/app/pages/usuarios/usuarios.routes.ts
import { Routes } from '@angular/router';
import { RegistroComponent } from './registro.component';
import { VerificarComponent } from './verificar.component';


export const RegistroRoutes: Routes = [
  {
    path: '',
    component: RegistroComponent,
    data: { titulo: 'Registros' },

  },
  {
    path: 'verificar-contrato',
    component: VerificarComponent,
    data: { titulo: 'Verificar Contrato' },
  }

];
