import { Action, createAction, props } from '@ngrx/store';

export enum actionTypes {
    LOGIN = '[AUTH] Login',
    LOGIN_SUCCESS = '[AUTH] Login Success',
    LOGIN_FAILURE = '[AUTH] Login Failure',
    SIGNUP = '[AUTH] Signup',
    SIGNUP_SUCCESS = '[AUTH] Signup Success',
    SIGNUP_FAILURE = '[AUTH] Signup Failure',
    DEFINE_ERROR = '[AUTH] Error',
}

export const LoginAction = createAction(
    actionTypes.LOGIN,
    props<{ username: string; password: string }>()
);

export const LoginSuccessAction = createAction(
    actionTypes.LOGIN_SUCCESS,
    props<{ username: string; token: string; isAuthenticated: boolean; }>()
);

export const LoginFailureAction = createAction(
    actionTypes.LOGIN_FAILURE,
    props<{ error: string; errorMessage: string }>()
);

export const SignupAction = createAction(
    actionTypes.SIGNUP,
    props<{ username: string; password: string }>()
);

export const SignupSuccessAction = createAction(
    actionTypes.SIGNUP_SUCCESS,
    props<{ token: string; username: string; isAuthenticated: boolean }>()
);

export const SignupFailureAction = createAction(
    actionTypes.SIGNUP_FAILURE,
    props<{ error: string; errorMessage: string }>()
);

export const ErrorAction = createAction(
    actionTypes.DEFINE_ERROR,
    props<{ error: string }>()
);
