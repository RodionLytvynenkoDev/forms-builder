import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ElementStyle, StylingState } from '../reducers/actionsReducers/reducer.component';
import { selectCurrElementId, selectElementStyleElem, selectElementStyleId, selectElementStyleStyle } from '../reducers/actionsReducers/selector.component';

@Component({
  selector: 'elems',
  templateUrl: './elems.component.html',
  styleUrls: ['./elems.component.css']
})
export class ElemsComponent implements OnChanges{
  
  @Input() elemId: number
  @Input() elem: any

  

  public style$: Observable<StylingState> = this.store$.pipe(select(selectElementStyleStyle));
  public elem$: Observable<string> = this.store$.pipe(select(selectElementStyleElem));
  public id$: Observable<number> = this.store$.pipe(select(selectElementStyleId));
  public currId$: Observable<number> = this.store$.pipe(select(selectCurrElementId));
  currentId: number
  

  constructor(private store$: Store<ElementStyle>){
  }

  public currentStateElement:ElementStyle={
    id: null,
    currId: null,
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
    id: null,
    currId: null,
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


  ngOnChanges(changes: SimpleChanges) :void {
    
    this.style$.subscribe((style) => {
      console.log(this.currentState.id, "++++")
      if (this.currentState.elem === this.elem )
        this.currentStateElement.style = style     
    })

  }

  ngOnInit():void{
    this.elem$.subscribe((elem) => {
      this.currentState.elem = elem
    })
    
    this.id$.subscribe((id) => {
      this.currentState.id = id
    })
    this.currId$.subscribe((currId) => {
      this.currentId = currId
    })
    
  }
  
}
