import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
    FormBuilder,
    ReactiveFormsModule,
    FormGroup,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AccordionElementComponent } from './accordion-element.component';

describe('AccordionComponent', () => {
    let component: AccordionElementComponent;
    let fixture: ComponentFixture<AccordionElementComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [StoreModule.forRoot({}), ReactiveFormsModule],
                declarations: [AccordionElementComponent],
                providers: [FormGroup, FormBuilder, NG_VALUE_ACCESSOR],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(AccordionElementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create accordion', () => {
        expect(component).toBeTruthy();
    });
});
