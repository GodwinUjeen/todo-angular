import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

export interface GetTodo {
  userId: string
}

export interface AddTodo {
  title: string,
  userId: number | string,
  description: string
}

export interface UpdateTodo {
  todoId: number | string,
  title: string,
  userId: number | string,
  description: string
}
export interface DeleteTodo {
  todoId: number | string,
  userId: number | string,
}
export interface TodoData {
  title: string;
  description: string;
  todoId: number,
  checked: boolean;
}

export interface Todo {
  userId: string,
  todoData: Array<TodoData>
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private todo: HttpClient) { }

  addTodo(data: AddTodo): Observable<Todo> {
    return this.todo.post<Todo>(`http://localhost:5000/Todo/${data.userId}?title=${data.title}&description=${data.description}`, '');
  }

  getTodo(data: GetTodo): Observable<Todo> {
    return this.todo.get<Todo>(`http://localhost:5000/Todo/${data.userId}`);
  }

  deleteTodo(data: DeleteTodo): Observable<Todo> {
    return this.todo.delete<Todo>(`http://localhost:5000/Todo/${data.userId}?todoId=${data.todoId}`);
  }

  updateTodo(data: UpdateTodo): Observable<Todo> {
    return this.todo.put<Todo>(`http://localhost:5000/Todo/${data.userId}?todoId=${data.todoId}&title=${data.title}&description=${data.description}`, '')
  }
}
