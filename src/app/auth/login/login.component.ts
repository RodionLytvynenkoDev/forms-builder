import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { AuthenticationService } from '../services';
import { LoginAction, SignupAction } from '../reducers/store/user.actions'
import { selectError } from '../reducers/store/user.selectors'
import { UserState } from '../reducers/store/user.reducers';

@Component({ templateUrl: 'login.component.html',
            styleUrls: ['login.component.css'] })
export class LoginComponent implements OnInit {
    public error$: Observable<string> = this.store$.pipe(select(selectError));
    public currentError: string
    public loginForm: FormGroup;
    public loading = false;
    public isSubmitted = false;
    public returnUrl: string;

    public destroy$ = new Subject()

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

    ngOnInit() {
        
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    ngOnDestroy() {
        this.destroy$.next(true)
        this.destroy$.complete()
    }

    public get getFormControls() { return this.loginForm.controls; }

    onSubmit(event) {
        if (event.submitter.name == "login") {
            this.isSubmitted = true;

            if (this.loginForm.invalid) {
                return;
            }

            this.loading = true;
            this.store$.dispatch(new LoginAction({username: this.getFormControls.username.value, 
                password:  this.getFormControls.password.value}))
        }
        if (event.submitter.name == "register") {
            this.isSubmitted = true;

            if (this.loginForm.invalid) {
                return;
            }

            this.loading = true;
            this.store$.dispatch(new SignupAction({username: this.getFormControls.username.value, 
                password:  this.getFormControls.password.value}))
        }
    }
}