import {
  ChangeDetectionStrategy,
  Component, OnChanges, TemplateRef, ViewChild, ViewContainerRef,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { select, Store } from '@ngrx/store';
import { ElementStyle, StylingState } from '../../../forms/home/form/reducers/actionsReducers/reducer.component';
import { currIdAction, defineElemAction, defineIdAction, defineStyleAction } from '../../../forms/home/form/reducers/actionsReducers/action.component';
import { Observable, Subject, takeUntil, pipe, of, tap } from 'rxjs';
import { selectElementStyleElem, selectElementStyleId, selectElementStyleStyle } from '../../../forms/home/form/reducers/actionsReducers/selector.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import {currentStateElement} from './form.currentState'

@Component({
  selector: 'form-project',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {
  form: FormGroup

  public elementId$: Observable<number> = this.store$.pipe(select(selectElementStyleId));
  public elem$: Observable<string> = this.store$.pipe(select(selectElementStyleElem));
  public style$: Observable<StylingState> = this.store$.pipe(select(selectElementStyleStyle));

  constructor(private store$: Store<ElementStyle>, fb: FormBuilder){
    this.form = fb.group({
      parameters: [{width: '', height:'', border: '', background: ''}]
      
    });
  }

  private currentStateElement = {...currentStateElement}

 /* @ViewChild('virtualContainer', {read: ViewContainerRef, static: false})
    virtualContainer: ViewContainerRef;

    @ViewChild('virtualContainer', {read: CdkPortalOutlet, static: false})
    virtualPortalOutlet: CdkPortalOutlet;

    @ViewChild('customTemplate', {static: false})
    customTemplate: TemplateRef<any>;
    
    renderTemplate() {
        this.virtualContainer.clear();
        this.virtualContainer.createEmbeddedView(this.customTemplate, {
            name: 'Cat Bobby'
        });
    }*/

  notifier = new Subject()
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

  ngOnDestroy() {
    this.notifier.next(true)
    this.notifier.complete()
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
  public counter: number = 0

  public getIndex(i: number) {
    this.elemId = i
    this.elemInd = this.formFields[i].elem
    //console.log(this.elemId)
    //console.log(this.formFields[i])
    
    this.store$.dispatch(new defineIdAction({id:this.formFields[i].id}))
    this.store$.dispatch(new currIdAction({currId:i}))
    this.store$.dispatch(new defineElemAction({elem:this.formFields[i].elem}))
    this.store$.dispatch(new defineStyleAction({style:this.currentStateElement.style}))
    this.store$.pipe(takeUntil(this.notifier))
    .subscribe(x => console.log(x))
  }

  /*dragStart(event: CdkDragStart) {
    this._currentIndex = this.draggableFields.indexOf(event.source.data); // Get index of dragged type
    this._currentField = this.child.nativeElement.children[this._currentIndex]; // Store HTML field
    console.log(this._currentIndex)
  }*/

  public drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.formFields.splice(event.currentIndex, 0, {elem:event.previousContainer.data[event.previousIndex],id:this.counter++})
      //console.log(this.formFields)
      //console.log(event.currentIndex)
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