import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeList } from '../employee-list/employee-list';
import { AuthService } from '../../../AuthService';

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
  selector: 'app-employee-manage',
  standalone: true,
  imports: [CommonModule, FormsModule, EmployeeList],
  templateUrl: './employee-manage.html',
  styleUrls: ['./employee-manage.css'],
})
export class EmployeeManageComponent {
  employees: Employee[] = [
    {
      id: 1,
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      contact: 'ahmet@example.com',
      position: 'Yazılım Mühendisi',
      department: 'BT',
      hireDate: '2021-06-15',
      editMode: false,
    },
    {
      id: 2,
      firstName: 'Ayşe',
      lastName: 'Demir',
      contact: 'ayse@example.com',
      position: 'İK Uzmanı',
      department: 'İnsan Kaynakları',
      hireDate: '2020-03-10',
      editMode: false,
    },
  ];

  newFirstName = '';
  newLastName = '';
  newContact = '';
  newPosition = '';
  newDepartment = '';
  newHireDate = '';

  showForm = false;

  userRole: string | null;

  constructor(private auth: AuthService) {
    this.userRole = this.auth.getUserRole();
  }

  addEmployee(event: Event) {
    event.preventDefault();

    if (this.userRole !== 'admin') return;

    if (!this.newFirstName.trim() || !this.newLastName.trim()) return;

    const newEmployee: Employee = {
      id:
        this.employees.length > 0
          ? Math.max(...this.employees.map((e) => e.id)) + 1
          : 1,
      firstName: this.newFirstName.trim(),
      lastName: this.newLastName.trim(),
      contact: this.newContact.trim(),
      position: this.newPosition.trim(),
      department: this.newDepartment.trim(),
      hireDate: this.newHireDate,
      editMode: false,
    };

    this.employees.push(newEmployee);

    this.newFirstName = '';
    this.newLastName = '';
    this.newContact = '';
    this.newPosition = '';
    this.newDepartment = '';
    this.newHireDate = '';

    this.showForm = false;
  }

  deleteEmployee(id: number) {
    if (this.userRole !== 'admin') return;

    this.employees = this.employees.filter((e) => e.id !== id);
  }

  editEmployee(employee: Employee) {
    if (this.userRole !== 'admin') return;

    employee.editMode = true;
  }

  saveEmployee(employee: Employee) {
    if (this.userRole !== 'admin') return;

    employee.firstName = employee.firstName.trim();
    employee.lastName = employee.lastName.trim();
    employee.position = employee.position.trim();
    employee.department = employee.department.trim();
    employee.editMode = false;
  }

  cancelEdit(employee: Employee) {
    employee.editMode = false;
  }
}
