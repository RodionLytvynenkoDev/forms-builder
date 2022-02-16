import {Component, Input, Output, EventEmitter, forwardRef, ChangeDetectionStrategy} from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, pipe } from 'rxjs';
import { defineStyleAction } from '../../../../forms/home/form/reducers/actionsReducers/action.component';
import { ElementStyle, StylingState } from '../../../../forms/home/form/reducers/actionsReducers/reducer.component';
import {selectElementStyleElem, selectElementStyleId, selectElementStyleStyle} from '../../../../forms/home/form/reducers/actionsReducers/selector.component'
import { currentStateElement } from '../form.currentState';

/**
 * @title Accordion overview
 */
@Component({
  selector: 'accordion',
  templateUrl: 'accordion-elem.component.html',
  styleUrls: ['accordion-elem.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AccordionElemComponent),
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionElemComponent implements ControlValueAccessor {
  parameters: FormGroup
  
  notifier = new Subject()
  
  public elementId$: Observable<number> = this.store$.pipe(select(selectElementStyleId));
  public elem$: Observable<string> = this.store$.pipe(select(selectElementStyleElem));
  public style$: Observable<StylingState> = this.store$.pipe(select(selectElementStyleStyle));
  constructor(private store$: Store<ElementStyle>, fb: FormBuilder){
    this.parameters = fb.group({
      width:['100%'],
      height: ['100%'],
      border: ['#000 solid 2px'],
      background: ['#fff']
    });
  }

  public styleParams = {
    width_style: "",
    height_style: "",
    required: "",
    fontSize_style: "",
    fontWeight: "",
    color_style: "",
    background_style: "",
    borderStyle: "",
    placeholder_value: ""
  }
  
  public inputParam(value: string, param: string, inputParam: string): void {
    this.altObj = Object.assign({}, this.currentStateElement.style);
    inputParam = value
    this.altObj[param] = inputParam
    this.currentStateElement.style = this.altObj
    
    this.store$.dispatch(new defineStyleAction({style: this.currentStateElement.style }))
    this.store$.pipe(takeUntil(this.notifier))
    .subscribe(x => console.log(x))
  }

  public currentStateElement = {...currentStateElement}

  altObj = Object.assign({}, this.currentStateElement.style);
  
  ngOnInit():void{

    this.elem$.pipe(takeUntil(this.notifier))
    .subscribe((element)=>{
      this.currentStateElement.elem=element;
    })
    this.elementId$.pipe(takeUntil(this.notifier))
    .subscribe((id) => {
      this.currentStateElement.id = id
    })
    this.style$.pipe(takeUntil(this.notifier))
    .subscribe((style) => {
      this.currentStateElement.style = style
    })
    
  }
  
  items = ['Form Settings', 'Element settings'];
  expandedIndex = 0;
  'width' = 0
  'height' = 0
  'border' = 0
  'background-color' = 0
  disabled = false;
  private onChange = (value: string) => {};
  private onTouched = () => {};

  registerOnChange(fn: (value: string) => void) {
    this.parameters.valueChanges.subscribe(fn);
  }

  registerOnTouched() {
    
  }

  writeValue(value: string[]) {
    if(value) {
        this.parameters.setValue(value);
    }
  }

  updateValue(insideValue: any) {
    this['width'] = insideValue;
    this['height'] = insideValue;
    this['border'] = insideValue;
    this['background-color'] = insideValue; 
    this.onChange(insideValue); 
    this.onTouched();
  }

}
