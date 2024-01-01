import { Routes } from '@angular/router';
import {LoginComponent} from "./security/login/login.component";
import {RegisterComponent} from "./security/register/register.component";
import {HomeComponent} from "./user/home/home.component";
import {TaskComponent} from "./user/task/task.component";
import {TaskListComponent} from "./user/task/task-list/task-list.component";
import {TaskFormComponent} from "./user/task/task-form/task-form.component";

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: TaskComponent,
        children: [
          {
            path: '',
            component: TaskListComponent
          },
          {
            path: 'form',
            component: TaskFormComponent
          }
        ]
      }
    ]
  }
];
