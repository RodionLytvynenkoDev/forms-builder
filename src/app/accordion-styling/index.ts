import { ActionReducerMap } from "@ngrx/store";
import { ElementStyle, stylingReducer, StylingState } from "./styling";

export interface State {
  elemStyle: ElementStyle
}

export const reducers: ActionReducerMap<State> = {
  elemStyle: stylingReducer
}