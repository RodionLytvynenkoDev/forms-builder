import {
  CdkPortalOutlet,
  ComponentPortal,
  PortalInjector
} from '@angular/cdk/portal';

import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  TemplateRef,
  ElementRef,
  Input
} from '@angular/core';
import { CdkDragStart, CdkDragMove, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {


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

  formWidth: string = ""
  formHeight: string = ""
  draggableFields = [
    "input", 
    "textarea", 
    "button", 
    "labelCheck", 
    "select"
  ];

  formFields = [
    
  ];
  


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
