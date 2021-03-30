import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    
    private isAddTaskScreenVisibleSubject = new BehaviorSubject<boolean>(false);
    public isAddTaskScreenVisible = this.isAddTaskScreenVisibleSubject.asObservable();
    
    private loggedUserSubject = new BehaviorSubject<User>(new User());
    public loggedUser = this.loggedUserSubject.asObservable();
    
    constructor() { }

    changeIsAddTaskVisible(visible: boolean) {
        this.isAddTaskScreenVisibleSubject.next(visible);
    }

    changeLoggedUser(user: User) {
        this.loggedUserSubject.next(user);
    }
}