import { Component, OnInit } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {


  porcentaje1: number = 30;

  porcentaje2: number = 70;

  constructor() { }

  ngOnInit() {
  }

 
}

