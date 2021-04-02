import { Component, OnDestroy, OnInit } from "@angular/core";
import { SwPush } from "@angular/service-worker";
import { Subscription } from "rxjs/internal/Subscription";
import { Project } from "src/app/models/project";
import { Task } from "src/app/models/task";
import { TaskStatus } from "src/app/models/task-status";
import { User } from "src/app/models/user";
import { DataService } from "src/app/services/data.service";
import { NotificationsService } from "src/app/services/notifications.service";
import { ProjectsService } from "src/app/services/projects.service";
import { TaskService } from "src/app/services/tasks.service";
import { UsersService } from "src/app/services/users.service";

@Component({
    selector: "app-add-task",
    templateUrl: "./add-task.component.html",
    styleUrls: ["./add-task.component.scss"]
})
export class AddTaskComponent implements OnInit, OnDestroy {

    readonly VAPID_KEY = "BDk__m-1DSIAYrLX4iY7cYW1HM0KIRDyhX0bLTJudpvnJGI_Us2SIWfnBZb5mpJ4aHju6JeKs53CDe5j1qBT7wM";

    public user: User = new User();
    public task: Task = new Task();
    public choosenProjectId: number;
    public choosenTaskStatusId: number;
    public choosenDeveloperId: number;
    public choosenScrumMasterId: number;
    public projectsList: Project[] = [];
    public statusList: TaskStatus[] = [];
    public userList: User[] = [];
    public projectsLoaded: boolean = false;
    public statusesLoaded: boolean = false;
    public usersLoaded: boolean = false;

    private loggedUserSubscription: Subscription;

    constructor(private projectsService: ProjectsService,
                private notificationService: NotificationsService,
                private taskService: TaskService,
                private dataService: DataService,
                private swPush: SwPush,
                private userService: UsersService) { }

    ngOnInit(): void {
        this.loggedUserSubscription = this.dataService.loggedUser.subscribe(user => {
            this.user = user;
        });

        this.getAllUsers();
        this.getAllProjects();
        this.getAllStatuses();
    }

    ngOnDestroy(): void {
        this.loggedUserSubscription.unsubscribe();
    }
    
    getAllStatuses() { 
        this.taskService.getAllTaskStatuses().then(statuses => {
            this.statusList = statuses;
        }).finally(() => {
            this.statusesLoaded = true;
        });
    }

    getAllProjects() { 
        this.projectsService.getAllProjects().then(projects => {
            this.projectsList = projects;
        }).finally(() => {
            this.projectsLoaded = true;
        })
    }

    getAllUsers() {
        this.userService.getAllUsers().then(users => {
            this.userList = users;
        }).finally(() => {
            this.usersLoaded = true;
        })
    }

    onProjectValueChange(e) {
        this.choosenProjectId = +e.value;
    }

    onTaskStatusValueChange(e) {
        this.choosenTaskStatusId = +e.value;
        this.task.taskStatus = new TaskStatus();
        this.statusList.forEach(x => this.task.taskStatus = x);
    }

    onDeveloperValueChange(e) {
        this.choosenDeveloperId = +e.value;
        this.task.assignedDeveloperId = this.choosenDeveloperId;
    }

    onScrumMasterValueChange(e) {
        this.choosenScrumMasterId = +e.value;
        this.task.scrumMasterId = this.choosenScrumMasterId;
    }

    onClose(e) {
        this.dataService.changeIsAddTaskVisible(false);
    }

    insertTask() {
        this.taskService.insertTask(this.task).then(x => {
            this.showNotification();
        })
        .catch((e) => {
            console.error(e);
        })
        .finally(() => {
            this.dataService.changeIsAddTaskVisible(false);
        })
    }

    showNotification() {
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
                    developerId: this.choosenDeveloperId,
                    scrumMasterId: this.choosenScrumMasterId,
                    sub: sub
                }
                this.notificationService.showNotification(body).subscribe();
            })
            .catch(console.error);
        }
    }

}