import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddUserComponent } from './components/add-user/add-user.component';
import { TenantListComponent } from './components/tenant-list/tenant-list.component';
import { CreateTenantComponent } from './components/create-tenant/create-tenant.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ManageUserManagementComponent } from './components/manage-user-management/manage-user-management.component';
import { CreateNewUserComponent } from './components/create-new-user/create-new-user.component';
import { AddTenantComponent } from './components/add-tenant/add-tenant.component';
import { RolesComponent } from './components/roles/roles.component';
import { PermissionComponent } from './components/permission/permission.component';
import { AddRoleComponent } from './components/add-role/add-role.component';
import { AddPermissionComponent } from './components/add-permission/add-permission.component';

@NgModule({
  declarations: [
    TenantListComponent,
    CreateTenantComponent,
    AddUserComponent,
    UserManagementComponent,
    ManageUserManagementComponent,
    CreateNewUserComponent,
    AddTenantComponent,
    RolesComponent,
    PermissionComponent,
    AddUserComponent,
    AddRoleComponent,
    AddPermissionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SuperAdminRoutingModule,
    SharedModule,
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
  ],
  exports: [
    AddTenantComponent,
    RolesComponent,
    PermissionComponent,
    AddUserComponent,
    AddRoleComponent,
    AddPermissionComponent,
  ],
  providers: [BsModalService],
})
export class SuperAdminModule {}
