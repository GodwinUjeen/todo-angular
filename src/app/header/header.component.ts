import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../settings.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  title = 'todo-app';

  email = '';
  userId = '';

  constructor(private router: Router, private settingsService: SettingsService, private authService: AuthService) {
    this.userId = authService.getUserId();
  }

  onLogin(isLoggedIn: any) {
    this.isLoggedIn = isLoggedIn.target.value;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')
  }

  todo() {
    this.router.navigateByUrl('/todo')
  }

  settings() {
    this.router.navigateByUrl('/settings');
  }

  isLoggedIn(): boolean {
    if (!!localStorage.getItem('token')) {
      if (this.email == '') {
        this.settingsService.updateMailId(
          {
            email: undefined,
            userId: this.userId
          }).subscribe((res) => {
            this.email = res.email;
          });
      }
      return true;
    } else {
      return false;
    }
  }
}
