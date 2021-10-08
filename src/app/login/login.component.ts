import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';
import { AuthService, Login } from '../auth.service';


export interface User {
  _id: string,
  email: string,
  userId: string
}

export interface LoginData {
  email: String,
  password: String
}

const users = [
  {
    "email": "godwin@gmail.com",
    "password": "test1234"
  },
  {
    "email": "ajith@gmail.com",
    "password": "test1234"
  },
  {
    "email": "rasika@gmail.com",
    "password": "test1234"
  },
  {
    "email": "suresh@gmail.com",
    "password": "test1234"
  },
  {
    "email": "nivedha@gmail.com",
    "password": "test1234"
  }
]

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidePassword: boolean = true;
  newToken = '';
  loginForm!: FormGroup;
  validPassword = '';
  private auth: AuthService;

  login$!: any;

  constructor(private router: Router, auth: AuthService) {
    this.auth = auth;
  }

  ngOnInit() {
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      }
    );
  }

  loginUser() {
    this.auth.login({ email: this.loginForm.value.email.trim(), password: this.loginForm.value.password.trim() })
      .subscribe(
        user => {
          console.log(user);
          user._id ? (
            this.newToken = CryptoJS.AES.encrypt(user._id, 's3cR3Tk3y').toString(),
            localStorage.setItem('token', this.newToken),
            this.router.navigateByUrl('/todo')
          ) : this.router.navigateByUrl('/login')
        })

  }
}
