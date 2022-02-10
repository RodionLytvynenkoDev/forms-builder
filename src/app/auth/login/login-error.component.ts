import {Component} from '@angular/core';
import { Inject } from '@angular/core';

@Component({
  selector: 'login-error',
  template: `
    <h1>{{errors}}</h1>
  `
})
export class LoginError {
  errors: string[];
  
  //constructor( private  errors: string[]) {}
}