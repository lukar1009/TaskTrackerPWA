import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AddTaskComponent } from './components/task/add-task/add-task.component';
import { TaskComponent } from './components/task/task.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "tasks",
    component: TaskComponent,
    children: [
      {
        path: "add",
        component: AddTaskComponent
      }
    ]
  },
  {
    path: "",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
