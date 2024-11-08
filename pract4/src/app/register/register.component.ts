import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  displayName: string = '';  // New field for user's display name

  constructor(private authService: AuthService) {}

  register() {
    if (this.authService.register(this.username, this.password, this.displayName)) {
      alert('Registration successful!');
      this.username = '';
      this.password = '';
      this.displayName = '';
    } else {
      alert('Registration failed: Username already exists.');
    }
  }
}

