import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./pages/usuarios/usuarios.routes').then(
            (m) => m.UsuariosRoutes
          ),
      },
      {
        path: 'devices',
        loadChildren: () =>
          import('./pages/devices/devices.routes').then(
            (m) => m.DeviceRoutes
          ),
      },
      {
        path: 'habitaciones',
        loadChildren: () =>
          import('./pages/habitaciones/habitaciones.routes').then(
            (m) => m.HabitacionRoutes
          ),
      },
      {
        path: 'paquetes',
        loadChildren: () =>
          import('./pages/paquetes/paquetes.routes').then(
            (m) => m.PaqueteRoutes
          ),
      },
      {
        path: 'recepciones',
        loadChildren: () =>
          import('./pages/recepciones/recepciones.routes').then(
            (m) => m.RecepcionRoutes
          ),
      },
      {
        path: 'registros',
        loadChildren: () =>
          import('./pages/registros/registros.routes').then(
            (m) => m.RegistroRoutes
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
