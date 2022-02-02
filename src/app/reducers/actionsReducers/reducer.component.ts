import { defineAll, defineElem, defineId, defineStyle, selectAction  } from "./action.component";

export const ElementStyles = 'style'

export interface StylingState {
    elemWidth: string,
    elemHeight: string,
    elemPlaceholder: string,
    elemRequired: string,
    elemBorder: string,
    elemFontSize: string,
    elemFontWeight: string,
    elemColorInput: string
}

export interface ElementStyle {
    id: number,
    elem: string,
    style: StylingState
}

const initialState: ElementStyle = {
    id: 0,
    elem: "",
    style: {
        elemWidth: "",
        elemHeight: "",
        elemPlaceholder: "",
        elemRequired: "",
        elemBorder: "",
        elemFontSize: "",
        elemFontWeight: "",
        elemColorInput: ""
    }
}

export const ElementStyleReducer = (state = initialState, action: selectAction) => {

    switch (action.type){
        case defineId:
            return{
                ...state,
                id: action.payload.id
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
                elem: action.payload.elem,
                style: action.payload.style
            }
        default:
            return state;
    }
}