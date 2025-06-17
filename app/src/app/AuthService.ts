import { Injectable } from '@angular/core';

export interface User {
  username: string;
  password: string;
  role: 'admin' | 'employee';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private localStorageKey = 'loggedInUser';

  login(username: string, password: string): boolean {
    const usersStr = localStorage.getItem('users');
    if (!usersStr) return false;

    const users: User[] = JSON.parse(usersStr);
    const matchedUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (matchedUser) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(matchedUser));
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.localStorageKey);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.localStorageKey) !== null;
  }

  getUserRole(): 'admin' | 'employee' | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.localStorageKey);
    return userStr ? JSON.parse(userStr) : null;
  }
}
