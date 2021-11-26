import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { ApprovalQueueComponent } from './components/approval-queue/approval-queue.component';
import { PageManagementComponent } from './components/page-management/page-management.component';
import { SelectTenantComponent } from './components/select-tenant/select-tenant.component';
import { SelectedTenantListComponent } from './components/selected-tenant-list/selected-tenant-list.component';
import { FoundationModule } from '../foundation/foundation.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CapabilitiesModule } from '../capabilities/capabilities.module';
import { LibrariesModule } from '../libraries/libraries.module';
import { GuidesModule } from '../guides/guides.module';
import { ComponentsModule } from '../components/components.module';
import { FoundationComponent } from '../foundation/components/foundation/foundation.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyArtifactComponent } from './components/my-artifact/my-artifact.component';


@NgModule({
  declarations: [ApprovalQueueComponent, PageManagementComponent, SelectTenantComponent, SelectedTenantListComponent, MyArtifactComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FoundationModule,
    SharedModule,
    CapabilitiesModule,
    LibrariesModule,
    GuidesModule,
    ComponentsModule,
    NgxPaginationModule
    
  ],
  providers: [FoundationComponent]
})
export class AdminModule { }
