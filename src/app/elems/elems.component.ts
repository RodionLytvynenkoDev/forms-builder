import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
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
  @Input() id: number

  

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
      elemColorInput: "",
      elemBg: ""
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
      elemColorInput: "",
      elemBg: ""
    }
  }


  notifier = new Subject()

  ngOnInit():void{
    this.elem$.pipe(takeUntil(this.notifier))
    .subscribe((elem) => {
      this.currentState.elem = elem
    })
    
    this.id$.pipe(takeUntil(this.notifier))
    .subscribe((id) => {
      this.currentState.id = id
    })
    this.currId$.pipe(takeUntil(this.notifier))
    .subscribe((currId) => {
      this.currentId = currId
    })

    

    
    
  }
  ngOnChanges(changes: SimpleChanges) :void {
    this.style$.pipe(takeUntil(this.notifier))
    .subscribe((style) => {
      console.log(this.currentState, "++++")
      console.log(this.currentState.id == this.id, this.currentState.id, this.id, "0000")
      console.log(style)
      if (this.currentState.id == this.id)
        this.currentStateElement.style = style   
    })
    

  }
  ngOnDestroy() {
    this.notifier.next(true)
    this.notifier.complete()
  }
  
}
