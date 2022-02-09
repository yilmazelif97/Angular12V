import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
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
        this.filteredData = this.data;

        console.log('data', this.data);
      });
  }

  editMode: boolean = false;
  selectedId: number = -1;

  edit(id: number, inpt: HTMLInputElement) {
    this.editMode = true;
    const editData = this.data.find((x) => x.id == id);
    this.selectedId = editData?.id || -1;
    inpt.value = editData?.title || '';
  }

  //#inpt olarak templete ref verdik
  update(inpt: HTMLInputElement) {
    this.editMode = false;
    // this.editItem.title = inpt.value;
    // inpt.value = ''; // bug fix

    let editData = this.data.find((x) => x.id == this.selectedId) as Todo;
    editData.title = inpt.value;
    // kendi referansını günceller
    this.data = [...this.data];
    this.SetFilteredTodos();

    inpt.value = '';
  }

  add(inpt: HTMLInputElement) {
    const todo: Todo = {
      title: inpt.value,
      userId: 1,
      id: Math.random() * 100000000,
      completed: false,
    };
    this.data = [todo, ...this.data];
    // yeni bir item ekleyip referans günceller
    this.SetFilteredTodos();
    inpt.value = '';
  }

  delete(id: number) {
    this.editMode = false;

    const result = window.confirm('silmek istediğinize emin misiniz');

    if (result) {
      // silinen id çıkar referansı güncelle
      this.data = [...this.data.filter((x) => x.id != id)];
      this.SetFilteredTodos();
    }
  }

  search(searchText: string) {
    console.log('searchText', searchText);
    this.filteredData = this.data.filter((x) =>
      x.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }

  private SetFilteredTodos() {
    this.filteredData = [...this.data];
  }
}