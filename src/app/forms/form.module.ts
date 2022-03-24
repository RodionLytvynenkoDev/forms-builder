import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home';
import { FormComponent } from './home/form/form.component';
import { ElementsComponent } from './home/form/elements/elements.component';
import { AccordionElementComponent } from './home/form/accordion-element/accordion-element.component';
import { UsernamePipe } from './home/pipes/username.pipe';
import { featureName } from './home/form/reducers/stylingReducers/reducer.component';
import { themeFeatureName, ThemeReducer } from './home/form/reducers/darkThemeReducers/reducer.component';
import { ElementStyleReducer } from './home/form/reducers/stylingReducers/reducer.component';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
    declarations: [
        HomeComponent,
        FormComponent,
        ElementsComponent,
        AccordionElementComponent,
        UsernamePipe,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        DragDropModule,
        CdkAccordionModule,
        StoreModule.forFeature(featureName, ElementStyleReducer),
        StoreModule.forFeature(themeFeatureName, ThemeReducer),
    ],
    exports: [RouterModule],
})
export class FormModule {}
