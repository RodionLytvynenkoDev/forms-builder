import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, takeUntil } from 'rxjs/operators';

import { AuthenticationService } from '../_services';

import { select, Store } from '@ngrx/store';

import {LoginAction, SignupAction} from '../reducers/store/user.actions'
import { Observable, Subject } from 'rxjs';
import {selectError} from '../reducers/store/user.selectors'
import { UserState } from '../reducers/store/user.reducers';

@Component({ templateUrl: 'login.component.html',
            styleUrls: ['login.component.css'] })
export class LoginComponent implements OnInit {
    public error$: Observable<string> = this.store$.pipe(select(selectError));
    currentError: string
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
    notifier = new Subject()
    constructor(
        private store$: Store<UserState>,
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
        this.store$.pipe(takeUntil(this.notifier))
        .subscribe((error) => {          
            
            console.log(error, "====")                   
        })
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    ngOnChanges() :void {
        
        this.error$.pipe(takeUntil(this.notifier))
        .subscribe((error) => {          
            this.currentError = error 
            console.log(error, "--------")                   
        })
    }
    ngOnDestroy() {
        this.notifier.next(true)
        this.notifier.complete()
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