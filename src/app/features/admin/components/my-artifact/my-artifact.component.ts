import { HttpErrorResponse } from '@angular/common/http'; 
import { Component, OnInit } from '@angular/core';
import { ParentSubscriptionComponent } from 'src/app/core/components/parent-subscription/parent-subscription.component';
import { CommonConstants } from 'src/app/core/constants/common.constants';
import { ApprovalQueueModel, ArtifactModel } from 'src/app/core/models/approval-queue.model';
import { LoginResponse } from 'src/app/core/models/header-menu.model';
import { SortPipe } from 'src/app/core/pipes/sort.pipe';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { MyArtifactService } from '../../services/my-artifact.service';
@Component({
selector: 'app-my-artifact',
templateUrl: './my-artifact.component.html',
styleUrls: ['./my-artifact.component.css']
})
export class MyArtifactComponent extends ParentSubscriptionComponent implements OnInit {
public approvalQueueList: ApprovalQueueModel[] = [];
public approvalQueueFliter: ApprovalQueueModel[] = [];
public approvalQueueApproved: ApprovalQueueModel[] = [];
public approvalQueueRejected: ApprovalQueueModel[] = [];
public approvalQueueDraft: ApprovalQueueModel[] = [];
public approvalQueuePending: ApprovalQueueModel[] = [];
public userName: string;
public pending = 1;
public approved = 1;
public rejected = 1;
public draft = 1;
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
private myArtifactService: MyArtifactService,
private toastNotificationService: ToastNotificationService,
private sortPipe: SortPipe
){
super();
}
public ngOnInit(): void {
this.getuserId();
this.getArtifactList();
}
public getuserId(): void {
this.subscriptions.push(
this.loginService.authentication$.subscribe((approvalQueueData: LoginResponse[]) => {
const approvalQueue = JSON.parse( sessionStorage.getItem('loginResponse'));
if (approvalQueue) {
this.userName = approvalQueue[0].name;
}
})
);
}
public getArtifactList(): void {
const approved: string = CommonConstants.APPROVED;
this.subscriptions.push(
this.myArtifactService.myArtifact(this.userName).subscribe( 
(approvalQueue: ApprovalQueueModel[]) => {
this.approvalQueueList = approvalQueue;
this.onFliterDraft();
},
(error: HttpErrorResponse) => {
throw error;
})
);
}
public onFliterPending(): void {
this.approvalQueuePending = this.approvalQueueList?.filter(
(item: ApprovalQueueModel) => item.status === CommonConstants.PENDING
);
this.approvalQueuePending = this.sortPipe.transform(this.approvalQueuePending, 'desc', 'lastModifiedOn');
}
public onFliterApproved(): void {
this.approvalQueueApproved = this.approvalQueueList?.filter(
(item: ApprovalQueueModel) => item.status === CommonConstants.APPROVED
);
this.approvalQueueApproved = this.sortPipe.transform(this.approvalQueueApproved, 'desc', 'lastModifiedOn');
}
public onFliterRejected(): void {
this.approvalQueueRejected = this.approvalQueueList?.filter(
(item: ApprovalQueueModel) => item.status === CommonConstants.REJECTED
);
this.onFliterRejected = this.sortPipe.transform(this.approvalQueueRejected, 'desc', 'lastModifiedOn');
}
public onFliterDraft(): void { 
this.approvalQueueDraft = this.approvalQueueList?.filter(
(item: ApprovalQueueModel) => item.status === CommonConstants.DRAFT
);
this.approvalQueueDraft = this.sortPipe.transform(this.approvalQueueDraft, 'desc', 'lastModifiedOn');
}
public onNavigateToCMSTemplate(approvalQueue: ApprovalQueueModel): void {
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
if (this.artifactCategory === 'Foundation' || this.artifactCategory === 'libraries'){
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
}
