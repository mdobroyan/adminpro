import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ],
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;

  constructor(private serviceSubirArchivo:SubirArchivoService,
    public modalUploadService:ModalUploadService) { }


  ngOnInit(): void {
  }

  cerrarModal(){

    this.imagenTemp=null;
    this.imagenSubir=null;

    this.modalUploadService.ocultarModal();
  }

  subirImagen(){

    this.serviceSubirArchivo.subirArchivo(this.imagenSubir,this.modalUploadService.tipo,this.modalUploadService.id)
    .then((resp)=>{

      this.modalUploadService.notificacion.emit(resp);
      this.cerrarModal();

    })
    .catch((e)=>{

      console.log('error en la carga');
    });


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

}
