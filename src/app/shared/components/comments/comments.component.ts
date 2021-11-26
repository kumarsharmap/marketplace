import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComponentServiceService } from 'src/app/component-service.service';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { CapabilitiesService } from 'src/app/features/capabilities/components/capabilities/capabilities.service';
@Component({
selector: 'app-comments',
templateUrl: './comments.component.html',
styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnChanges {
@Output()
submittedComment = new EventEmitter<string>();
public id: number = 0;
selectedCapability = this.capabilityService.getDraftRecord();
public commentsForm: FormGroup;
@Input('data') selectedObj;
public userComment = '';
public userName: string;
public toggleSubmit: boolean;
constructor(
private fb: FormBuilder,
private capabilityService: CapabilitiesService,
private datePipe: DatePipe,
private toastNotificationService: ToastNotificationService,
private loginService: LoginService,
private componentServiceService: ComponentServiceService
) {}

public ngOnInit(): void {
this.selectedCapability = this.selectedObj.details;
this.commentsForm = this.fb.group({
userComment: ['']
});
if (this.selectedObj.type === 'Component') {
this.id = this.selectedCapability.artifactId;
} else {
this.id = this.selectedCapability?.artifactId;
}
let str = sessionStorage.getItem('userName');
this.userName = str.replace(/[^A-Z]/g, '');
this.selectedCapability?.comments.map(function (e) {
e.badge = e.userName.replace(/[^A-Z]/g, '');
});
}
public ngOnChanges(): void {
this.selectedCapability = this.selectedObj.details;
this.commentsForm = this.fb.group({
userComment: ['']
});
if (this.selectedObj.type === 'Component') {
this.id = this.selectedCapability.artifactId;
} else {
this.id = this.selectedCapability?.artifactId;
}
let str = sessionStorage.getItem('userName');
this.userName = str.replace(/[^A-Z]/g, '');
this.selectedCapability?.comments.map(function (e) {
e.badge = e.userName.replace(/[^A-Z]/g, '');
});
}

public submitComments(): void {
this.toggleSubmit = true;
let model = this.selectedCapability;
model.comments.push({
userName: this.loginService.userName,
comment: this.userComment,
inptDateTime: this.datePipe.transform(Date.now(), 'medium')
});
if (this.selectedObj.type === 'Component') {
this.componentServiceService.updateComponent(model).subscribe(
(res) => {
this.getSelectedComponentDetails();
this.submittedComment.emit('commentSubmitted');
this.userComment = '';
this.toastNotificationService.showSuccess('Thank you! Your submission has been received!');
this.toggleSubmit = false;
},
(error: HttpErrorResponse) => {
throw error;
}
);
} else {
this.capabilityService.makerUpdateAction(model).subscribe(
(res) => {
this.getSelectedCapabilityDetails();
this.submittedComment.emit('commentSubmitted');
this.userComment = '';
this.toastNotificationService.showSuccess('Thank you! Your submission has been received!');
this.toggleSubmit = false;
},
(error: HttpErrorResponse) => {
throw error;
}
);
}
this.selectedCapability.comments.map(function (e) {
e.badge = e.userName.replace(/[^A-Z]/g, '');
});
}
public getSelectedCapabilityDetails(): void {
this.capabilityService.getCapabilityByID(this.id).subscribe(
(res) => {
this.selectedCapability = res;
this.selectedCapability?.comments.map(function (e) {
e.badge = e.userName.replace(/[^A-Z]/g, '');
});
},
(error: HttpErrorResponse) => {
this.toastNotificationService.showError(error.error.message);
throw error;
}
);
}
public getSelectedComponentDetails(): void {
this.componentServiceService.fetchComponentArtifactsById(this.id).subscribe(
(res) => {
this.selectedCapability = res;
this.selectedCapability?.comments?.map(function (e) {
e.badge = e.userName.replace(/[^A-Z]/g,'');
});
},
(error: HttpErrorResponse) => {
this.toastNotificationService.showError(error.error.message);
throw error;
}
);
}
}
