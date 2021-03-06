import { of } from 'rxjs';
import {
    actionTypes,
    ErrorAction,
    SignInFailureAction,
    SignInSuccessAction,
    SignupFailureAction,
    SignupSuccessAction,
} from './user.actions';
import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { IUser } from '../interfaces';
import { Store } from '@ngrx/store';
import { UserState } from './user.reducers';

@Injectable()
export class AuthEffects {
    constructor(
        private actions: Actions,
        private authService: AuthenticationService,
        private router: Router,
        private store: Store<UserState>
    ) {}

    SignIn$ = createEffect(() => {
        return this.actions.pipe(
            ofType(actionTypes.SIGNIN),
            switchMap((payload: IUser) => {
                return this.authService
                    .signIn(payload.username, payload.password)
                    .pipe(
                        map((user) => {
                            this.router.navigateByUrl('/');
                            return SignInSuccessAction({
                                token: user.token,
                                username: payload.username,
                                isAuthenticated: true,
                            });
                        }),
                        catchError((error) => {
                            this.store.dispatch(ErrorAction({ error: error }));
                            return of(
                                SignInFailureAction({
                                    error: error,
                                    errorMessage: error,
                                })
                            );
                        })
                    );
            })
        );
    });

    SignUp$ = createEffect(() => {
        return this.actions.pipe(
            ofType(actionTypes.SIGNUP),
            switchMap((payload: IUser) => {
                return this.authService
                    .signUp(payload.username, payload.password)
                    .pipe(
                        map((user) => {
                            this.router.navigateByUrl('/');
                            return SignupSuccessAction({
                                token: user.token,
                                username: payload.username,
                                isAuthenticated: true,
                            });
                        }),
                        catchError((error) => {
                            return of(
                                SignupFailureAction({
                                    error: error,
                                    errorMessage: error,
                                })
                            );
                        })
                    );
            })
        );
    });
}
