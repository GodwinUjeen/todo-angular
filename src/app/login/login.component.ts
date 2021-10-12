import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as CryptoJS from 'crypto-js';
import { AuthService } from '../auth.service';
import * as settingsActions from '../store/settings.actions';

export interface User {
  _id: string,
  email: string,
  userId: string
}

export interface LoginData {
  email: String,
  password: String
}

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
  // private auth: AuthService;  

  constructor(private router: Router, private auth: AuthService, private store: Store<{ email: string }>) {
    // this.auth = auth;        
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
          this.store.dispatch(settingsActions.login({ email: this.loginForm.value.email.trim() }));
          user.userId !== null ? (
            this.newToken = CryptoJS.AES.encrypt(user.userId, 's3cR3Tk3y').toString(),
            localStorage.setItem('token', this.newToken),
            this.router.navigateByUrl('/todo')
          ) : this.router.navigateByUrl('/login')
        });
  }
}
