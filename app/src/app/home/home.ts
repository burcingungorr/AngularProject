import { Component } from '@angular/core';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  username: string | null = null;
  role: string | null = null;

  constructor(private auth: AuthService) {
    const user = this.auth.getCurrentUser();
    this.username = user?.username || null;
    this.role = user?.role || null;
  }
}
