import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, public serviceUsuario: UsuarioService) { }

  email: string;
  recuerdame: boolean = false;
  auth2: any;

  ngOnInit() {

    init_plugins()

    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }



  googleInit() {


    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '550101286619-1p2al6707al85vi66oous2r8ceb6ba47.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.atachSignin(document.getElementById('btnGoogle'));



    });

  }


  atachSignin(element) {

    this.auth2.attachClickHandler(element, {}, (googleUser) => {

      //let profile=googleUser.getBasicProfile();

      let token = googleUser.getAuthResponse().id_token;
      //console.log('token: ',token);


      this.serviceUsuario.loginGoogle(token).subscribe(correcto => window.location.href = '#/dashboard');

    });

  }


  ingresar(forma: NgForm) {

    console.log(forma.valid)
    console.log(forma.value)

    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this.serviceUsuario.login(usuario, forma.value.recuerdame).subscribe(correcto => this.router.navigate(['/dashboard']));

    //this.router.navigate(['/dashboard']);
  }
}
