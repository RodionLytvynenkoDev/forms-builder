import { Action } from "@ngrx/store";
import { StylingState } from "./reducer.component";

export const defineId = '[STYLING] defineId';
export const defineElem = '[STYLING] defineElem';
export const defineStyle = '[STYLING] defineStyle';
export const defineAll = '[STYLING] defineAll';

export const currId = '[STYLING] currId';

export class defineIdAction implements Action {
    readonly type = defineId
    constructor (public payload: {
        id: number;
    }){}
}

export class currIdAction implements Action {
    readonly type = currId
    constructor (public payload: {
        currId: number;
    }){}
}

export class defineElemAction implements Action {
    readonly type = defineElem
    constructor (public payload: {
        elem: string
    }){}
}

export class defineStyleAction implements Action {
    readonly type = defineStyle
    constructor (public payload: {
        style: StylingState
    }){}
}

export class defineAllAction implements Action {
    readonly type = defineAll
    constructor (public payload: {
        id: number,
        currId: number,
        elem: string,
        style: StylingState
    }){}
}


export type selectAction = defineIdAction | currIdAction | defineElemAction | defineStyleAction | defineAllAction