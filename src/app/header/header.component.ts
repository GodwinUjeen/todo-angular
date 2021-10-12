import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../settings.service';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';

export interface Email {
  email: string,
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  title = 'todo-app';

  email = '';
  userId = '';

  constructor(private router: Router,
    private settingsService: SettingsService,
    private authService: AuthService,
    private store: Store<{ email: string }>) {

    this.userId = authService.getUserId();

    this.store.select('email')
      .subscribe((res) => {
        let data = JSON.parse(JSON.stringify(res));
        console.log(data.email)
        this.email = data.email
      });

    settingsService.getSettings().subscribe(email => {
      this.email = email.email;
    });
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
      return true;
    } else {
      return false;
    }
  }
}
