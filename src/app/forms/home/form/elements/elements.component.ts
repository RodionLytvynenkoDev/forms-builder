import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
    ElementStyle,
    StylingState,
} from '../reducers/stylingReducers/reducer.component';
import {
    selectById,
    selectByElement,
    selectByStyle,
} from '../reducers/stylingReducers/selector.component';
import { currentStateElement } from '../form.currentState';

@Component({
    selector: 'elements',
    templateUrl: './elements.component.html',
    styleUrls: ['./elements.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementsComponent {
    @Input() element: string;
    @Input() id: number;

    public currentStateElement = { ...currentStateElement };
    public currentState = { ...currentStateElement };

    public destroy$ = new Subject();
    public style$: Observable<StylingState> = this.store.pipe(
        select(selectByStyle)
    );
    public element$: Observable<string> = this.store.pipe(
        select(selectByElement)
    );
    public id$: Observable<number> = this.store.pipe(select(selectById));

    constructor(
        private store: Store<ElementStyle>,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.id$.pipe(takeUntil(this.destroy$)).subscribe((id) => {
            this.currentState.id = id;
        });
        this.style$.pipe(takeUntil(this.destroy$)).subscribe((style) => {
            if (this.currentState.id == this.id) {
                this.currentStateElement.style = style;
                this.cdr.detectChanges();
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
