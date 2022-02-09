import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todoPipe'
})
export class TodoPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): unknown {

    if(value){
      return 'Tamamlandı';
    }
    else{
      return 'Tamamlanmadı';
    }


    return null;
  }

}


//ekranda görünmesini istemediğin formatı başka bir formatta ekranda component içerisinde yazabilirsin bu şekilde