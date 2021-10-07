import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component';

export interface TodoData {
  title: string;
  progress: string;
  checked: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  constructor(public dialog: MatDialog) { }

  title = 'todo-app';

  public todoData = [
    { 'id': 1, 'title': 'Homework', 'progress': 'Done', 'checked': false },
    { 'id': 2, 'title': 'Task', 'progress': 'Inprogress', 'checked': false },
    { 'id': 3, 'title': 'Cooking', 'progress': 'Inprogress', 'checked': false },
    { 'id': 4, 'title': 'Washing', 'progress': 'Not Done', 'checked': false },
    { 'id': 5, 'title': 'Cleaning', 'progress': 'Not Done', 'checked': false }
  ];

  newDataTitle = ''
  newDataStatus = 'Not Done'

  addTodo() {
    if (this.newDataTitle !== '') {
      this.todoData.push({ 'id': this.todoData.length + 2, 'title': this.newDataTitle, 'progress': this.newDataStatus, 'checked': false });
      this.newDataTitle = '';
    }
  }

  editTodo(index: number) {
    const dialogRef = this.dialog.open(DialogComponentComponent,
      {
        data: {
          actions: 'edit',
          newDataTitle: this.todoData[index].title,
          newDataProgress: this.todoData[index].progress
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== null && result !== "") {
        this.todoData[index].title = result.title;
        this.todoData[index].progress = result.progress;
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
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true') this.todoData.splice(index, 1);
    });
  }

  deleteMultiple() {
    let count = 0;

    this.todoData.forEach(data => {
      if (data.checked) count++;
    });

    let dialogRef = this.dialog.open(DialogComponentComponent, {
      data: {
        actions:'delete',
        count: count
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true') this.todoData = this.todoData.filter(item => item.checked !== true)
    });
  };
}
