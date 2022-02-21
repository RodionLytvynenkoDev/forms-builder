import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication';

const routes: Routes = [{ path: '', component: AuthenticationComponent }];

@NgModule({
    declarations: [AuthenticationComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [RouterModule],
})
export class AuthorizationModule {}
