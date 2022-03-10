import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authorization/guards';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('../../src/app/forms/form.module').then((m) => m.FormModule),
    },
    {
        path: 'signIn',
        loadChildren: () =>
            import('../../src/app/authorization/authorization.module').then((m) => m.AuthorizationModule),
    },

    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
