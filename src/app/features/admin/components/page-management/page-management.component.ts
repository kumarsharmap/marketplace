import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ParentSubscriptionComponent } from 'src/app/core/components/parent-subscription/parent-subscription.component';
import { LoginResponse } from 'src/app/core/models/header-menu.model';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { ApprovalQueueService } from '../../services/approval-queue.service';
@Component({
selector: 'app-page-management',
templateUrl: './page-management.component.html',
styleUrls: ['./page-management.component.css']
})
export class PageManagementComponent extends ParentSubscriptionComponent implements OnInit {
public userId: number;
public pageManagement: LoginResponse[];
constructor(
private loginService: LoginService,
private approvalQueueService: ApprovalQueueService,
private router: Router,
private route: ActivatedRoute
) {
super();
}
public ngOnInit(): void {
this.getuserId(); 
}
public getuserId(): void {
this.userId = JSON.parse(sessionStorage.getItem('userId'));
this.subscriptions.push(
this.approvalQueueService.getPageManagementuserId(this.userId).subscribe((pageManagement: LoginResponse[]) => {
if (pageManagement) {
this.pageManagement = pageManagement;
}
})
);
}
public onArtifactName(pagemanagement: LoginResponse): void {
sessionStorage.setItem('selectedArtifact', JSON.stringify(pagemanagement));
sessionStorage.setItem('menu',JSON.stringify(pagemanagement));
this.router.navigate(['../selecttenant'], { relativeTo: this.route });
}
}