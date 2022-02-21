import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../services';
import { SignInAction, SignupAction } from '../reducers/user.actions';
import { UserState } from '../reducers/user.reducers';
import { IUser } from '../interfaces';

@Component({
    templateUrl: 'authentication.component.html',
    styleUrls: ['authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
    public authenticationForm: FormGroup;
    public isSubmitted = false;
    public returnUrl: string;
    public destroy$ = new Subject();

    constructor(
        private store: Store<UserState>,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.authenticationForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    public get getFormControls() {
        return this.authenticationForm.controls;
    }

    onSubmit(event: any): void {
        if (event.submitter.name == 'signIn') {
            this.isSubmitted = true;

            this.store.dispatch(
                SignInAction({
                    username: this.getFormControls.username.value,
                    password: this.getFormControls.password.value,
                })
            );
        }
        if (event.submitter.name == 'signUp') {
            this.isSubmitted = true;

            this.store.dispatch(
                SignupAction({
                    username: this.getFormControls.username.value,
                    password: this.getFormControls.password.value,
                })
            );
        }
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
