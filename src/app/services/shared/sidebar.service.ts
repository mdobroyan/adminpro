import { Injectable } from '@angular/core';
@Injectable()
export class SidebarService {

  menu: any[] = [

    {
      titulo: 'principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'Progress Bar', url: '/progress' },
        { titulo: 'Graficas', url: '/graficas1' },
        { titulo: 'RXJS', url: '/rxjs' },
        { titulo: 'Promesas', url: '/promesas' }
      ]
    },
    {
      titulo: 'mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Hospitales', url: '/hospitales' },
        { titulo: 'Medicos', url: '/medicos' }
      ]
    }




  ]


  constructor() { }
}
