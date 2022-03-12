import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { currentStateElement } from '../form.currentState';
import { ElementsComponent } from './elements.component';

describe('ElementsComponent', () => {
    let component: ElementsComponent;
    let fixture: ComponentFixture<ElementsComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [StoreModule.forRoot({})],
                declarations: [ElementsComponent],
                providers: [],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ElementsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create Elements section', () => {
        expect(component).toBeTruthy();
    });

    it('Testing id', () => {
        expect(component.id).toEqual(undefined);
    });

    it('Testing current styles', () => {
        expect(component.currentState).toEqual({ ...currentStateElement });
    });
});
