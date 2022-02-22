import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
    ElementStyle,
    StylingState,
} from './reducers/actionsReducers/reducer.component';
import { defineAllAction } from './reducers/actionsReducers/action.component';

import {
    selectByElement,
    selectById,
    selectByStyle,
} from './reducers/actionsReducers/selector.component';
import { currentStateElement } from './form.currentState';

@Component({
    selector: 'form-project',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
    public form: FormGroup;
    public draggableFields = [
        'input',
        'textarea',
        'button',
        'labelCheck',
        'select',
    ];
    public formFields = [];
    public element: string;
    public elementId: number;
    public counter: number = 0;
    private currentStateElement = { ...currentStateElement };

    public destroy$ = new Subject();
    public elementId$: Observable<number> = this.store.pipe(select(selectById));
    public elementType$: Observable<string> = this.store.pipe(
        select(selectByElement)
    );
    public style$: Observable<StylingState> = this.store.pipe(
        select(selectByStyle)
    );

    constructor(private store: Store<ElementStyle>, public fb: FormBuilder) {
        this.form = fb.group({
            formStyling: [
                { width: '', height: '', border: '', background: '' },
            ],
        });
    }

    ngOnInit(): void {
        this.style$.pipe(takeUntil(this.destroy$)).subscribe((style) => {
            this.currentStateElement.style = style;
        });
    }

    public getIndex(i: number): void {
        this.elementId = i;
        this.element = this.formFields[i].element;
        this.store.dispatch(
            defineAllAction({
                id: this.formFields[i].id,
                element: this.formFields[i].element,
                style: this.currentStateElement.style,
            })
        );
    }

    public drop(event: CdkDragDrop<string[]>): void {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            this.formFields.splice(event.currentIndex, 0, {
                element: event.previousContainer.data[event.previousIndex],
                id: this.counter++,
            });
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
