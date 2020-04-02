import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/service.index';


@Component({
  selector: 'app-acount-setting',
  templateUrl: './acount-setting.component.html',
  styles: [
  ],
})
export class AcountSettingComponent implements OnInit {

  constructor(public _servicioAjustes: SettingsService) { }

  ngOnInit(): void {

    this.colocarCheck();
  }


  cambiarColor(color: string, item: any) {

    this.aplicarCheck(item);
    this._servicioAjustes.aplicarTema(color);


  }

  aplicarCheck(item: any) {

    let selectores: any = document.getElementsByClassName('selector');


    for (let link of selectores) {

      link.classList.remove('working');
    }

    item.classList.add('working');


  }


  colocarCheck() {

    let temaSelected: string = this._servicioAjustes.ajuste.tema;

    let selectores: any = document.getElementsByClassName('selector');


    for (let link of selectores) {

      if (link.getAttribute('data-theme') === temaSelected) {

        link.classList.add('working');

        break;
      }
    }



  }
}
