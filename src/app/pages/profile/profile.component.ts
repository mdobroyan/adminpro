import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ],
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(private servicioUsuario: UsuarioService) {

    this.usuario = servicioUsuario.usuario;
  }

  ngOnInit(): void {
  }



  seleccionarImagen(archivo) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {

      this.imagenSubir = null;
      Swal.fire('Atención', 'El archivo debe ser una imagen', 'warning');
      return;
    }

    //this.imagenTemp=archivo;

    this.imagenSubir = archivo;


    let reader = new FileReader();
    let urlImgTem = reader.readAsDataURL(archivo);

    reader.onloadend = () => {
    this.imagenTemp = reader.result as string;
    };



  }
  guardar(usuario: Usuario) {

    this.usuario.nombre = usuario.nombre;

    if (!usuario.google) {

      this.usuario.email = usuario.email;

    }

    this.servicioUsuario.actualizarUsuario(this.usuario).subscribe(resp => console.log(resp));


  }

  cambiarImagen() {

    this.servicioUsuario.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}
