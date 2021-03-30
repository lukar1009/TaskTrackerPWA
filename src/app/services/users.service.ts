import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(private http: HttpClient) { }

    async getAllUsers() {
        let url = "http://localhost:3000/users";
        return await this.http.get<User[]>(url).toPromise();
    }
}