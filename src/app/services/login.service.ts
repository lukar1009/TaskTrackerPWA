import { Injectable } from "@angular/core";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor() { }

    loginUser(user: User) { 
        localStorage.setItem("id", user.id.toString());
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("password", user.password);
    }

    logoutUser() {
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("password");
    }
}