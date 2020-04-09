import { Injectable } from '@angular/core';
@Injectable()
export class SidebarService {

  menu:any[]=[

    { 
    titulo:'principal',
    icono:'mdi mdi-gauge',
    submenu:[
      {titulo:'Dashboard',url:'/dashboard'},
      {titulo:'Progress Bar',url:'/progress'},
      {titulo:'Graficas',url:'/graficas1'},
      {titulo:'RXJS',url:'/rxjs'},
      {titulo:'Promesas',url:'/promesas'}
    ]
    }



  ]


  constructor() { }
}
