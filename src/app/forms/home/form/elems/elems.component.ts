import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ElementStyle, StylingState } from '../../../../forms/home/form/reducers/actionsReducers/reducer.component';
import { selectCurrElementId, selectElementStyleElem, selectElementStyleId, selectElementStyleStyle } from '../../../../forms/home/form/reducers/actionsReducers/selector.component';
import { currentStateElement } from '../form.currentState';

@Component({
  selector: 'elems',
  templateUrl: './elems.component.html',
  styleUrls: ['./elems.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElemsComponent implements OnChanges{
  
  @Input() elemId: number
  @Input() elem: string
  @Input() id: number

  public style$: Observable<StylingState> = this.store$.pipe(select(selectElementStyleStyle));
  public elem$: Observable<string> = this.store$.pipe(select(selectElementStyleElem));
  public id$: Observable<number> = this.store$.pipe(select(selectElementStyleId));
  public currId$: Observable<number> = this.store$.pipe(select(selectCurrElementId));
  currentId: number
  
  constructor(private store$: Store<ElementStyle>, private cdr: ChangeDetectorRef){
  }

  public currentStateElement = {...currentStateElement}
  public currentState = {...currentStateElement}

  public reassign(): void {
    this.currentStateElement.style = {
      'width': this.currentStateElement.style['width'],
      'height': this.currentStateElement.style['height'],
      'placeholder': this.currentStateElement.style['placeholder'],
      'required': this.currentStateElement.style['required'],
      'border': this.currentStateElement.style['border'],
      'font-size': this.currentStateElement.style['font-size'],
      'font-weight': this.currentStateElement.style['font-weight'],
      'color': this.currentStateElement.style['color'],
      'background-color': this.currentStateElement.style['background-color'],
    }
    console.log("Current value", this.currentStateElement.style)
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
      
      if (this.currentState.id == this.id) {
        this.currentStateElement.style = style 
        this.cdr.detectChanges()
      }          
    })
    
  }
  ngOnDestroy() {
    this.notifier.next(true)
    this.notifier.complete()
  }
  
}
