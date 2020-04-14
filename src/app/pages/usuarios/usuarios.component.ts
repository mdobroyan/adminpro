import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ],
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  total: number = 0;
  cargando: boolean;

  constructor(private servicioUsuarios: UsuarioService,
    public modalUploadService:ModalUploadService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.modalUploadService.notificacion.subscribe(resp=>this.cargarUsuarios());
  }

  cambiarDesde(change: number) {

    let desde = this.desde + change;

    console.log(desde);

    if (desde > this.total) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde = this.desde + change;
    this.cargarUsuarios();
  }

  mostrarModal(id:string){
    this.modalUploadService.mostrarModal('usuarios',id);
  }

  buscarUsuario(key: string) {

    if (key.length <= 0) {
      this.cargarUsuarios();
      return;

    }
    this.cargando = true;

    this.servicioUsuarios.buscarUsuarios(key).subscribe((resp: any) => {

      this.cargando = false;
      this.usuarios = resp.usuarios;
      this.total = resp.usuarios.length;
      this.cargando = false;


    });

  }

  guardarUsuario(usuario:Usuario){

this.servicioUsuarios.actualizarUsuario(usuario).subscribe();

  }

  borrarUsuario(usuario: Usuario) {

    if (usuario._id === this.servicioUsuarios.usuario._id) {
      Swal.fire('Atención', 'El usuario no puede borrarse a sis mismo', 'warning');
      return;
    }

    Swal.fire({
      title: 'Estás seguro que quieres borrar al usuario ' + usuario.nombre + ' ?',
      text: 'No es posible volver atras',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.value) {

        this.servicioUsuarios.borrarUsuario(usuario._id).subscribe((resp) => {

          this.cargarUsuarios();
         
        });

      }
    })



  }
  cargarUsuarios() {


    this.cargando = true;
    this.servicioUsuarios.cargarUsuarios(this.desde).subscribe((resp: any) => {

      this.cargando = false;
      this.usuarios = resp.usuarios;
      this.total = resp.total;
      this.cargando = false;


    });

  }

}
