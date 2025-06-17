import { Routes } from '@angular/router';
import { Home } from './home/home';
import { EmployeeManageComponent } from './modules/employee/employee-manage/employee-manage';
import { EmployeeList } from './modules/employee/employee-list/employee-list';
import { TaskManageComponent } from './modules/tasks/task-manage/task-manage';
import { Permission } from './modules/permission/permission';
import { LoginComponent } from './modules/login/login';
import { AuthGuard } from './AuthGuard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: Home,
    canActivate: [AuthGuard],
  },
  {
    path: 'employees',
    component: EmployeeManageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee-list',
    component: EmployeeList,
    canActivate: [AuthGuard],
  },
  {
    path: 'tasks',
    component: TaskManageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'permission',
    component: Permission,
    canActivate: [AuthGuard],
  },
];
