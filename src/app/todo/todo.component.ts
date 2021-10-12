import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component';
import { AuthService } from '../auth.service';
import { TodoService } from '../todo.service';
import { SettingsService } from '../settings.service';


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

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  title = 'todo-app';

  public todoData: TodoData[] = [];
  newDataTitle = ''
  newDataStatus = 'Not Done'
  newDataDescription = ''
  loader = true;
  totalCount = 5;
  userId = '';
  email = ''

  constructor(public dialog: MatDialog,
    private authService: AuthService,
    private todoService: TodoService,
    private settingsService: SettingsService    ) {

    this.userId = authService.getUserId();
    
    
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.todoService.getTodo({ userId: this.userId }).subscribe((res) => {
        this.todoData = res.todoData
      });
      this.loader = false;
    }, 1000)
  }

  async addTodo() {
    if (this.newDataTitle !== '') {
      this.loader = true;
      this.todoService.addTodo(
        {
          title: this.newDataTitle,
          description: this.newDataDescription,
          userId: this.userId
        }).subscribe((res) => {
          this.loader = false;
          this.todoData = res.todoData;

        });
      this.newDataDescription = ''
      this.newDataTitle = ''
    }
  }

  editTodo(index: number, id: number) {
    const dialogRef = this.dialog.open(DialogComponentComponent,
      {
        data: {
          actions: 'edit',
          newDataTitle: this.todoData[index].title,
          newDataDescription: this.todoData[index].description
        }
      });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result !== null && result !== "") {
        this.loader = true;
        this.todoService.updateTodo({
          title: result.title,
          description: result.description,
          userId: this.userId,
          todoId: id
        }).subscribe(res => {
          this.loader = false;
          this.todoData = res.todoData;
        });
      }
    });
  }

  deleteTodo(index: number) {
    const dialogRef = this.dialog.open(DialogComponentComponent,
      {
        data: {
          actions: 'delete',
          count: 1
        }
      })
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result == 'true') {
        this.loader = true;
        this.todoService.deleteTodo({
          todoId: index,
          userId: this.userId
        }).subscribe(res => {
          this.loader = false;
          this.todoData = res.todoData;
        })
      };
    });
  }

  deleteMultiple() {
    let count = 0;

    this.todoData.forEach(data => {
      if (data.checked) count++;
    });

    let dialogRef = this.dialog.open(DialogComponentComponent, {
      data: {
        actions: 'delete',
        count: count
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true') this.todoData = this.todoData.filter(item => item.checked !== true)
    });
  };
}
