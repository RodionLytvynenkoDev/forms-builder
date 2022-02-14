import { Observable } from "rxjs";
import { actionTypes, LoginAction, LoginFailureAction, LoginSuccessAction } from "./user.actions";
import {AuthenticationService} from '../_services/authentication.service'
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthenticationService,
    private router: Router,
  ) {}

    @Effect()
        Login: Observable<Action> = this.actions
            .ofType(actionTypes.LOGIN)
            .map((action: LoginAction) => action.payload)
            .switchMap(payload => {
                return this.authService.login(payload.email, payload.password)
                .map((user) => {
                    console.log(user);
                    return new LoginSuccessAction({token: user.token, email: payload.email});
                })
                .catch((error) => {
                    console.log(error);
                    return Observable.of(new LoginFailureAction({ error: error }));
                });
            });
    @Effect({ dispatch: false })
    LoginSuccess: Observable<any> = this.actions.pipe(
        ofType(actionTypes.LOGIN_SUCCESS),
        tap((user) => {
        localStorage.setItem('token', user.payload.token);
        this.router.navigateByUrl('/');
        })
    );
    @Effect({ dispatch: false })
        LoginFailure: Observable<any> = this.actions.pipe(
        ofType(actionTypes.LOGIN_FAILURE)
    );
    @Effect()
        SignUp: Observable<any> = this.actions
        .ofType(actionTypes.SIGNUP)
        .map((action: SignUp) => action.payload)
        .switchMap(payload => {
            return this.authService.register(payload.email, payload.password)
            .map((user) => {
                console.log(user);
                return new SignUpSuccess({token: user.token, email: payload.email});
            })
            .catch((error) => {
                console.log(error);
                return Observable.of(new SignUpFailure({ error: error }));
            });
        });
    @Effect({ dispatch: false })
    SignUpSuccess: Observable<any> = this.actions.pipe(
        ofType(actionTypes.SIGNUP_SUCCESS),
        tap((user) => {
        localStorage.setItem('token', user.payload.token);
        this.router.navigateByUrl('/');
        })
    );
    @Effect({ dispatch: false })
        SignUpFailure: Observable<any> = this.actions.pipe(
            ofType(AuthActionTypes.SIGNUP_FAILURE)
    );
    

}
