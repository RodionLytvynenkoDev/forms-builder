import { createAction, props } from '@ngrx/store';

export enum actionTypes {
    SIGNIN = '[AUTH] SignIn',
    SIGNIN_SUCCESS = '[AUTH] SignIn Success',
    SIGNIN_FAILURE = '[AUTH] SignIn Failure',
    SIGNUP = '[AUTH] Signup',
    SIGNUP_SUCCESS = '[AUTH] Signup Success',
    SIGNUP_FAILURE = '[AUTH] Signup Failure',
    DEFINE_ERROR = '[AUTH] Error',
}

export const SignInAction = createAction(
    actionTypes.SIGNIN,
    props<{ username: string; password: string }>()
);

export const SignInSuccessAction = createAction(
    actionTypes.SIGNIN_SUCCESS,
    props<{ username: string; token: string; isAuthenticated: boolean }>()
);

export const SignInFailureAction = createAction(
    actionTypes.SIGNIN_FAILURE,
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
