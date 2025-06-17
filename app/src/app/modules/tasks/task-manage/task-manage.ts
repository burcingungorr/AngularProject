import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  status: 'Yeni' | 'Devam Ediyor' | 'Tamamlandı';
  dueDate?: string;
}

interface User {
  id: number;
  name: string;
  tasks: Task[];
  showInput?: boolean;
}

@Component({
  selector: 'app-task-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-manage.html',
  styleUrl: './task-manage.css',
})
export class TaskManageComponent {
  users: User[] = [
    {
      id: 1,
      name: 'Ahmet',
      showInput: false,
      tasks: [
        { id: 1001, title: 'Rapor yaz', status: 'Yeni', dueDate: '2025-06-05' },
        {
          id: 1002,
          title: 'Toplantıya katıl',
          status: 'Devam Ediyor',
          dueDate: '2025-06-07',
        },
      ],
    },
    {
      id: 2,
      name: 'Ayşe',
      showInput: false,
      tasks: [
        {
          id: 1003,
          title: 'Sunum hazırla',
          status: 'Yeni',
          dueDate: '2025-06-04',
        },
        {
          id: 1004,
          title: 'Mail gönder',
          status: 'Tamamlandı',
          dueDate: '2025-06-02',
        },
      ],
    },
    {
      id: 3,
      name: 'Mehmet',
      showInput: false,
      tasks: [
        {
          id: 1005,
          title: 'Kod gözden geçir',
          status: 'Devam Ediyor',
          dueDate: '2025-06-06',
        },
        {
          id: 1006,
          title: 'Veritabanı yedekle',
          status: 'Yeni',
          dueDate: '2025-06-09',
        },
      ],
    },
  ];

  newTaskTitles: { [userId: number]: string } = {};
  newTaskStatuses: { [userId: number]: Task['status'] } = {};
  newTaskDueDates: { [userId: number]: string } = {};

  toggleInput(userId: number) {
    const user = this.users.find((u) => u.id === userId);
    if (user) user.showInput = !user.showInput;
  }

  addTask(userId: number) {
    const title = this.newTaskTitles[userId]?.trim();
    const status = this.newTaskStatuses[userId] || 'Yeni';
    const dueDate = this.newTaskDueDates[userId];

    if (!title) {
      alert('Görev başlığı boş olamaz.');
      return;
    }

    const user = this.users.find((u) => u.id === userId);
    if (user) {
      user.tasks.push({
        id: Date.now(),
        title,
        status,
        dueDate,
      });

      this.newTaskTitles[userId] = '';
      this.newTaskStatuses[userId] = 'Yeni';
      this.newTaskDueDates[userId] = '';
      user.showInput = false;
    }
  }

  removeTask(userId: number, taskId: number) {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      user.tasks = user.tasks.filter((t) => t.id !== taskId);
    }
  }

  updateTaskStatus(userId: number, taskId: number, newStatus: Task['status']) {
    const user = this.users.find((u) => u.id === userId);
    const task = user?.tasks.find((t) => t.id === taskId);
    if (task) task.status = newStatus;
  }
}
