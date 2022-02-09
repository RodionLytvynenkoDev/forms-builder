import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {PortalModule} from '@angular/cdk/portal';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { reducers, metaReducers } from './reducers';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from '../login';
import { FormComponent } from './form/form.component';
import { ElemsComponent } from './elems/elems.component';
import {AccordionElemComponent} from './accordion-elem/accordion-elem.component';
import {FormatPipe} from './home/format.pipe'

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule, 
        StoreModule.forRoot(reducers, {metaReducers}), 
        StoreModule.forRoot({}, {}),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }), 
        EffectsModule.forRoot([]), StoreModule.forRoot(reducers, {metaReducers}),
        DragDropModule, 
        CdkAccordionModule, 
        PortalModule,
        HttpClientModule,
        AppRoutingModule,
        
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
       FormComponent, ElemsComponent, AccordionElemComponent, FormatPipe
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }