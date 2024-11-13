import { Routes } from '@angular/router';
import { RecepcionComponent } from './recepcion.component';  // Asegúrate de que la ruta sea correcta
import { CrearRecepcionComponent } from './create.component';  // Asegúrate de que la ruta sea correcta
import { EditRecepcionComponent } from './edit.component';

export const RecepcionRoutes: Routes = [
  {
    path: '',
    component: RecepcionComponent,
    data: { titulo: 'Recepciones' },  // Título que aparecerá en la vista de esta ruta
  },
  {
    path: 'create-recepcion/:id',
    component: CrearRecepcionComponent,
    data: { titulo: 'Crear Recepción' },  // Título que aparecerá en la vista de esta ruta
  },
  {
    path: 'edit-recepcion/:id',
    component: EditRecepcionComponent,
    data: { titulo: 'Editar Recepción' },  // Título que aparecerá en la vista de esta ruta
  }
];
