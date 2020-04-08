import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'pokemon/all', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }  // ** permet de capturer toute les routes qui ne sont pas connues (pensez à déclarer cette route en dernier)
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }