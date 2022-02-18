import { createReducer, on } from '@ngrx/store';
import {
    ErrorAction,
    LoginFailureAction,
    LoginSuccessAction,
    SignupFailureAction,
    SignupSuccessAction,
} from './user.actions';

export const UserAuth = 'user';

export interface UserState {
    isAuthenticated: boolean;
    errorMessage: string | null;
    error: string | null;
}

export const initialState: UserState = {
    isAuthenticated: false,
    errorMessage: null,
    error: null,
};

export const UserReducer = createReducer(
    initialState,
    on(LoginSuccessAction, (state, { isAuthenticated, username, token }) => {
        return { ...state, isAuthenticated: true };
    }),
    on(LoginFailureAction, (state, { errorMessage }) => {
        return { ...state, errorMessage: 'Incorrect email and/or password.' };
    }),
    on(SignupSuccessAction, (state, { isAuthenticated, username, token }) => {
        return { ...state, isAuthenticated: true };
    }),
    on(SignupFailureAction, (state, { errorMessage }) => {
        return {
            ...state,
            errorMessage: 'User with this email already exists',
        };
    }),
    on(ErrorAction, (state, { error }) => {
        return {
            ...state,
            error: error,
        };
    })
);