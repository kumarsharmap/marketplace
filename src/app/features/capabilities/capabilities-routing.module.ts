import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CapabilitiesComponent } from './components/capabilities/capabilities.component';

const routes: Routes = [
  {
    path: '',
    component: CapabilitiesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapabilitiesRoutingModule {}
