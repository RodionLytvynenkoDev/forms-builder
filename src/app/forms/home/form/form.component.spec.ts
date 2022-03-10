import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
    FormBuilder,
    ReactiveFormsModule,
    FormGroup,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormComponent } from './form.component';

describe('FormComponent', () => {
    let component: FormComponent;
    let fixture: ComponentFixture<FormComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    StoreModule.forRoot({}),
                    DragDropModule,
                    ReactiveFormsModule,
                ],
                declarations: [FormComponent],
                providers: [
                    FormGroup,
                    FormBuilder,
                    NG_VALUE_ACCESSOR,
                ],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(FormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create form', () => {
        expect(component).toBeTruthy();
    });
});
