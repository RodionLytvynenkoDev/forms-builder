import {
    Component,
    ElementRef,
    HostBinding,
    ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from './authorization/services';
import { IUser } from './authorization/interfaces';
import { select, Store } from '@ngrx/store';
import { selectByTheme } from './forms/home/form/reducers/darkThemeReducers/selector.component';
import { ThemeState } from './forms/home/form/reducers/darkThemeReducers/reducer.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
    public currentUser: IUser;
    public destroy$ = new Subject();
    public isDark$: Observable<boolean> = this.store.pipe(
        select(selectByTheme)
    );
    public isDark: boolean;
    color: string;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private store: Store<ThemeState>
    ) {
        this.authenticationService.currentUser
            .pipe(takeUntil(this.destroy$))
            .subscribe((x) => (this.currentUser = x));
    }

    ngOnInit() {
        this.isDark$.pipe(takeUntil(this.destroy$)).subscribe((theme) => {
            this.isDark = theme;
        });
    }

    public logout(): void {
        this.authenticationService.logout();
        this.router.navigate(['/signIn']);
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
