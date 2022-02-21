import { createReducer, on } from '@ngrx/store';
import { defineAllAction, defineStyleAction } from './action.component';

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
    element: string;
    style: StylingState;
}

export const initialState: ElementStyle = {
    id: null,
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
    on(defineStyleAction, (state, { style }) => {
        return { ...state, style: style };
    }),
    on(defineAllAction, (state, { style, id, element }) => {
        return {
            ...state,
            style: style,
            id: id,
            element: element,
        };
    })
);
