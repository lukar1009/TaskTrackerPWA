import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { User } from './models/user';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TaskTrackerPWA';

  constructor(private swUpdate: SwUpdate,
              private dataService: DataService) { }
  
  ngOnInit(): void {
    this.reloadCache();

  }

  checkUserLoggedIn() {
    if(localStorage.getItem("id")) {
      let user = new User();
      user.id = +localStorage.getItem("id");
      user.name = localStorage.getItem("name");
      user.email = localStorage.getItem("email");
      user.password = localStorage.getItem("password");
      this.dataService.changeLoggedUser(user);
    } else {
      this.dataService.changeLoggedUser(null);
    }
  }

  reloadCache(){
    if(this.swUpdate.isEnabled){
      this.swUpdate.available.subscribe(() =>{
        if(confirm('New version available! would you like to update?')){
          window.location.reload();
        }
      })
    }
  }
}
