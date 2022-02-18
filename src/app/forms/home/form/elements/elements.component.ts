import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
    ElementStyle,
    StylingState,
} from '../reducers/actionsReducers/reducer.component';
import {
    selectById,
    selectByElement,
    selectByStyle,
    selectByCurrentId,
} from '../reducers/actionsReducers/selector.component';
import { currentStateElement } from '../form.currentState';

@Component({
    selector: 'elements',
    templateUrl: './elements.component.html',
    styleUrls: ['./elements.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElemsComponent implements OnChanges {
    @Input() elementId: number;
    @Input() element: string;
    @Input() id: number;

    public style$: Observable<StylingState> = this.store$.pipe(
        select(selectByStyle)
    );
    public element$: Observable<string> = this.store$.pipe(
        select(selectByElement)
    );
    public id$: Observable<number> = this.store$.pipe(select(selectById));
    public currentId$: Observable<number> = this.store$.pipe(
        select(selectByCurrentId)
    );
    currentId: number;

    constructor(
        private store$: Store<ElementStyle>,
        private cdr: ChangeDetectorRef
    ) {}

    public currentStateElement = { ...currentStateElement };
    public currentState = { ...currentStateElement };

    public reassign(): void {
        this.currentStateElement.style = {
            width: this.currentStateElement.style['width'],
            height: this.currentStateElement.style['height'],
            placeholder: this.currentStateElement.style['placeholder'],
            required: this.currentStateElement.style['required'],
            border: this.currentStateElement.style['border'],
            'font-size': this.currentStateElement.style['font-size'],
            'font-weight': this.currentStateElement.style['font-weight'],
            color: this.currentStateElement.style['color'],
            'background-color':
                this.currentStateElement.style['background-color'],
        };
    }

    destroy$ = new Subject();

    ngOnInit(): void {
        this.element$.pipe(takeUntil(this.destroy$)).subscribe((element) => {
            this.currentState.element = element;
        });

        this.id$.pipe(takeUntil(this.destroy$)).subscribe((id) => {
            this.currentState.id = id;
        });
        this.currentId$
            .pipe(takeUntil(this.destroy$))
            .subscribe((currentId) => {
                this.currentId = currentId;
            });
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.style$.pipe(takeUntil(this.destroy$)).subscribe((style) => {
            if (this.currentState.id == this.id) {
                this.currentStateElement.style = style;
                this.cdr.detectChanges();
            }
        });
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
