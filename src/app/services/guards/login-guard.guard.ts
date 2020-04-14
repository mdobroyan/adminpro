import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {


  constructor(private usuarioService:UsuarioService,
    private router:Router){

  }


  canActivate():  boolean  {

    
    if(this.usuarioService.estaLogueado()){

      return true;
    }else{

      console.log('logueado false');
      this.router.navigate(['/login']);
      return false;

    }
    
  }
  
}
