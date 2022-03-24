import { Component, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import {
    ControlValueAccessor,
    FormBuilder,
    FormGroup,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { defineStyleAction } from '../reducers/stylingReducers/action.component';
import {
    ElementStyle,
    StylingState,
} from '../reducers/stylingReducers/reducer.component';
import {
    selectByStyle,
    selectById,
    selectByElement,
} from '../reducers/stylingReducers/selector.component';
import { currentStateElement } from '../form.currentState';

/**
 * @title Accordion overview
 */
@Component({
    selector: 'accordion',
    templateUrl: 'accordion-element.component.html',
    styleUrls: ['accordion-element.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AccordionElementComponent),
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionElementComponent implements ControlValueAccessor {
    public formStyling: FormGroup;
    public currentStateElement = { ...currentStateElement };
    public styleCopy: StylingState;
    public accordionParts = ['Form Settings', 'Element settings'];
    public destroy$ = new Subject();
    public id$: Observable<number> = this.store.pipe(select(selectById));
    public element$: Observable<string> = this.store.pipe(
        select(selectByElement)
    );
    public style$: Observable<StylingState> = this.store.pipe(
        select(selectByStyle)
    );

    constructor(private store: Store<ElementStyle>, public fb: FormBuilder) {
        this.formStyling = fb.group({
            width: ['100%'],
            height: ['100%'],
            border: ['#000 solid 2px'],
            background: ['#fff'],
        });
    }

    ngOnInit(): void {
        this.style$.pipe(takeUntil(this.destroy$)).subscribe((style) => {
            this.currentStateElement.style = style;
        });
        this.element$.pipe(takeUntil(this.destroy$)).subscribe((element) => {
            this.currentStateElement.element = element;
        });
    }

    public changeElementStyles(
        referenceValue: string,
        cssPropertyName: string
    ): void {
        this.styleCopy = Object.assign({}, this.currentStateElement.style);
        this.styleCopy[cssPropertyName] = referenceValue;
        this.currentStateElement.style = this.styleCopy;
        this.store.dispatch(
            defineStyleAction({ style: this.currentStateElement.style })
        );
        this.store.pipe(takeUntil(this.destroy$)).subscribe();
    }

    private onChange = (value: string): void => {};
    private onTouched = (): void => {};

    public registerOnChange(formChanges: (value: string) => void): void {
        this.formStyling.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(formChanges);
    }

    public registerOnTouched() {}

    public writeValue(value: string[]): void {
        if (value) {
            this.formStyling.setValue(value);
        }
    }

    public updateValue(insideValue: string): void {
        this['width'] = insideValue;
        this['height'] = insideValue;
        this['border'] = insideValue;
        this['background-color'] = insideValue;
        this.onChange(insideValue);
        this.onTouched();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
