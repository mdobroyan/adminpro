import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {


  usuario: Usuario;
  token: string;

  constructor(private http: HttpClient,
    private router:Router) {
    this.cargarStorage()
  }



  logout() {

    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);

  }

  guardarStorage(id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;



  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.token = localStorage.getItem('token');


    }
    else {
      this.token = '';
      this.usuario = null;
    }
  }

  estaLogueado(): boolean {
    return (this.token.length > 5)
  }

  crearUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post<any>(url, usuario).pipe(map((resp: any) => {

      Swal.fire('Usuario creado', usuario.email, 'success');
      return resp.usuario;
    }));

  }

  loginGoogle(token: string) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token: token }).pipe(map((resp: any) => {


      this.guardarStorage(resp.id, resp.token, resp.usuario);

      return true;
    }));

  }

  login(usuario: Usuario, recordar: boolean = false) {

    let url = URL_SERVICIOS + '/login';

    if (recordar) {

      localStorage.setItem('email', usuario.email)

    } else {

      localStorage.removeItem('email');
    }

    return this.http.post<any>(url, usuario).pipe(map((resp: any) => {


      this.guardarStorage(resp.id, resp.token, resp.usuario);


      return true;

    }));

  }




}
