import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.css']
})
export class DialogComponentComponent  {
  
  actions = ''
  newDataTitle = ''
  newDataDescription = ''
  count = 0

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.count = data.count;
    this.newDataTitle = data.newDataTitle;
    this.newDataDescription = data.newDataDescription;
    this.actions = data.actions    
  }

}
