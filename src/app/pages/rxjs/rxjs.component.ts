import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry,map,filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ],
})
export class RxjsComponent implements OnInit, OnDestroy {


  subscription:Subscription;

  constructor() {


    let obs: Observable<any> = this.regresaObservable();

    this.subscription=obs.subscribe(
        numero => { console.log("contador; ", numero); },
        error => console.error("un error", error),
        () => console.log("fin"));


  }
  ngOnDestroy(): void {

    console.log("Se esta cerrando");
    this.subscription.unsubscribe();

  }

  ngOnInit(): void {
  }

  

  regresaObservable():Observable<any> {

    return new Observable((observer: Subscriber<any>) => {

      let contador = 0;

      let intervalo = setInterval(() => {

        contador++;

        const salida={
          valor:contador
        }

        observer.next(salida);
        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   //clearInterval(intervalo);

        //   observer.error("auxilio!!");
        // }



      }, 1000);





    }).pipe(map(resp=> resp.valor))
    .pipe(filter((valor)=>{
      
      if(valor%2===1){

        return true
      }
      else{
        return false
      }})
      );


  }

}
