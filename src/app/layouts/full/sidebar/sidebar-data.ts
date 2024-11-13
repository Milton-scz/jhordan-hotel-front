import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    bgcolor: 'primary',
    route: '/dashboard',
  },
  {
    navCap: 'USUARIOS',
  },
  {
    displayName: 'Gestión de Usuarios',
    iconName: 'user',
    bgcolor: 'primary',
    route: '',
    children: [
      {
        displayName: 'Usuarios',
        iconName: 'person',
        bgcolor: 'success',
        route: '/usuarios',
      }
    ]
  },
  {
    navCap: 'DEVICES',
  },
  {
    displayName: 'Gestión de Dispositivos',
    iconName: 'device',
    bgcolor: 'primary',
    route: '',
    children: [
      {
        displayName: 'Devices',
        iconName: 'device',
        bgcolor: 'success',
        route: '/devices',
      }
    ]
  },
  {
    navCap: 'HABITACIONES',
  },
  {
    displayName: 'Gestión de Habitaciones',
    iconName: 'habitacion',
    bgcolor: 'primary',
    route: '',
    children: [
      {
        displayName: 'Habitaciones',
        iconName: 'room',
        bgcolor: 'success',
        route: '/habitaciones',
      },
      {
        displayName: 'Paquetes',
        iconName: 'room',
        bgcolor: 'success',
        route: '/paquetes',
      }

    ]
  },
  {
    navCap: 'RECEPCIONES',
  },
  {
    displayName: 'Gestión de Recepciones',
    iconName: 'house',
    bgcolor: 'primary',
    route: '',
    children: [
      {
        displayName: 'Recepciones',
        iconName: 'house',
        bgcolor: 'success',
        route: '/recepciones',
      }
    ]
  },
  {
    navCap: 'SMART CONTRACTS',
  },
  {
    displayName: 'Contratos',
    iconName: 'rosette',
    bgcolor: 'accent',
    route: '/registros',
  },



];
