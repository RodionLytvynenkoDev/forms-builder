import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ElementStyle, StylingState } from '../reducers/actionsReducers/reducer.component';
import { selectElementStyleElem, selectElementStyleId, selectElementStyleStyle } from '../reducers/actionsReducers/selector.component';

@Component({
  selector: 'elems',
  templateUrl: './elems.component.html',
  styleUrls: ['./elems.component.css']
})
export class ElemsComponent {
  @Input() elem: any
  @Input() elemId

  public style$: Observable<StylingState> = this.store$.pipe(select(selectElementStyleStyle));
  public elem$: Observable<string> = this.store$.pipe(select(selectElementStyleElem));
  public id$: Observable<number> = this.store$.pipe(select(selectElementStyleId));

  constructor(private store$: Store<ElementStyle>){
  }

  public currentStateElement:ElementStyle={
    id: 0,
    elem: '',
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
  public currentState:ElementStyle={
    id: 0,
    elem: '',
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

  ngOnInit():void{
    
    this.elem$.subscribe((elem) => {
      this.currentState.elem = elem
    })
    this.id$.subscribe((id) => {
      this.currentState.id = id
    })
    this.style$.subscribe((style) => {
      console.log(this.currentState.id, "++++")
      if (this.currentState.id === this.elemId)
        this.currentStateElement.style = style
      
      
    })
    console.log(this.elemId)
  }
}
