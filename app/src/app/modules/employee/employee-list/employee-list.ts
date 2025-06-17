import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  contact: string;
  position: string;
  department: string;
  hireDate: string;
  editMode: boolean;
}
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {
  @Input() employees: Employee[] = [];
  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<Employee>();
  @Output() onSave = new EventEmitter<Employee>();
  @Output() onCancel = new EventEmitter<Employee>();
}
