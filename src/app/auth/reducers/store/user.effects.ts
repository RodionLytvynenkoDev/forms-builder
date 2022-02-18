import { Observable, of } from "rxjs";
import { actionTypes, ErrorAction, LoginAction, LoginFailureAction, LoginSuccessAction, SignupAction, SignupFailureAction, SignupSuccessAction } from "./user.actions";
import {AuthenticationService} from '../../services/authentication.service'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { IUser } from "../../interfaces";
import { Store } from "@ngrx/store";
import {UserState} from './user.reducers'

@Injectable()
export class AuthEffects {

    constructor(
        private actions: Actions,
        private authService: AuthenticationService,
        private router: Router,
        private store$: Store<UserState>
    ) {}

    Login = createEffect(() => {
        return this.actions.pipe(
            ofType(actionTypes.LOGIN),
            map((action: LoginAction) => action.payload),
            switchMap((payload: IUser) => {
                return this.authService.login(payload.username, payload.password).pipe(
                    map((user) => {
                        this.router.navigateByUrl('/');
                        return new LoginSuccessAction({ token: user.token, email: payload.username });
                    }),
                    catchError((error) => {
                        this.store$.dispatch(new ErrorAction({error: error }))                      
                        return of(new LoginFailureAction({ error: error }));
                    })
                );
            })
        );
    });
    
    SignUp = createEffect(() => {
        return this.actions.pipe(
            ofType(actionTypes.SIGNUP),
            map((action: SignupAction) => action.payload),
            switchMap((payload: IUser) => {
                return this.authService.register(payload.username, payload.password).pipe(
                    map((user) => {
                        this.router.navigateByUrl('/');
                        return new SignupSuccessAction({ token: user.token, email: payload.username });
                    }),
                    catchError((error) => {
                        return of(new SignupFailureAction({ error: error }));
                    })
                );

            })
        );
    }) 
}
