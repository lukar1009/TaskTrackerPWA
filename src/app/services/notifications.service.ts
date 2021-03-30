import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    constructor(private http: HttpClient) { }

    postSubscription(body: any) {
        return this.http.post("http://localhost:3000/subscribe", body).pipe(catchError(this.handlError));
    }
  
    showNotification(body: any) {
        return this.http.post("http://localhost:3000/message", body).pipe(catchError(this.handlError));
    }

    handlError(error: any) {
        return throwError(error.error.message);
    }
}