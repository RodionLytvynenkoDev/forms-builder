import {Component, Input, Output, EventEmitter} from '@angular/core';

/**
 * @title Accordion overview
 */
@Component({
  selector: 'accordion',
  templateUrl: 'accordion-elem.component.html',
  styleUrls: ['accordion-elem.component.css'],
})
export class AccordionElemComponent {
  items = ['Form Settings', 'Element settings'];
  expandedIndex = 0;
  @Input() widthInputForm:string = "";
  @Output() widthInputFormChange = new EventEmitter<string>();
  widthFormChange(model: string){
         
    this.widthInputForm = model;
    this.widthInputFormChange.emit(model);
  }
  @Input() heightInputForm:string = "";
  @Output() heightInputFormChange = new EventEmitter<string>();
  heightFormChange(model: string){
         
    this.heightInputForm = model;
    this.heightInputFormChange.emit(model);
  }
  
  
}
