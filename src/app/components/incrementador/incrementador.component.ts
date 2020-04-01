import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {


  @ViewChild('txtProgress', { static: true }) txtProgress: ElementRef;
  @Input() leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 90;
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    console.log('leyenda', this.leyenda);
    console.log('progreso', this.porcentaje);


  }

  ngOnInit() {
  }

  onChange(newValue: number) {

    //let elementHtml: any = document.getElementsByName('porcentaje')[0];

    if (newValue >= 100) {
      this.porcentaje = 100;
    } else if (newValue < 1) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }

    this.txtProgress.nativeElement.value = this.porcentaje;

    this.cambioValor.emit(this.porcentaje);
  }

  cambiarValor(valor: number) {

    if (this.porcentaje >= 100 && valor > 0) {
      return;
    }

    if (this.porcentaje <= 0 && valor < 0) {
      return;
    }

    this.porcentaje = +this.porcentaje + valor;

    this.cambioValor.emit(this.porcentaje);
    this.txtProgress.nativeElement.focus();

  }


}
