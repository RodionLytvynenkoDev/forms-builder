import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guards';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('../../src/app/forms/form.module').then((m) => m.FormModule),
    },
    {
        path: 'login',
        loadChildren: () =>
            import('../../src/app/auth/auth.module').then((m) => m.AuthModule),
    },

    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
