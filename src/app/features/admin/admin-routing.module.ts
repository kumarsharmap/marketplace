import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovalQueueComponent } from './components/approval-queue/approval-queue.component';
import { PageManagementComponent } from './components/page-management/page-management.component';
import { SelectTenantComponent } from './components/select-tenant/select-tenant.component';
import { SelectedTenantListComponent } from './components/selected-tenant-list/selected-tenant-list.component';

const routes: Routes = [
  { path: '', component: ApprovalQueueComponent },
  { path: 'pagemanagement', component: PageManagementComponent },
  { path: 'selecttenant', component: SelectTenantComponent },
  { path: 'selecttenantlist', component: SelectedTenantListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
