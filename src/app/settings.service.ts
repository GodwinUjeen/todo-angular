import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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

  private subject = new Subject<UpdateMailId>()

  constructor(private settings: HttpClient) { }

  updateSettings(data: UpdateData) {
    this.settings.put<UpdateMailId>(`http://localhost:5000/updateMailId?email=${data.email}&userId=${data.userId}`, '')
      .subscribe(res => {
        this.subject.next({ email: res.email });
      })
  }

  getSettings() {
    return this.subject.asObservable();
  }
}