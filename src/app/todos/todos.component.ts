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
  filteredData: Todo[] = [];

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

  add(inpt: HTMLInputElement) {
    const todo: Todo = {title: inpt.value, userId:1, id:Math.random(), completed:false};
    this.data = [todo, ... this.data];
    inpt.value='';
  }

  delete(id: number) {
    this.editMode = false;
    const result = window.confirm("silmek istediğinize emin misiniz");

    if(result){
      this.data = [...this.data.filter(x=>x.id != id)];
    }
  }


  search(searchText:string){
    const filteredData = this.data.filter(x=>x.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
  }

}