import {
  CdkPortalOutlet,
  ComponentPortal,
  PortalInjector
} from '@angular/cdk/portal';

import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { select, Store } from '@ngrx/store';
import { ElementStyle, StylingState } from '../reducers/actionsReducers/reducer.component';
import { defineElemAction, defineIdAction } from '../reducers/actionsReducers/action.component';
import { Observable } from 'rxjs';
import { selectElementStyleElem, selectElementStyleId, selectElementStyleStyle } from '../reducers/actionsReducers/selector.component';

@Component({
  selector: 'form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {

  public elementId$: Observable<number> = this.store$.pipe(select(selectElementStyleId));
  public elem$: Observable<string> = this.store$.pipe(select(selectElementStyleElem));
  public style$: Observable<StylingState> = this.store$.pipe(select(selectElementStyleStyle));

  constructor(private store$: Store<ElementStyle>){
  }

  private currentStateElement:ElementStyle={
    id: 0,
    elem: "",
    style: {
        'elemWidth': "",
        'elemHeight': "",
        'elemPlaceholder': "",
        'elemRequired': "",
        'elemBorder': "",
        'elemFontSize': "",
        'elemFontWeight': "",
        'elemColorInput': ""
    }
  }


/*  @ViewChild('virtualContainer', {read: ViewContainerRef, static: false})
    virtualContainer: ViewContainerRef;

    @ViewChild('virtualContainer', {read: CdkPortalOutlet, static: false})
    virtualPortalOutlet: CdkPortalOutlet;

    @ViewChild('customTemplate', {static: false})
    customTemplate: TemplateRef<any>;
    

    renderTemplate() {
//        this.virtualContainer.clear();
        this.virtualContainer.createEmbeddedView(this.customTemplate, {
            name: 'Cat Bobby'
        });
    }
    
*/

//[style.width]="elemWidth.length > 0 ? elemWidth : '60%'"
  widthInputElem = "";  

  formWidth: string = ""
  formHeight: string = ""
  formBorder: string = ""
  formBg: string = ""
  elemWidth: string = ""

  title: string
  
  ngOnInit():void{

    this.elem$.subscribe((element)=>{
      this.currentStateElement.elem=element;
    })
    this.elementId$.subscribe((id) => {
      this.currentStateElement.id = id
    })
    this.style$.subscribe((style) => {
      this.currentStateElement.style = style

    })
    
  }
  

  draggableFields = [
    "input", 
    "textarea", 
    "button", 
    "labelCheck", 
    "select"
  ];

  formFields = [
    
  ];

  public elemInd: string
  public elemId: number
  getIndex(i: number) {
    this.elemInd = this.formFields[i]
    this.elemId = i
    this.store$.subscribe(x => console.log(x))
    this.store$.dispatch(new defineIdAction({id:i}))
    this.store$.dispatch(new defineElemAction({elem:this.formFields[i]}))
    
    
  }

  

  
  


  /*dragStart(event: CdkDragStart) {
    this._currentIndex = this.draggableFields.indexOf(event.source.data); // Get index of dragged type
    this._currentField = this.child.nativeElement.children[this._currentIndex]; // Store HTML field
    console.log(this._currentIndex)
  }*/


  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      this.formFields.splice(event.currentIndex, 0, event.previousContainer.data[event.previousIndex])
      console.log(this.formFields)
    }
  }

  

 /* moved(event: CdkDragMove) {
    // Check if stored HTML field is as same as current field
    if (this.child.nativeElement.children[this._currentIndex] !== this._currentField) {
      // Replace current field, basically replaces placeholder with old HTML content
      this.child.nativeElement.replaceChild(this._currentField, this.child.nativeElement.children[this._currentIndex]);
    }
  }

  itemDropped(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    } else {
      this.addField(event.item.data, event.currentIndex);
    }
  }

  addField(fieldType: string, index: number) {
    this.fields.splice(index, 0, fieldType)
  }*/
}
