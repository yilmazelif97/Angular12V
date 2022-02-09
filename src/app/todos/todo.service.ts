import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient:HttpClient) { }


  get Todos(){
    return this.httpClient.get('https://jsonplaceholder.typicode.com/todos')
  }

}
