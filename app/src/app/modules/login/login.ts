import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../AuthService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private auth: AuthService, private router: Router) {
    const users = [
      { username: 'admin@gmail.com', password: '1234', role: 'admin' },
      { username: 'user1@gmail.com', password: '1234', role: 'employee' },
      { username: 'user2@gmail.com', password: '1234', role: 'employee' },
    ];
    localStorage.setItem(
      'users',
      JSON.stringify([
        { username: 'admin@gmail.com', password: '1234', role: 'admin' },
        { username: 'user1@gmail.com', password: '1234', role: 'employee' },
        { username: 'user2@gmail.com', password: '1234', role: 'employee' },
      ])
    );

    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(users));
    }
    console.log(JSON.parse(localStorage.getItem('users')!));
  }

  login() {
    if (this.auth.login(this.username, this.password)) {
      this.message = '';
      this.router.navigate(['/']);
    } else {
      this.message = 'Kullanıcı adı veya şifre hatalı.';
    }
  }
}
