import {createAction, createFeatureSelector, createReducer, createSelector, on, props} from '@ngrx/store'

export const define = createAction('[STYLING] define', props<ElementStyle>());

export interface StylingState {
  elemWidth: string,
  elemHeight: string,
  elemPlaceholder: string,
  elemRequired: string,
  elemBorder: string,
  elemFontSize: string,
  elemFontWeight: string,
  elemColorInput1: number,
  elemColorInput2: number,
  elemColorInput3: number
}

export interface ElementStyle {
    id: number,
    styles: StylingState
}

export const initialState: ElementStyle = {
    styles: {
        elemWidth: '',
        elemHeight: '',
        elemPlaceholder: '',
        elemRequired: '',
        elemBorder: '',
        elemFontSize: '',
        elemFontWeight: '',
        elemColorInput1: 0,
        elemColorInput2: 0,
        elemColorInput3: 0,

    },
    id: 0
    
}

export const stylingReducer = createReducer(
    initialState,
    on(define, state => ({
        ...state,
        id: state.id + 1,
        styles: state.styles
    }))
);

export const featureSelector = createFeatureSelector<ElementStyle>("elemStyle")

export const selectedElem = createSelector(
    featureSelector,
    (state: ElementStyle):ElementStyle => state
)
