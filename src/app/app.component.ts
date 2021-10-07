import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-app';
  isLoggedIn!: boolean;

  constructor(private router: Router) {
    this.isLoggedIn = !!localStorage.getItem('token');    
  }
  logout() {
    this.isLoggedIn=false;
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
  }
}
