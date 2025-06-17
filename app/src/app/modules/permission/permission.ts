import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../AuthService';

interface PermissionRequest {
  id: number;
  employeeName: string;
  type: 'Yıllık' | 'Hastalık' | 'Mazeret';
  startDate: string;
  endDate: string;
  totalDays: number;
  status: 'Beklemede' | 'Onaylandı' | 'Reddedildi';
}

@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './permission.html',
  styleUrls: ['./permission.css'],
})
export class Permission implements OnInit {
  permissionTypes: ('Yıllık' | 'Hastalık' | 'Mazeret')[] = [
    'Yıllık',
    'Hastalık',
    'Mazeret',
  ];

  requests: PermissionRequest[] = [];

  userRole: 'admin' | 'employee' = 'employee';

  employeeName = '';
  selectedType: 'Yıllık' | 'Hastalık' | 'Mazeret' = 'Yıllık';
  startDate = '';
  endDate = '';

  remainingDays: { [key in 'Yıllık' | 'Hastalık' | 'Mazeret']: number } = {
    Yıllık: 14,
    Hastalık: 10,
    Mazeret: 7,
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const role = this.authService.getUserRole();
    this.userRole = role === 'admin' || role === 'employee' ? role : 'employee';
    this.generateRandomRequests();
  }

  generateRandomRequests() {
    const names = ['Burcu', 'Ali', 'Zeynep', 'Mehmet', 'Elif'];
    const statuses: PermissionRequest['status'][] = [
      'Beklemede',
      'Onaylandı',
      'Reddedildi',
    ];

    for (let i = 0; i < 5; i++) {
      const type = this.permissionTypes[Math.floor(Math.random() * 3)];
      const status = statuses[Math.floor(Math.random() * 3)];
      const employeeName = names[i % names.length];

      const start = new Date();
      start.setDate(start.getDate() - Math.floor(Math.random() * 10));
      const end = new Date(start);
      end.setDate(start.getDate() + Math.floor(Math.random() * 5) + 1);

      const totalDays = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );

      const request: PermissionRequest = {
        id: Date.now() + i,
        employeeName,
        type,
        startDate: start.toISOString().split('T')[0],
        endDate: end.toISOString().split('T')[0],
        totalDays,
        status,
      };

      this.requests.push(request);
    }
  }

  addRequest() {
    if (!this.employeeName || !this.startDate || !this.endDate) return;

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const totalDays =
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    if (totalDays <= 0) {
      alert('İzin başlangıç ve bitiş tarihleri geçerli değil.');
      return;
    }

    if (totalDays > this.remainingDays[this.selectedType]) {
      alert(
        `Seçilen izin türü için kalan izin gününüz (${
          this.remainingDays[this.selectedType]
        }) yetersiz.`
      );
      return;
    }

    const newRequest: PermissionRequest = {
      id: Date.now(),
      employeeName: this.employeeName,
      type: this.selectedType,
      startDate: this.startDate,
      endDate: this.endDate,
      totalDays,
      status: 'Beklemede',
    };

    this.requests.push(newRequest);
    this.employeeName = '';
    this.startDate = '';
    this.endDate = '';
  }

  approveRequest(id: number) {
    const req = this.requests.find((r) => r.id === id);
    if (req && req.status === 'Beklemede') {
      req.status = 'Onaylandı';
      this.remainingDays[req.type] -= req.totalDays;
    }
  }

  rejectRequest(id: number) {
    const req = this.requests.find((r) => r.id === id);
    if (req && req.status === 'Beklemede') {
      req.status = 'Reddedildi';
    }
  }
}
