import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from './authorization/services';
import { IUser } from './authorization/interfaces';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    public currentUser: IUser;
    public destroy$ = new Subject();

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser
            .pipe(takeUntil(this.destroy$))
            .subscribe((x) => (this.currentUser = x));
    }

    public logout() {
        this.authenticationService.logout();
        this.router.navigate(['/signIn']);
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
