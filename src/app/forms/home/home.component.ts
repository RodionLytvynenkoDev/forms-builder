import { Component, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { IUser } from '../../authorization/interfaces';
import {
    UserService,
    AuthenticationService,
} from '../../authorization/services';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
    public users: IUser[];
    public currentUser: IUser;

    public destroy$ = new Subject();

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser
            .pipe(takeUntil(this.destroy$))
            .subscribe((x) => (this.currentUser = x));
    }

    ngOnInit() {
        this.userService
            .getAll()
            .pipe(first())
            .pipe(takeUntil(this.destroy$))
            .subscribe((users) => {
                this.users = users;
            });
    }

    buttonTest() {
        console.log(1)
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
