import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {PortalModule} from '@angular/cdk/portal';

import { AppComponent }   from './app.component';
import { FormComponent } from './form/form.component';
import { ElemsComponent } from './elems/elems.component';
import {AccordionElemComponent} from './accordion-elem/accordion-elem.component'

import { MaterialModule } from './material.module';





@NgModule({
    imports:      [ BrowserModule, FormsModule, DragDropModule, CdkAccordionModule, PortalModule, MaterialModule],
    declarations: [ AppComponent, FormComponent, ElemsComponent, AccordionElemComponent],
    bootstrap:    [ AppComponent,  ],

    
})

export class AppModule { 
    
}