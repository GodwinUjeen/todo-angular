import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SettingsService } from '../settings.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settingsForm!: FormGroup;
  userId = ''

  constructor(private settingsService: SettingsService, private authService: AuthService,) {

    this.settingsForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
      }
    );

    this.userId = authService.getUserId();
  }

  updateSettings() {
    // USR2021108111356KkDFI
    this.settingsService.updateMailId(
      {
        email: this.settingsForm.value.email.trim(),
        userId: this.userId
      }).subscribe((res) => {
        // console.log(res);
      });
  }



  ngOnInit(): void {
  }

}
