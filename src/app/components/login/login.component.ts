import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SwPush } from "@angular/service-worker";
import { User } from "src/app/models/user";
import { LoginService } from "src/app/services/login.service";
import { NotificationsService } from "src/app/services/notifications.service";
import { UsersService } from "src/app/services/users.service";
import notify from "devextreme/ui/notify";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {

    readonly VAPID_KEY = "BDk__m-1DSIAYrLX4iY7cYW1HM0KIRDyhX0bLTJudpvnJGI_Us2SIWfnBZb5mpJ4aHju6JeKs53CDe5j1qBT7wM";


    public usersList: User[] = [];
    public user: User = new User();
    public usersLoaded: boolean = false;

    constructor(private usersService: UsersService,
                private loginService: LoginService,
                private router: Router,
                private notificationService: NotificationsService,
                private swPush: SwPush,
                private dataService: DataService) { }

    ngOnInit(): void {
        this.getAllUsers();
    }

    ngOnDestroy(): void {

    }

    getAllUsers() { 
        this.usersService.getAllUsers().then(users => {
            this.usersList = users;
        }).finally(() => {
            this.usersLoaded = true;
        });
    }

    login() {
        let logged: boolean = false;
        this.usersList.forEach(user => {
            if(user.email == this.user.email && user.password == this.user.password) {
                logged = true;
                this.user = user;
            }
        });
        if(logged) {
            this.dataService.changeLoggedUser(this.user);
            this.loginService.loginUser(this.user);
            notify({
                message: "Successfully logged in!",
                width: 300
            }, "success", 2000);
            this.subscribeToNotification();
            this.router.navigate(['/tasks']);

        } else {
            notify({
                message: "Wrong Email or Password!",
                width: 300
            }, "error", 2000);
        }
    }

    subscribeToNotification() {
        if(this.swPush.isEnabled) {
            this.swPush.requestSubscription({
                serverPublicKey: this.VAPID_KEY
            })
            .then((sub) => {
                // let body = new PushSubClass();
                // body.userId = {id: 1, name: 'luka'};
                // body.sub = sub;
                let body = {
                    userId: this.user.id,
                    sub: sub
                }
                this.notificationService.postSubscription(body).subscribe();
            })
            .catch(console.error);
        }
    }
}