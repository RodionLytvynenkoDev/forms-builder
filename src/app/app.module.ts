import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {PortalModule} from '@angular/cdk/portal';

import { MaterialModule } from './material.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent }   from './app.component';
import { FormComponent } from './form/form.component';
import { ElemsComponent } from './elems/elems.component';
import {AccordionElemComponent} from './accordion-elem/accordion-elem.component';
import { AccordionStylingComponent } from './accordion-styling/accordion-styling.component'



@NgModule({
    imports:      [ 
        BrowserModule, 
        FormsModule, 
        HttpClientModule, 
        DragDropModule, 
        CdkAccordionModule, 
        PortalModule, 
        MaterialModule, 
        StoreModule.forRoot({}, {}), 
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }), 
        EffectsModule.forRoot([])
    ],//, StoreRouterConnectingModule.forRoot()
    declarations: [ AppComponent, FormComponent, ElemsComponent, AccordionElemComponent, AccordionStylingComponent],
    bootstrap:    [ AppComponent,  ],
    

    
})



export class AppModule { 
    
}