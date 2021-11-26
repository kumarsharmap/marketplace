import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoundationComponent } from './components/foundation/foundation.component';

const routes: Routes = [
  {
    path: '',
    component: FoundationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoundationRoutingModule { }
