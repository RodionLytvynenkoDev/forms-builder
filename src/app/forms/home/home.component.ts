import { Component, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { IUser } from '../../authorization/interfaces';
import {
    UserService,
    AuthenticationService,
} from '../../authorization/services';
import {
    selectByTheme,
} from './form/reducers/darkThemeReducers/selector.component';
import { defineThemeAction } from './form/reducers/darkThemeReducers/action.component';
import { ThemeState } from './form/reducers/darkThemeReducers/reducer.component';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
    public users: IUser[];
    public currentUser: IUser;
    public isDark$: Observable<boolean> = this.store.pipe(select(selectByTheme));
    public isDark: boolean

    public destroy$ = new Subject();

    constructor(
        private store: Store<ThemeState>,
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
        this.isDark$.pipe(takeUntil(this.destroy$)).subscribe((theme) => {
            this.isDark = theme;
        });
    }

    changeTheme():void {
        this.store.dispatch(defineThemeAction({ isDark: !this.isDark }));
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
