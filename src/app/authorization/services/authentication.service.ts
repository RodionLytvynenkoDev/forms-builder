import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IUser } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject = new BehaviorSubject<IUser>(
        JSON.parse(localStorage.getItem('currentUser'))
    );
    public currentUser = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) {}

    public get currentUserValue(): IUser {
        return this.currentUserSubject.value;
    }

    public signIn(username: string, password: string) {
        return this.http
            .post<IUser>(`${environment.apiUrl}/users/signIn`, {
                username,
                password,
            })
            .pipe(
                tap((user) => {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                })
            );
    }

    public signUp(username: string, password: string) {
        return this.http
            .post<IUser>(`${environment.apiUrl}/users/signUp`, {
                username,
                password,
            })
            .pipe(
                map((user) => {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    return user;
                })
            );
    }

    public logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
