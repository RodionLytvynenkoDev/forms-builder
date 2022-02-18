import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './auth/services';
import { IUser } from './auth/interfaces';
import { Subject, takeUntil } from 'rxjs';

@Component({ selector: 'app', 
templateUrl: 'app.component.html',
styleUrls: ['./app.component.css'] })
export class AppComponent {
    currentUser: IUser;
    destroy$ = new Subject()

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.pipe(takeUntil(this.destroy$))
        .subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    ngOnDestroy() {
        this.destroy$.next(true)
        this.destroy$.complete()
    }
}