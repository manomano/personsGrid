import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PersonViewComponent} from './person-view/person-view.component';
import {PersonsComponent} from './persons/persons.component';



const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: PersonsComponent },
  { path: 'detail/:id', component: PersonViewComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
