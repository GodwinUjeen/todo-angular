import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import * as jwt from 'jsonwebtoken';

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

  hide: boolean = true;
  newToken = '';
  loginForm!: FormGroup;
  constructor(private router: Router) {
  }

  ngOnInit() {    
    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      }
    );
  }

  onLogin() {
    if (this.loginForm.valid) {         

      const logged = users.filter(item => item.email === this.loginForm.value.email.toString().trim());

      logged[0].password === this.loginForm.value.password
        ?
        (          
          localStorage.setItem('token', this.loginForm.value.email),
          this.router.navigateByUrl('/todo')
        )
        : ''
    }
  }
}
