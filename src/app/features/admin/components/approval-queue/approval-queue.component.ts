import { HttpErrorResponse } from '@angular/common/http'; 
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParentSubscriptionComponent } from 'src/app/core/components/parent-subscription/parent-subscription.component';
import { CommonConstants } from 'src/app/core/constants/common.constants';
import { ApprovalQueueModel, ArtifactModel } from 'src/app/core/models/approval-queue.model';
import { LoginResponse } from 'src/app/core/models/header-menu.model';
import { SortPipe } from 'src/app/core/pipes/sort.pipe';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { ApprovalQueueService } from '../../services/approval-queue.service';
@Component({
selector: 'app-approval-queue',
templateUrl: './approval-queue.component.html',
styleUrls: ['./approval-queue.component.css']
})
export class ApprovalQueueComponent extends ParentSubscriptionComponent implements OnInit {
public approvalQueueList: ApprovalQueueModel[] = [];
public approvalQueueFliter: ApprovalQueueModel[] = [];
public approvalQueueApproved: ApprovalQueueModel[] = [];
public approvalQueueRejected: ApprovalQueueModel[] = [];
public userId: number;
public pending = 1;
public approved = 1;
public rejected = 1;
public maximumPerPage = 5;
public itemsPerPage = 5;
public viewOtherArtifactFlag = false;
public artifactId: number;
public artifactTitle: string;
public artifactCategory: string;
public selectedArtifactId: ArtifactModel;
public selectedGuidesId: number; 
constructor(
private loginService: LoginService,
private approvalQueueService: ApprovalQueueService,
private toastNotificationService: ToastNotificationService,
private router: Router,
private sortPipe: SortPipe){
super();
}
public ngOnInit(): void {
this.getuserId();
this.getApprovalQueue();
window.location.hash = 'adminmenu/approval';
}
public getuserId(): void {
this.subscriptions.push(
this.loginService.authentication$.subscribe((approvalQueueData: LoginResponse[]) => {
const approvalQueue = JSON.parse(sessionStorage.getItem('loginResponse'));
if (approvalQueue) {
this.userId = approvalQueue[0].userId;
}
})
);
}
public getApprovalQueue(): void {
this.subscriptions.push(
this.approvalQueueService.getuserId(this.userId).subscribe(
(approvalQueue: ApprovalQueueModel[]) => {
this.approvalQueueList = approvalQueue; 
this.defaultFliteringStatus();
},
(error: HttpErrorResponse) => {
throw error;
}
)
);
}
public defaultFliteringStatus(): void {
this.approvalQueueFliter = [].concat.apply([], this.approvalQueueList);
this.approvalQueueList = this.approvalQueueFliter?.filter(
(item: ApprovalQueueModel) => item.status === CommonConstants.PENDING
);
this.approvalQueueList = this.sortPipe.transform(this.approvalQueueList, 'desc', 'lastModifiedOn');
}
public onFliterApproved(): void {
this.approvalQueueApproved = this.approvalQueueFliter?.filter(
(item: ApprovalQueueModel) => item.status === CommonConstants.APPROVED
);
this.approvalQueueApproved = this.sortPipe.transform(this.approvalQueueApproved, 'desc', 'lastModifiedOn');
}
public onFliterRejected(): void {
this.approvalQueueRejected = this.approvalQueueFliter?.filter(
(item: ApprovalQueueModel) => item.status === CommonConstants.REJECTED
);
this.approvalQueueRejected = this.sortPipe.transform(this.approvalQueueRejected, 'desc', 'lastModifiedOn');
}
public onApproved (approvalQueue: ApprovalQueueModel): void {
const approved: string = CommonConstants.APPROVED; 
this.subscriptions.push(
this.approvalQueueService
.approvedStatus(approvalQueue.artifactCategory, approvalQueue.artifactId, approved)
.subscribe(
() => {
this.toastNotificationService.showSuccess(CommonConstants.APPROVEDSUCCESSFULLY);
this.getApprovalQueue();
},
(error: HttpErrorResponse) => {
throw error;
}
)
);
}
public onRejected (approvalQueue: ApprovalQueueModel): void {
const approved: string = CommonConstants.REJECTED;
this.subscriptions.push(
this.approvalQueueService
.approvedStatus(approvalQueue?.artifactCategory, approvalQueue?.artifactId, approved)
.subscribe(
() => {
this.toastNotificationService.showSuccess(CommonConstants.REJECTEDSUCCESSFULLY);
this.getApprovalQueue();
},
(error: HttpErrorResponse) => {
throw error;
}
)
);
}
public onNavigateTOCMSTemplate(approvalQueue: ApprovalQueueModel): void { 
sessionStorage.setItem('menu',JSON.stringify(approvalQueue));
this.artifactTitle = approvalQueue.artifactTitle;
this.artifactId = approvalQueue.artifactId;
switch (approvalQueue.artifactCategory) {
case 'Design Foundations':
this.artifactCategory = 'Foundation';
break;
case 'Capabilities':
this.artifactCategory = 'Capability';
break;
case 'Components':
this.artifactCategory = 'Component';
break;
case 'Libraries':
this.artifactCategory = 'libraries';
break;
case 'Guides':
this.artifactCategory = 'Guides';
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
public onApprovalQueuePage(): void {
this.viewOtherArtifactFlag = false;
}
public changeUrl(): void {
setTimeout(() => {
window.location.hash = 'adminmenu/approval';
}, 200);
}}