import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { JwtInterceptor, ErrorInterceptor } from './auth/interceptors';
import { AuthModule } from './auth/auth.module';
import { FormModule } from './forms/form.module';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './forms/home/form/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/reducers/user.effects';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        AuthModule,
        FormModule,
        StoreModule.forRoot({}, {}),
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([AuthEffects]),
    ],
    declarations: [AppComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
