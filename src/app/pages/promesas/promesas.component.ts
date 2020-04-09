import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ],
})
export class PromesasComponent implements OnInit {

  constructor() {

    

    this.contar3().then((parm)=>{

      console.log("promesa terminó "+parm);

    })
    .catch((error)=>{

      console.error("error en la promesa",error);
    })

   }

  ngOnInit(): void {
  }

  contar3():Promise<boolean>{

    return new Promise<boolean>((resolve,reject)=>{

      let contador =0;

      let intervalo=setInterval(()=>{

        contador += 1;
        console.log(contador);

        if(contador==3){
          //reject("error primario");
          resolve(true);
          clearInterval(intervalo);
        }

      },1000)

    });


  }

}
