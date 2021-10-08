import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import axios, { AxiosInstance } from 'axios';


export interface User {
  _id: string,
  email: string,
  userId: string
}

export interface Login {

  email: string,
  password: string
}

export interface userDetail{
  id: string,
  email: string,
  userId: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private axiosClient: AxiosInstance;
  private errorHandler: ErrorHandler;

  constructor(private user: HttpClient, errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler;
    this.axiosClient = axios.create({
      timeout: 3000,
      headers: {
        "X-Initialized-At": Date.now().toString()
      }
    });
  }

  // async login(data: Login): Promise<Observable<userDetail>> {
  //   // try {
  //     console.log(data);
  //     let userData = await axios.get(`http://localhost:5000/login?email=${data.email}&password=${data.password}`)
  //     console.log(userData);
  //     if (userData.status == 400) {
  //       return userData.data;
  //     }
  //     return userData.data;

  //   // } catch (e) {
  //   //   console.log(e)
  //   //   return (this.normalizeError(e));
  //   // }
  // }

  login(data: Login): Observable<User> {
    console.log(data)
    return this.user.get<User>(`http://localhost:5000/login?email=${data.email}&password=${data.password}`);
  }

  async signUp() {
    try {
      let userData = await axios.post('http://localhost:5000/signup?email=ajith@gmail.com&password=test1234')
      return userData.data;
    } catch (error) {
      console.log(error);
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
