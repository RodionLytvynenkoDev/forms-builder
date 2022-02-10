import {Component, Input, Output, EventEmitter, forwardRef} from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, of, Subject, takeUntil, pipe } from 'rxjs';
import { defineAllAction, defineElemAction, defineIdAction, defineStyleAction } from '../../../../forms/home/form/reducers/actionsReducers/action.component';
import { ElementStyle, StylingState } from '../../../../forms/home/form/reducers/actionsReducers/reducer.component';
import {selectElementStyleElem, selectElementStyleId, selectElementStyleStyle} from '../../../../forms/home/form/reducers/actionsReducers/selector.component'

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
  

  
  
  widthh = ""
  inputWidth(value: string) {
    
    this.altObj = Object.assign({}, this.currentStateElement.style);
    this.widthh = value
    this.altObj.elemWidth = this.widthh
    this.currentStateElement.style = this.altObj
    this.store$.dispatch(new defineStyleAction({style: this.currentStateElement.style }))
    this.store$.pipe(takeUntil(this.notifier))
    .subscribe(x => console.log(x))
  }

  heightt = ""
  inputHeight(value: string) {
    this.altObj = Object.assign({}, this.currentStateElement.style);
    this.heightt = value
    this.altObj.elemHeight = this.heightt
    this.currentStateElement.style = this.altObj
    this.store$.dispatch(new defineStyleAction({style: this.currentStateElement.style}))
    this.store$.pipe(takeUntil(this.notifier))
    .subscribe(x => console.log(x))
  }

  required = ""
  inputReq(value: string) {
    this.altObj = Object.assign({}, this.currentStateElement.style);

    this.required = value
    this.altObj.elemRequired = this.required
    this.currentStateElement.style = this.altObj
    this.store$.dispatch(new defineStyleAction({style: this.currentStateElement.style}))
    this.store$.pipe(takeUntil(this.notifier))
    .subscribe(x => console.log(x))
  }

  fontSizee = ""
  inputFont(value: string) {
    this.altObj = Object.assign({}, this.currentStateElement.style);
    this.fontSizee = value
    this.altObj.elemFontSize = this.fontSizee
    this.currentStateElement.style = this.altObj
    this.store$.dispatch(new defineStyleAction({style: this.currentStateElement.style}))
    this.store$.pipe(takeUntil(this.notifier))
    .subscribe(x => console.log(x))
  }

  fontWeight = ""
  inputWeight(value: string) {
    this.altObj = Object.assign({}, this.currentStateElement.style);

    this.fontWeight = value
    this.altObj.elemFontWeight = this.fontWeight
    this.currentStateElement.style = this.altObj
    this.store$.dispatch(new defineStyleAction({style: this.currentStateElement.style}))
    this.store$.pipe(takeUntil(this.notifier))
    .subscribe(x => console.log(x))
  }

  colorr = ""
  inputColor(value: string) {
    this.altObj = Object.assign({}, this.currentStateElement.style);

    this.colorr = value
    this.altObj.elemColorInput = this.colorr
    this.currentStateElement.style = this.altObj
    this.store$.dispatch(new defineStyleAction({style: this.currentStateElement.style}))
    this.store$.pipe(takeUntil(this.notifier))
    .subscribe(x => console.log(x))
  }

  backgroundd = ""
  inputBg(value: string) {
    this.altObj = Object.assign({}, this.currentStateElement.style);

    this.backgroundd = value
    this.altObj.elemBg = this.backgroundd
    this.currentStateElement.style = this.altObj
    this.store$.dispatch(new defineStyleAction({style: this.currentStateElement.style}))
    this.store$.pipe(takeUntil(this.notifier))
    .subscribe(x => console.log(x))
  }

  borderStyle = ""
  inputBorder(value: string) {
    this.altObj = Object.assign({}, this.currentStateElement.style);
    this.borderStyle = value
    this.altObj.elemBorder = this.borderStyle
    this.currentStateElement.style = this.altObj
    this.store$.dispatch(new defineStyleAction({style: this.currentStateElement.style}))
    this.store$.pipe(takeUntil(this.notifier))
    .subscribe(x => console.log(x))
  }

  placeholderr = ""
  inputPlaceholder(value) {
    this.altObj = Object.assign({}, this.currentStateElement.style);
    this.placeholderr = value
    this.altObj.elemPlaceholder = this.placeholderr
    this.currentStateElement.style = this.altObj
    this.store$.dispatch(new defineStyleAction({style: this.currentStateElement.style}))
    this.store$.pipe(takeUntil(this.notifier))
    .subscribe(x => console.log(x))
  }


  public currentStateElement:ElementStyle={
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
  width = 0
  height = 0
  border = 0
  background = 0
  disabled = false;
  private onChange = (value: any) => {};
  private onTouched = () => {};

  registerOnChange(fn: (value: any) => void) {
    this.parameters.valueChanges.subscribe(fn);
  }

  registerOnTouched() {
    
  }

  writeValue(value: any) {
    if(value) {
        this.parameters.setValue(value);
    }
  }

  updateValue(insideValue: any) {
    this.width = insideValue; // html
    this.height = insideValue; // html
    this.border = insideValue; // html
    this.background = insideValue; // html
    this.onChange(insideValue); // уведомить Forms API
    this.onTouched();
  }

}
