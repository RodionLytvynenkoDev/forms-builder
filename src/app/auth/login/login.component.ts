import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';
import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { LoginError } from './login-error.component';
import { Store } from '@ngrx/store';
import { State } from 'src/app/forms/home/form/reducers';
import {LoginAction, SignupAction} from '../reducers/user.actions'

@Component({ templateUrl: 'login.component.html',
            styleUrls: ['login.component.css'] })
export class LoginComponent implements OnInit {
    //@ViewChild(CdkPortalOutlet) host: CdkPortalOutlet;
    /*@ViewChild('virtualContainer', {read: ViewContainerRef, static: false})
    virtualContainer: ViewContainerRef;

    @ViewChild('virtualContainer', {read: CdkPortalOutlet, static: false})
    virtualPortalOutlet: CdkPortalOutlet;

    @ViewChild('customTemplate', {static: false})
    customTemplate: TemplateRef<any>;
    

    renderTemplate() {
        this.virtualContainer.clear();
        this.virtualContainer.createEmbeddedView(this.customTemplate, {
            name: 'Cat Bobby'
        });
    }*/
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private store$: Store<State>,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ){ 
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    /*project() {
        const portal = new ComponentPortal(LoginError);
        this.host.attachComponentPortal(portal);
    }*/

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }


    get f() { return this.loginForm.controls; }

    onSubmit(event) {
        //this.project()
        if (event.submitter.name == "login") {
            this.submitted = true;


            if (this.loginForm.invalid) {
                return;
            }

            this.loading = true;
            this.store$.dispatch(new LoginAction({username: this.f.username.value, password:  this.f.password.value}))
            
            /*this.authenticationService.login(this.f.username.value, this.f.password.value)
                .pipe(first())
                .subscribe(
                    data => {
                        this.router.navigate([this.returnUrl]);
                    },
                    error => {
                        this.error = error;
                        this.loading = false;
                    });*/
        }
        if (event.submitter.name == "register") {
            this.submitted = true;


            if (this.loginForm.invalid) {
                return;
            }

            this.loading = true;
            this.store$.dispatch(new SignupAction({username: this.f.username.value, password:  this.f.password.value}))
            /*this.authenticationService.register(this.f.username.value, this.f.password.value)
                .pipe(first())
                .subscribe(
                    data => {
                        this.router.navigate([this.returnUrl]);
                    },
                    error => {
                        this.error = error;
                        this.loading = false;
                    });*/
        }
        
    }
}