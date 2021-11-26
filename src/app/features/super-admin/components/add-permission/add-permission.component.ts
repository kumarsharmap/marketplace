import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommonConstants } from 'src/app/core/constants/common.constants';
import { PermissionModel } from 'src/app/core/models/permission.model';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { PermissionService } from '../../services/permissoin/permission.service';

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.css'],
})
export class AddPermissionComponent implements OnInit {
  @ViewChild('template') public templateref: TemplateRef<PermissionModel>;
  @Output()
  getPermissionDataFromChild: EventEmitter<PermissionModel> = new EventEmitter();
  public permissionForm: FormGroup;
  public modalRef: BsModalRef;
  public isEditMode: boolean;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private permissionService: PermissionService,
    private toastNotificationService: ToastNotificationService
  ) { }

  ngOnInit(): void {
    this.isEditMode = true;
    this.createPermissionForm();
  }

  public openModal(): void {
    this.isEditMode = true;
    this.modalRef = this.modalService.show(this.templateref);
  }

  public openPermissionModalEdit(permission: PermissionModel): void {
    this.isEditMode = false;
    this.permissionForm.patchValue(permission);
    this.modalRef = this.modalService.show(this.templateref);
  }

  public onSavePermissions(): void {
    this.permissionForm.markAllAsTouched();
    if (this.permissionForm.valid) {
      const data = this.permissionForm.value;
      this.permissionService.addPermission(data).subscribe((permission: any) => {
        if (permission) {
          this.toastNotificationService.showSuccess(CommonConstants.PERMISSION);
          this.resetForm();
          this.getPermissionDataFromChild.emit();
        }
      });
    }
  }
  public onUpdatePermissions(): void {
    const data = this.permissionForm.value;
    this.permissionService.updatePermission(data.permissionId, data).subscribe((updatePermission) => {
      if (updatePermission) {
        this.resetForm();
        this.toastNotificationService.showSuccess(CommonConstants.PERMISSIONUPDATED);
        this.getPermissionDataFromChild.emit();
      }
    });
  }

  public onClose(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.modalRef.hide();
    this.permissionForm.reset();
  }

  private createPermissionForm(): void {
    this.permissionForm = this.fb.group({
      permissionId: [''],
      permissionName: ['', Validators.required],
      permissionDescription: ['', Validators.required]
    });
  }
}
