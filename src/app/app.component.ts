import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-app';

  constructor(private router: Router) { }
  onLogin(isLoggedIn: any) {
    console.log(isLoggedIn.target.value);
    this.isLoggedIn = isLoggedIn.target.value;
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
  }

  isLoggedIn(): boolean {
    if (!!localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
