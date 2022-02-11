import { actionTypes, selectAction } from "./action.component";

export const ElementStyles = 'style'


export interface StylingState {
    'width': string,
    'height': string,
    'placeholder': string,
    'required': string,
    'border': string,
    'font-size': string,
    'font-weight': string,
    'color': string,
    'background-color': string
}

export interface ElementStyle {
    id: number,
    currId: number
    elem: string,
    style: StylingState
}


export const initialState: ElementStyle = {
    id: 0,
    currId: null,
    elem: "",
    style: {
        'width': "",
        'height': "",
        'placeholder': "",
        'required': "",
        'border': "",
        'font-size': "",
        'font-weight': "",
        'color': "",
        'background-color': ""
    }
}


export const ElementStyleReducer = (state = initialState, action: selectAction) => {

    switch (action.type){
        case actionTypes.defineId:
            return{
                ...state,
                id: action.payload.id
            }
        case actionTypes.currId:
            return{
                ...state,
                currId: action.payload.currId
            }
        case actionTypes.defineElem:
            return {
                ...state,
                elem: action.payload.elem
            }
        case actionTypes.defineStyle:
            return{
                ...state,
                style: action.payload.style
            }
        case actionTypes.defineAll:
            return{
                ...state,
                id: action.payload.id,
                currId: action.payload.currId,
                elem: action.payload.elem,
                style: action.payload.style
            }
        default:
            return state;
    }
}
