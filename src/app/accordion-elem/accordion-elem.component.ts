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
  @Input() borderInputForm:string = "";
  @Output() borderInputFormChange = new EventEmitter<string>();
  borderFormChange(model: string){
         
    this.borderInputForm = model;
    this.borderInputFormChange.emit(model);
  }

  @Input() bgInputForm:string = "";
  @Output() bgInputFormChange = new EventEmitter<string>();
  bgFormChange(model: string){    
    this.bgInputForm = model;
    this.bgInputFormChange.emit(model);
  }

  @Input() widthInputElem:string = "";
  @Output() widthInputElemChange = new EventEmitter<string>();
  widthElemChange(model: string){
         
    this.widthInputElem = model;
    this.widthInputElemChange.emit(model);
  }

  @Input() elemInd: string
  @Input() elemId: number
  
  
}
