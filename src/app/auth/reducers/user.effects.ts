import { Observable, of } from "rxjs";
import { actionTypes, LoginAction, LoginFailureAction, LoginSuccessAction, SignupAction, SignupFailureAction, SignupSuccessAction } from "./user.actions";
import {AuthenticationService} from '../_services/authentication.service'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User } from "../_models";

@Injectable()
export class AuthEffects {

    constructor(
        private actions: Actions,
        private authService: AuthenticationService,
        private router: Router
    ) {}

    /*setAuth = createEffect(() => {
        this.actions.pipe(
            
            ofType(actionTypes.LOGIN),
            switchMap(() => this.authService.login(payload.username, this.payload.password)
            .pipe(
                map(() => actionTypes.LOGIN_SUCCESS)
                
            ))
        )
    })*/
    ngOnInit(): void {};
    @Effect()
        Login: Observable<any> = this.actions.pipe(
            ofType(actionTypes.LOGIN),
            map((action: LoginAction) => action.payload),
            switchMap((payload: User) => {
                return this.authService.login(payload.username, payload.password).pipe(
                    map((user) => {
                        console.log(user);
                        return new LoginSuccessAction({token: user.token, email: payload.username});
                    }),
                    catchError((error) => {
                        console.log(error);
                        return of(new LoginFailureAction({ error: error }));
                    })
                ) 
            })
        );
    @Effect({ dispatch: false })
    LoginSuccess: Observable<any> = this.actions.pipe(
        ofType(actionTypes.LOGIN_SUCCESS),
        tap(() => {
        this.router.navigateByUrl('/');
        })
    );
    @Effect({ dispatch: false })
        LoginFailure: Observable<any> = this.actions.pipe(
        ofType(actionTypes.LOGIN_FAILURE)
    );
    
    @Effect()
        SignUp: Observable<any> = this.actions.pipe(
            ofType(actionTypes.SIGNUP),
            map((action: SignupAction) => action.payload),
            switchMap((payload: User) => {
                return this.authService.register(payload.username, payload.password).pipe(
                    map((user) => {
                        console.log(user);
                        return new SignupSuccessAction({token: user.token, email: payload.username});
                    }),
                    catchError((error) => {
                        console.log(error);
                        return of(new SignupFailureAction({ error: error }));
                    })
                )
                
            })
        )
        
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
    );
    

}
