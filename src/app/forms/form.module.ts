import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';

import { HomeComponent } from './home';
import { FormComponent } from './home/form/form.component';
import { ElemsComponent } from './home/form/elements/elements.component';
import { AccordionElemComponent } from './home/form/accordion-elem/accordion-elem.component';
import { FormatPipe } from './home/pipes/format.pipe'
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [
    HomeComponent,
    FormComponent, 
    ElemsComponent, 
    AccordionElemComponent, 
    FormatPipe],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule, 
    DragDropModule, 
    CdkAccordionModule
  ],
  exports: [RouterModule]
})
export class FormModule { }