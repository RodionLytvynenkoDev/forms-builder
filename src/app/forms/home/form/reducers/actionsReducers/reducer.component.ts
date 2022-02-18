import { createReducer, on } from '@ngrx/store';
import {
    defineAllAction,
    defineStyleAction,
    defineElementAction,
    currentIdAction,
    defineIdAction,
} from './action.component';

export const ElementStyles = 'style';

export interface StylingState {
    width: string;
    height: string;
    placeholder: string;
    required: string;
    border: string;
    'font-size': string;
    'font-weight': string;
    color: string;
    'background-color': string;
}

export interface ElementStyle {
    id: number;
    currentId: number;
    element: string;
    style: StylingState;
}

export const initialState: ElementStyle = {
    id: 0,
    currentId: null,
    element: '',
    style: {
        width: '',
        height: '',
        placeholder: '',
        required: '',
        border: '',
        'font-size': '',
        'font-weight': '',
        color: '',
        'background-color': '',
    },
};

export const ElementStyleReducer = createReducer(
    initialState,
    on(defineIdAction, (state, { id }) => {
        return { ...state, id: id };
    }),
    on(currentIdAction, (state, { currentId }) => {
        return { ...state, currentId: currentId };
    }),
    on(defineElementAction, (state, { element }) => {
        return { ...state, element: element };
    }),
    on(defineStyleAction, (state, { style }) => {
        return { ...state, style: style };
    }),
    on(defineAllAction, (state, { style, id, currentId, element }) => {
        return {
            ...state,
            style: style,
            id: id,
            currentId: currentId,
            element: element,
        };
    })
);