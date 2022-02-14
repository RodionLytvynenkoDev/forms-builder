import { actionTypes, selectAction } from "./user.actions";
import {User} from '../_models'

export interface State {
    isAuthenticated: boolean;
    errorMessage: string | null;
  }

export const initialState: State = {
    isAuthenticated: false,
    errorMessage: null
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
        default:
            return state;
    }
}