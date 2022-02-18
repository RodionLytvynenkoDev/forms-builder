import { createAction, props } from '@ngrx/store';
import { StylingState } from './reducer.component';

export enum actionTypes {
    defineId = '[STYLING] defineId',
    defineElement = '[STYLING] defineElement',
    defineStyle = '[STYLING] defineStyle',
    defineAll = '[STYLING] defineAll',
    currentId = '[STYLING] currentId',
}

export const defineIdAction = createAction(
    actionTypes.defineId,
    props<{ id: number }>()
);

export const currentIdAction = createAction(
    actionTypes.currentId,
    props<{ currentId: number }>()
);

export const defineElementAction = createAction(
    actionTypes.defineElement,
    props<{ element: string }>()
);

export const defineStyleAction = createAction(
    actionTypes.defineStyle,
    props<{ style: StylingState }>()
);

export const defineAllAction = createAction(
    actionTypes.defineAll,
    props<{
        id: number;
        currentId: number;
        element: string;
        style: StylingState;
    }>()
);
