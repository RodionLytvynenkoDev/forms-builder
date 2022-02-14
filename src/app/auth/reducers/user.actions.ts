import { Action } from "@ngrx/store";

export enum actionTypes {
    LOGIN = '[AUTH] Login',
    LOGIN_SUCCESS = '[AUTH] Login Success',
    LOGIN_FAILURE = '[AUTH] Login Failure',
    SIGNUP = '[AUTH] Signup',
    SIGNUP_SUCCESS = '[AUTH] Signup Success',
    SIGNUP_FAILURE = '[AUTH] Signup Failure',
}

export class LoginAction implements Action {
    readonly type = actionTypes.LOGIN
    constructor (public payload: any){}
}

export class LoginSuccessAction implements Action {
    readonly type = actionTypes.LOGIN_SUCCESS
    constructor (public payload: any){}
}

export class LoginFailureAction implements Action {
    readonly type = actionTypes.LOGIN_FAILURE
    constructor (public payload: any){}
}

export class SignupAction implements Action {
    readonly type = actionTypes.SIGNUP
    constructor (public payload: any){}
}

export class SignupSuccessAction implements Action {
    readonly type = actionTypes.SIGNUP_SUCCESS
    constructor (public payload: any){}
}

export class SignupFailureAction implements Action {
    readonly type = actionTypes.SIGNUP_FAILURE
    constructor (public payload: any){}
}

export type selectAction = LoginAction | LoginSuccessAction | LoginFailureAction | SignupAction | SignupSuccessAction | SignupFailureAction