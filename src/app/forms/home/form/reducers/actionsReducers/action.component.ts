import { createAction, props } from '@ngrx/store';
import { StylingState } from './reducer.component';

export enum actionTypes {
    defineStyle = '[STYLING] defineStyle',
    defineAll = '[STYLING] defineAll',
}

export const defineStyleAction = createAction(
    actionTypes.defineStyle,
    props<{ style: StylingState }>()
);

export const defineAllAction = createAction(
    actionTypes.defineAll,
    props<{
        id: number;
        element: string;
        style: StylingState;
    }>()
);
