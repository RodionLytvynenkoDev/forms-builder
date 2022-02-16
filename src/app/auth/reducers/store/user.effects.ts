import { Observable, of } from "rxjs";
import { actionTypes, ErrorAction, LoginAction, LoginFailureAction, LoginSuccessAction, SignupAction, SignupFailureAction, SignupSuccessAction } from "./user.actions";
import {AuthenticationService} from '../../_services/authentication.service'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User } from "../../_models";
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
            switchMap((payload: User) => {
                return this.authService.login(payload.username, payload.password).pipe(
                    map((user) => {
                        console.log(user);
                        this.router.navigateByUrl('/');
                        return new LoginSuccessAction({ token: user.token, email: payload.username });
                    }),
                    catchError((error) => {
                        console.log(error);
                        //console.log(this.store$)
                        this.store$.dispatch(new ErrorAction({error: error }))
                        console.log(this.store$)
                        return of(new LoginFailureAction({ error: error }));
                    })
                );
            })
        );
    });
   /* @Effect({ dispatch: false })
    LoginSuccess: Observable<any> = this.actions.pipe(
        ofType(actionTypes.LOGIN_SUCCESS),
        tap(() => {
        this.router.navigateByUrl('/');
        })
    );
    @Effect({ dispatch: false })
        LoginFailure: Observable<any> = this.actions.pipe(
        ofType(actionTypes.LOGIN_FAILURE)
    );*/
    
    SignUp = createEffect(() => {
        return this.actions.pipe(
            ofType(actionTypes.SIGNUP),
            map((action: SignupAction) => action.payload),
            switchMap((payload: User) => {
                return this.authService.register(payload.username, payload.password).pipe(
                    map((user) => {
                        console.log(user);
                        this.router.navigateByUrl('/');
                        return new SignupSuccessAction({ token: user.token, email: payload.username });
                    }),
                    catchError((error) => {
                        console.log(error);
                        
                        return of(new SignupFailureAction({ error: error }));
                    })
                );

            })
        );
    }) 
    /*  
    @Effect({ dispatch: false })
    SignUpSuccess: Observable<any> = this.actions.pipe(
        ofType(actionTypes.SIGNUP_SUCCESS),
        tap(() => {
        this.router.navigateByUrl('/');
        })
    );
    @Effect({ dispatch: false })
        SignUpFailure: Observable<any> = this.actions.pipe(
            ofType(actionTypes.SIGNUP_FAILURE)
    );*/
}
