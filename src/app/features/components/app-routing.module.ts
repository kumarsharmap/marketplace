import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComponentLeftMenuComponent } from './components/component-left-menu/component-left-menu.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentLeftMenuComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }