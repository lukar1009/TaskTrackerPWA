import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './components/login/login.component';
import { TaskComponent } from './components/task/task.component';
import { AddTaskComponent } from './components/task/add-task/add-task.component';
import { NotificationsService } from './services/notifications.service';
import { ProjectsService } from './services/projects.service';
import { TaskService } from './services/tasks.service';
import { UsersService } from './services/users.service';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { LoginService } from './services/login.service';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DataService } from './services/data.service';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DxButtonModule,
    DxTextBoxModule,
    DxPopupModule,
    DxScrollViewModule,
    DxSelectBoxModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    DataService,
    LoginService,
    NotificationsService,
    ProjectsService,
    TaskService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
