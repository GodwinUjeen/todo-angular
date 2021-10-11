import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';
import { HttpClient } from '@angular/common/http'

export interface UpdateMailId {
  email: string
}

export interface UpdateData {
  email: string | undefined,
  userId: number | string
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private settings: HttpClient) { }

  updateMailId(data: UpdateData): Observable<UpdateMailId> {    
    return (data.email == null || data.email == undefined) ?
      this.settings.get<UpdateMailId>(`http://localhost:5000/getMailId?userId=${data.userId}`)
      : this.settings.put<UpdateMailId>(`http://localhost:5000/updateMailId?email=${data.email}&userId=${data.userId}`, '')    
  }

  sendSettings() {

  }
}
// http://localhost:5000/updateMailId?email=god@gmail.com&userId=USR2021108111356KkDFI