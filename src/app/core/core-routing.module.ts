import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalQueueComponent } from '../features/admin/components/approval-queue/approval-queue.component';
import { MyArtifactComponent } from '../features/admin/components/my-artifact/my-artifact.component';
import { PageManagementComponent } from '../features/admin/components/page-management/page-management.component';
import { SelectTenantComponent } from '../features/admin/components/select-tenant/select-tenant.component';
import { SelectedTenantListComponent } from '../features/admin/components/selected-tenant-list/selected-tenant-list.component';

import { NewPasswordComponent } from '../features/auth/components/new-password/new-password.component';
import { CreateNewUserComponent } from '../features/super-admin/components/create-new-user/create-new-user.component';
import { CreateTenantComponent } from '../features/super-admin/components/create-tenant/create-tenant.component';
import { ManageUserManagementComponent } from '../features/super-admin/components/manage-user-management/manage-user-management.component';
import { PermissionComponent } from '../features/super-admin/components/permission/permission.component';
import { RolesComponent } from '../features/super-admin/components/roles/roles.component';
import { TenantListComponent } from '../features/super-admin/components/tenant-list/tenant-list.component';
import { UserManagementComponent } from '../features/super-admin/components/user-management/user-management.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';

const routes: Routes = [
  {
    path: 'adminmenu',
    component: HeaderAdminComponent,
    children: [
      { path: 'approval', component: ApprovalQueueComponent },
      {
        path: 'createTenantList',
        component: TenantListComponent
      },
      {
        path: 'role',
        component: RolesComponent
      },
      {
        path: 'createTenant',
        component: CreateTenantComponent
      },
      {
        path: 'user',
        component: UserManagementComponent
      },
      {
        path: 'manage',
        component: ManageUserManagementComponent
      },
      {
        path: 'createuser',
        component: CreateNewUserComponent
      },
      {
        path: 'permission',
        component: PermissionComponent
      },
      {
        path: 'pagemanagement',
        component: PageManagementComponent
      },
      {
        path: 'newpassword',
        component: NewPasswordComponent
      },
      {
        path: 'myartifact',
        component: MyArtifactComponent
      },
      { path: 'selecttenant', component: SelectTenantComponent },
      { path: 'selecttenantlist', component: SelectedTenantListComponent },
      { path: '', redirectTo: 'approval', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

