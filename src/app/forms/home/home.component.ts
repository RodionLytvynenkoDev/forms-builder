import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { IUser } from '../../auth/interfaces';
import { UserService, AuthenticationService } from '../../auth/services';

@Component({ templateUrl: 'home.component.html',
            styleUrls: ['home.component.css'] })
export class HomeComponent {
    public loading = false;
    public users: IUser[];
    public currentUser: IUser;

    constructor(private userService: UserService, private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }
}