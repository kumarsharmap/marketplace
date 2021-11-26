import { HttpErrorResponse } from '@angular/common/http'; 
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentSubscriptionComponent } from 'src/app/core/components/parent-subscription/parent-subscription.component';
import { LoginResponse, TenantList } from 'src/app/core/models/header-menu.model';
import { PageManagementModel } from 'src/app/core/models/page-management.model';
import { ApprovalQueueService } from '../../services/approval-queue.service';
@Component({
selector: 'app-select-tenant',
templateUrl: './select-tenant.component.html',
styleUrls: ['./select-tenant.component.css']
})
export class SelectTenantComponent extends ParentSubscriptionComponent implements OnInit {
public pageManagement: LoginResponse;
constructor(
private approvalQueueService: ApprovalQueueService,
private router: Router,
private route: ActivatedRoute
) {
super();
}
public ngOnInit(): void{
this.pageManagement = JSON.parse(sessionStorage.getItem('selectedArtifact'));
this.approvalQueueService.setartifactName(this.pageManagement.artifactName); 
}
public onclickTenant(tenantlist: TenantList): void {
sessionStorage.setItem('selectedTenant', JSON.stringify(tenantlist));
sessionStorage.setItem('menu', JSON.stringify(tenantlist));
this.approvalQueueService.setTenantId(tenantlist.tenantId);
this.subscriptions.push(
this.approvalQueueService.getTenantByUserId(tenantlist.tenantId).subscribe(
(tenantlistData: PageManagementModel[]) => {
sessionStorage.setItem('tenantListData', JSON.stringify(tenantlistData));
this.approvalQueueService.setTenant(tenantlistData);
this.approvalQueueService.setTenantName(tenantlist.tenantName);
this.router.navigate(['../selecttenantlist'], { relativeTo: this.route });
},
(error: HttpErrorResponse) => {
throw error;
}
)
);
}
public onParentPage(): void {
this.router.navigate(['../pagemanagement'], { relativeTo: this.route });
}
}
