import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { IUser } from '../../authorization/interfaces';
import { UserService, AuthenticationService } from '../../authorization/services';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
})
export class HomeComponent {
    public users: IUser[];
    public currentUser: IUser;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(
            (x) => (this.currentUser = x)
        );
    }

    ngOnInit() {
        this.userService
            .getAll()
            .pipe(first())
            .subscribe((users) => {
                this.users = users;
            });
    }
}
