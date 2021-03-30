import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Task } from "../models/task";
import { TaskStatus } from "../models/task-status";

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor(private http: HttpClient) { }

    async getAllTasks() {
        let url = "http://localhost:3000/tasks";
        return await this.http.get<Task[]>(url).toPromise();
    }

    async getAllTaskStatuses() {
        let url = "http://localhost:3000/tasks/statuses";
        return await this.http.get<TaskStatus[]>(url).toPromise();
    }

    async insertTask(body: Task) {
        let url = "http://localhost:3000/tasks";
        return await this.http.post<Task>(url, body).toPromise();
    }
}