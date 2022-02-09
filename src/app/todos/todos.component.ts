import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  data: Todo[] = [];

  ngOnInit(): void {
    // promise Then burada subscribe karşılık gelir.
    this.httpClient
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((res) => {
        this.data = res;
      });
  }

  editMode: boolean = false;
  editItem: Todo = {} as Todo;

  edit(id: number) {
    this.editMode = true;
    const editData = this.data.find((x) => x.id == id);
    // as Todo tip tanımlama için kullanılıyor
    
    this.editItem = editData || ({} as Todo); 
  }

  //#inpt olarak templete ref verdik

  update(inpt: HTMLInputElement) {
    this.editMode = false;
    this.editItem.title = inpt.value;
    this.editItem= {} as Todo;
  }

  add() {}

  delete(id: number) {
    this.editMode = false;
  }
}