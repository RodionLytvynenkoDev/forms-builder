import { actionTypes, selectAction } from "./user.actions";

export const UserAuth = 'user'

export interface UserState {
    isAuthenticated: boolean;
    errorMessage: string | null;
    error: string | null
}

export const initialState: UserState = {
    isAuthenticated: false,
    errorMessage: null,
    error: null
};

export const UserReducer = (state = initialState, action: selectAction) => {
    switch (action.type){
        case actionTypes.LOGIN_SUCCESS:
            return{
                ...state,
                isAuthenticated: true,
                errorMessage: null
            }
        case actionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: 'Incorrect email and/or password.'
            };
        }
        case actionTypes.SIGNUP_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                errorMessage: null
            };
        }
        case actionTypes.SIGNUP_FAILURE: {
            return {
                ...state,
                errorMessage: 'User with this email already exists'
            };
        }
        case actionTypes.DEFINE_ERROR: {
            return {
                ...state,
                error: action.payload.error
            };
        }
        default:
            return state;
    }
}