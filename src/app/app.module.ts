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
import { reducers, metaReducers } from '../app/forms/home/form/reducers';
import { JwtInterceptor, ErrorInterceptor } from './auth/_helpers';
import { HomeComponent } from '../app/forms/home';
import { LoginComponent } from './auth/login';
import { FormComponent } from './forms/home/form/form.component';
import { ElemsComponent } from './forms/home/form/elems/elems.component';
import {AccordionElemComponent} from './forms/home/form/accordion-elem/accordion-elem.component';
import {FormatPipe} from '../app/forms/home/format.pipe'
//import {LoginError} from '../app/auth/login/login-error.component'

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
       FormComponent, ElemsComponent, AccordionElemComponent, FormatPipe, //LoginError
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }