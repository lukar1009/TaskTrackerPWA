import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Task } from "src/app/models/task";
import { User } from "src/app/models/user";
import { DataService } from "src/app/services/data.service";
import { LoginService } from "src/app/services/login.service";
import { TaskService } from "src/app/services/tasks.service";

@Component({
    selector: "app-task",
    templateUrl: "./task.component.html",
    styleUrls: ["./task.component.scss"]
})
export class TaskComponent implements OnInit, OnDestroy {

    public user: User = new User();
    public tasksList: Task[] = [];
    public tasksLoaded: boolean = false;
    public isAddTaskButtonClicked: boolean = false;

    private isAddTaskVisibleSubscription: Subscription;
    private loggedUserSubscription: Subscription;

    constructor(private tasksService: TaskService,
                private dataService: DataService,
                private router: Router,
                private loginService: LoginService) { }

    ngOnInit(): void {
        this.loggedUserSubscription = this.dataService.loggedUser.subscribe(user => {
            if(user == null || user == undefined) {
                this.router.navigate(['/login']);
            } else {
                this.user = user;
            }
        });

        this.isAddTaskVisibleSubscription = this.dataService.isAddTaskScreenVisible.subscribe(visible => {
            this.isAddTaskButtonClicked = visible;
            this.getAllTasks();
        });

    }

    ngOnDestroy(): void {
        this.isAddTaskVisibleSubscription.unsubscribe();
        this.loggedUserSubscription.unsubscribe();
    }

    getAllTasks() {
        this.tasksLoaded = false;
        this.tasksService.getAllTasks().then(tasks => {
            this.tasksList = tasks;
        }).finally(() => {
            this.tasksLoaded = true;
        })
    }

    logoutUser() {
        this.loginService.logoutUser();
        this.dataService.changeLoggedUser(null);
        this.router.navigate(['/login']);
    }

    addNewTask() {
        this.dataService.changeIsAddTaskVisible(true);
    }

}