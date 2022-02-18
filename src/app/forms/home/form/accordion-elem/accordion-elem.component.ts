import {Component, Input, Output, EventEmitter, forwardRef, ChangeDetectionStrategy} from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, pipe } from 'rxjs';
import { defineStyleAction } from '../../form/reducers/actionsReducers/action.component';
import { ElementStyle, StylingState } from '../../form/reducers/actionsReducers/reducer.component';
import {selectByStyle, selectById, selectByElement} from '../../form/reducers/actionsReducers/selector.component'
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
  public parameters: FormGroup
  
  public destroy$ = new Subject()
  public id$: Observable<number> = this.store$.pipe(select(selectById));
  public element$: Observable<string> = this.store$.pipe(select(selectByElement));
  public style$: Observable<StylingState> = this.store$.pipe(select(selectByStyle));
  
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
  
  public inputParameter(value: string, parameter: string, inputParameter: string): void {
    this.styleCopy = Object.assign({}, this.currentStateElement.style);
    inputParameter = value
    this.styleCopy[parameter] = inputParameter
    this.currentStateElement.style = this.styleCopy
    this.store$.dispatch(defineStyleAction({style: this.currentStateElement.style }))
    this.store$.pipe(takeUntil(this.destroy$))
    .subscribe(x => console.log(x))
  }

  public currentStateElement = {...currentStateElement}
  public styleCopy = Object.assign({}, this.currentStateElement.style);
  
  ngOnInit():void{
    this.element$.pipe(takeUntil(this.destroy$))
    .subscribe((element)=>{
      this.currentStateElement.element=element;
    })
    this.id$.pipe(takeUntil(this.destroy$))
    .subscribe((id) => {
      this.currentStateElement.id = id
    })
    this.style$.pipe(takeUntil(this.destroy$))
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
