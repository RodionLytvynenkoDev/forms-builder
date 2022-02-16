import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {PortalModule} from '@angular/cdk/portal';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { reducers, metaReducers } from './home/form/reducers';
import { HomeComponent } from './home';
import { FormComponent } from './home/form/form.component';
import { ElemsComponent } from './home/form/elems/elems.component';
import {AccordionElemComponent} from './home/form/accordion-elem/accordion-elem.component';
import {FormatPipe} from './home/format.pipe'

@NgModule({
  declarations: [
    HomeComponent,
    FormComponent, 
    ElemsComponent, 
    AccordionElemComponent, 
    FormatPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule, 
    StoreModule.forRoot({}, {}),         
    StoreModule.forRoot(reducers, {metaReducers}),
    DragDropModule, 
    CdkAccordionModule, 
    PortalModule
  ]
})
export class FormModule { }