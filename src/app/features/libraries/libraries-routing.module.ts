import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibrariesComponent } from './components/libraries/libraries.component';

const routes: Routes = [
  {
    path: '',
    component: LibrariesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibrariesRoutingModule { }
