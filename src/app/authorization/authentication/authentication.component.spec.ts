import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AuthenticationComponent', () => {
    let component: AuthenticationComponent;
    let fixture: ComponentFixture<AuthenticationComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [StoreModule.forRoot({}), RouterTestingModule],
                declarations: [AuthenticationComponent],
                providers: [
                    FormBuilder,
                    AuthenticationService,
                    HttpClient,
                    HttpHandler,
                ],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthenticationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create Authentication section', () => {
        expect(component).toBeTruthy();
    });
});
