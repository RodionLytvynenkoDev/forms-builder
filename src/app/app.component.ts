import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../app/auth/_services';
import { User } from '../app/auth/_models';
import { Subject } from 'rxjs';

@Component({ selector: 'app', 
templateUrl: 'app.component.html',
styleUrls: ['./app.component.css'] })
export class AppComponent {
    currentUser: User;
    notifier = new Subject()

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}