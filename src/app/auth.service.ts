import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import axios, { AxiosInstance } from 'axios';
import * as CryptoJS from 'crypto-js';
import { createAction, props } from '@ngrx/store';

export interface User {
  _id: string,
  email: string,
  userId: string
}

export interface Login {
  email: string,
  password: string
}

export interface userDetail {
  id: string,
  email: string,
  userId: string
}

export interface TodoToken {
  email: string,
  userId: string
}

// export const login = createAction(
//   '[Login Page] Login',
//   props<{ email: string}>()
// );


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private axiosClient: AxiosInstance;
  private errorHandler: ErrorHandler;

  tokenString: string | any = '';
  todoToken: string = ''

  constructor(private user: HttpClient, errorHandler: ErrorHandler) {

    this.tokenString = localStorage.getItem('token');
    if (this.tokenString != null) this.todoToken = CryptoJS.AES.decrypt(this.tokenString, 's3cR3Tk3y').toString(CryptoJS.enc.Utf8)

    this.errorHandler = errorHandler;
    this.axiosClient = axios.create({
      timeout: 3000,
      headers: {
        "X-Initialized-At": Date.now().toString()
      }
    });
  }



  getUserId() {
    this.tokenString = localStorage.getItem('token');
    if (this.tokenString != null) this.todoToken = CryptoJS.AES.decrypt(this.tokenString, 's3cR3Tk3y').toString(CryptoJS.enc.Utf8)    
    return this.todoToken;
  }

  login(data: Login): Observable<User> {
    let user = this.user.get<User>(`http://localhost:5000/login?email=${data.email}&password=${data.password}`);
    return user;
  }

  async signUp() {
    try {
      let userData = await axios.post('http://localhost:5000/signup?email=ajith@gmail.com&password=test1234')
      return userData.data;
    } catch (error) {
      return (this.normalizeError(error));
    }
  }

  normalizeError(error: any): Object {
    this.errorHandler.handleError(error);
    return ({
      code: "Unknown Error",
      message: "An unexpected error occured"
    });
  }
}
