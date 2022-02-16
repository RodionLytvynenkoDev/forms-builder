// student.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { LoginComponent } from './login';
import { AuthEffects } from './reducers/store/user.effects';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './reducers/index';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot({}, {}),         
    StoreModule.forRoot(reducers, {metaReducers}),
  ]
})
export class AuthModule { }