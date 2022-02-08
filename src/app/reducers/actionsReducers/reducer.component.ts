import { defineAll, defineElem, defineId, defineStyle, selectAction, currId, currIdAction  } from "./action.component";

export const ElementStyles = 'style'


export interface StylingState {
    elemWidth: string,
    elemHeight: string,
    elemPlaceholder: string,
    elemRequired: string,
    elemBorder: string,
    elemFontSize: string,
    elemFontWeight: string,
    elemColorInput: string,
    elemBg: string
}

export interface ElementStyle {
    id: number,
    currId: number
    elem: string,
    style: StylingState
}


const initialState: ElementStyle = {
    id: 0,
    currId: null,
    elem: "",
    style: {
        elemWidth: "",
        elemHeight: "",
        elemPlaceholder: "",
        elemRequired: "",
        elemBorder: "",
        elemFontSize: "",
        elemFontWeight: "",
        elemColorInput: "",
        elemBg: ""
    }
}


export const ElementStyleReducer = (state = initialState, action: selectAction) => {

    switch (action.type){
        case defineId:
            return{
                ...state,
                id: action.payload.id
            }
        case currId:
            return{
                ...state,
                currId: action.payload.currId
            }
        case defineElem:
            return {
                ...state,
                elem: action.payload.elem
            }
        case defineStyle:
            return{
                ...state,
                style: action.payload.style
            }
        case defineAll:
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
