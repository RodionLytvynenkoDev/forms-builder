import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
    ElementStyle,
    StylingState,
} from '../../../forms/home/form/reducers/actionsReducers/reducer.component';
import {
    currentIdAction,
    defineElementAction,
    defineIdAction,
    defineStyleAction,
} from '../../../forms/home/form/reducers/actionsReducers/action.component';

import {
    selectByStyle,
    selectById,
    selectByElement,
} from '../../../forms/home/form/reducers/actionsReducers/selector.component';
import { currentStateElement } from './form.currentState';

@Component({
    selector: 'form-project',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
    form: FormGroup;

    public elementId$: Observable<number> = this.store$.pipe(
        select(selectById)
    );
    public elementType$: Observable<string> = this.store$.pipe(
        select(selectByElement)
    );
    public style$: Observable<StylingState> = this.store$.pipe(
        select(selectByStyle)
    );

    constructor(private store$: Store<ElementStyle>, fb: FormBuilder) {
        this.form = fb.group({
            parameters: [{ width: '', height: '', border: '', background: '' }],
        });
    }

    private currentStateElement = { ...currentStateElement };

    destroy$ = new Subject();
    ngOnInit(): void {
        this.elementType$
            .pipe(takeUntil(this.destroy$))
            .subscribe((element) => {
                this.currentStateElement.element = element;
            });
        this.elementId$.pipe(takeUntil(this.destroy$)).subscribe((id) => {
            this.currentStateElement.id = id;
        });
        this.style$.pipe(takeUntil(this.destroy$)).subscribe((style) => {
            this.currentStateElement.style = style;
        });
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    draggableFields = ['input', 'textarea', 'button', 'labelCheck', 'select'];

    formFields = [];

    public element: string;
    public elementId: number;
    public counter: number = 0;

    public getIndex(i: number) {
        this.elementId = i;
        this.element = this.formFields[i].element;
        this.store$.dispatch(defineIdAction({ id: this.formFields[i].id }));
        this.store$.dispatch(currentIdAction({ currentId: i }));
        this.store$.dispatch(
            defineElementAction({ element: this.formFields[i].element })
        );
        this.store$.dispatch(
            defineStyleAction({ style: this.currentStateElement.style })
        );
        this.store$.pipe(takeUntil(this.destroy$)).subscribe();
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
}
