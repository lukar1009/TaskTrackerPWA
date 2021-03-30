import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Project } from "../models/project";

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    constructor(private http: HttpClient) { }

    async getAllProjects() {
        let url = "http://localhost:3000/projects";
        return await this.http.get<Project[]>(url).toPromise();
    }
}