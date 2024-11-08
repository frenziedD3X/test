import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  displayName: string | null = null;  // To store the user's display name

  constructor(private authService: AuthService) {}

  login() {
    if (this.authService.login(this.username, this.password)) {
      this.displayName = this.authService.getLoggedInUserDisplayName();  // Retrieve display name after login
      alert('Login successful!');
      this.username = '';
      this.password = '';
    } else {
      alert('Login failed.');
    }
  }
}
