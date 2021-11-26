import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuidesLeftmenuComponent } from './components/guides-leftmenu/guides-leftmenu.component';

const routes: Routes = [
  {
    path: '',
    component: GuidesLeftmenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuidesRoutingModule { }
