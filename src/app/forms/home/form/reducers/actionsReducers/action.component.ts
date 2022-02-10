import { Action } from "@ngrx/store";
import { StylingState } from "./reducer.component";


export enum actionTypes {
    defineId = '[STYLING] defineId',
    defineElem = '[STYLING] defineElem',
    defineStyle = '[STYLING] defineStyle',
    defineAll = '[STYLING] defineAll',
    currId = '[STYLING] currId'
}


export class defineIdAction implements Action {
    readonly type = actionTypes.defineId
    constructor (public payload: {
        id: number;
    }){}
}

export class currIdAction implements Action {
    readonly type = actionTypes.currId
    constructor (public payload: {
        currId: number;
    }){}
}

export class defineElemAction implements Action {
    readonly type = actionTypes.defineElem
    constructor (public payload: {
        elem: string
    }){}
}

export class defineStyleAction implements Action {
    readonly type = actionTypes.defineStyle
    constructor (public payload: {
        style: StylingState
    }){}
}

export class defineAllAction implements Action {
    readonly type = actionTypes.defineAll
    constructor (public payload: {
        id: number,
        currId: number,
        elem: string,
        style: StylingState
    }){}
}


export type selectAction = defineIdAction | currIdAction | defineElemAction | defineStyleAction | defineAllAction