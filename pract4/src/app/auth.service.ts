import { Injectable } from '@angular/core';

interface User {
  username: string;
  password: string;
  displayName: string;  // New property for user's full name or display name
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = [];
  private loggedInUser: User | null = null;

  constructor() {}

  register(username: string, password: string, displayName: string): boolean {
    // Check if user already exists
    const userExists = this.users.some(user => user.username === username);
    if (userExists) {
      return false;  // Registration failed: user already exists
    }

    // Register new user
    this.users.push({ username, password, displayName });
    return true;  // Registration successful
  }

  login(username: string, password: string): boolean {
    // Check if the username and password match an existing user
    const user = this.users.find(
      user => user.username === username && user.password === password
    );
    if (user) {
      this.loggedInUser = user;
      return true;  // Login successful
    } else {
      return false;  // Login failed
    }
  }

  getLoggedInUserDisplayName(): string | null {
    return this.loggedInUser ? this.loggedInUser.displayName : null;
  }

  logout() {
    this.loggedInUser = null;
  }
}


