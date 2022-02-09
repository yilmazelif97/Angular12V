import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TodosComponent } from './todos/todos.component';
import { TodoPipe } from './todos/todo.pipe';
import { TodoBoldDirective } from './todos/todo-bold.directive';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoPipe,
    TodoBoldDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
