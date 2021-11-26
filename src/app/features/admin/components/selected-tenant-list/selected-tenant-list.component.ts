import { HttpErrorResponse } from '@angular/common/http'; 
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentSubscriptionComponent } from 'src/app/core/components/parent-subscription/parent-subscription.component';
import { CommonConstants } from 'src/app/core/constants/common.constants';
import { ArtifactModel } from 'src/app/core/models/approval-queue.model';
import { PageManagementModel } from 'src/app/core/models/page-management.model';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { ConfirmWindowComponent } from 'src/app/shared/components/confirm-window/confirm-window.component';
import { ApprovalQueueService } from '../../services/approval-queue.service';
@Component({
selector: 'app-selected-tenant-list',
templateUrl: './selected-tenant-list.component.html',
styleUrls: ['./selected-tenant-list.component.css']
})
export class SelectedTenantListComponent extends ParentSubscriptionComponent implements OnInit, OnDestroy {
@ViewChild(ConfirmWindowComponent)
public confirmWindowComponent: ConfirmWindowComponent;
private tenantId: number;
private tenant: PageManagementModel;
public tenantName: string;
public artifactName: string;
public fliterTenantlist: PageManagementModel[] = [];
public viewOtherArtifactFlag = false;
public artifactId: number;
public artifactTitle: string; 
public artifactCategory: string;
public selectedArtifactId: ArtifactModel;
public selectedGuidesId: number;
constructor(
private approvalQueueService: ApprovalQueueService,
private router: Router,
private toastNotificationService: ToastNotificationService,
private route: ActivatedRoute
) {
super();
}
public ngOnInit(): void {
this.tenantId = JSON.parse(sessionStorage.getItem('selectedTenant')).tenantId;
this.tenantName = JSON.parse(sessionStorage.getItem('selectedTenant')).tenantName;
this.artifactName = JSON.parse(sessionStorage.getItem('selectedArtifact')).artifactName;
this.fliterTenantlist = JSON.parse(sessionStorage.getItem('tenantListData'));
this.fliterTenantlist = this.fliterTenantlist?.filter(
(tenant) => tenant.artifactCategory === this.artifactName && tenant.tenantName === this.tenantName
);
}
public ngonDestroy(): void {
this.fliterTenantlist = [];
}
public onTenantPage(): void { 
this.router.navigate(['../selecttenant'], { relativeTo: this.route });
}
public onParentPage(): void {
this.router.navigate(['../pagemanagement'], { relativeTo: this.route });
}
public onPage(): void {
this.viewOtherArtifactFlag= false;
}

public onDeleteArtifact(tenant: PageManagementModel): void {
this.tenant = tenant;
this.confirmWindowComponent.openModal();
}
private getTenants(): void {
this.subscriptions.push(
this.approvalQueueService.getTenantByUserId(this.tenantId).subscribe(
(tenantlistData: PageManagementModel[]) => {
this.fliterTenantlist = tenantlistData. filter(
(tenant) => tenant.artifactCategory === this.artifactName && tenant.tenantName === this.tenantName
);
},
(error: HttpErrorResponse) => {
throw error; 
}
)
);
}
public onclickYes(): void {
this.subscriptions.push(
this.approvalQueueService.artifactDelete(this.tenant.artifactCategory, this.tenant.artifactId).subscribe(
() => {
this.getTenants();
this.toastNotificationService.showSuccess(CommonConstants.ARTIFACTDELETE);
},
(error: HttpErrorResponse) => {
throw error;
}
)
);
}
public onclickNo(): void {
delete this.tenant;
}
public onArtifactEdit(foundationId: PageManagementModel): void {
this.artifactTitle = foundationId.artifactTitle;
this.artifactId = foundationId.artifactId;

switch (foundationId.artifactCategory) {
case 'Design Foundations':
this.artifactCategory ='Foundation';
break;
case 'Capabilities':
this.artifactCategory = 'Capability';
break;
case 'Components':
this.artifactCategory = 'Component';
break;
case 'Libraries':
this.artifactCategory ='libraries';
break;
case 'Guides':
this.artifactCategory ='Guides';
break;
default:
break;
}
if (this.artifactCategory === 'Foundation' || this.artifactCategory === 'libraries') {
this.selectedGuidesId = this.artifactId;
} else if (this.artifactCategory === 'Guides') {
this.selectedArtifactId = {
artifactId: this.artifactId,
type: this.artifactCategory
};
} else {
this.selectedArtifactId = {
id: this.artifactId,
type: this.artifactCategory
};
}
this.viewOtherArtifactFlag = true;
}
}
