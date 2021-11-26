import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommonConstants } from 'src/app/core/constants/common.constants';
import { PermissionModel } from 'src/app/core/models/permission.model';
import { RoleModel, RolePermission } from 'src/app/core/models/roles.model';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { minimumSelection } from 'src/app/core/services/validation/minimum-selection';
import { PermissionService } from '../../services/permissoin/permission.service';
import { RoleService } from '../../services/role/role.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css'],
})
export class AddRoleComponent implements OnInit {
  @ViewChild('template', { static: true })
  public templateref: TemplateRef<RoleModel>;
  @Output()
  public rolePermissionDataFromChild: EventEmitter<RoleModel> = new EventEmitter();
  public roleForm: FormGroup;
  public modalRef: BsModalRef;
  public permissionData: PermissionModel[];
  public isEditMode: boolean;
  public selectedRoleValue: RolePermission[] = [];
  public isLoad: boolean;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private roleService: RoleService,
    private permissionService: PermissionService,
    public toastNotificationService: ToastNotificationService
  ) { }

  ngOnInit() {
    this.isLoad = false;
  }

  get permission(): FormArray {
    return this.roleForm.get('permission') as FormArray;
  }

  public openModal(): void {
    this.getPermissionData();
    this.isEditMode = true;
    this.modalRef = this.modalService.show(this.templateref);
  }

  public onSavePermissions(): void {
    this.roleForm.markAllAsTouched();
    if (this.roleForm.valid) {
      const rolePermission: any[] = this.selectedRoleValue;
      const newData = { ...this.roleForm.value, rolePermission };
      this.roleService.addRole(newData).subscribe((data: RoleModel) => {
        this.toastNotificationService.showSuccess(CommonConstants.ROLE);
        this.modalRef.hide();
        this.roleForm.reset();
        this.rolePermissionDataFromChild.emit();
        this.selectedRoleValue = [];
      });
    }
  }

  public onClose(): void {
    this.modalRef.hide();
    this.roleForm.reset();
  }

  public openRoleModalEdit(role: RoleModel): void {
    this.getPermissionData(role);
    this.isEditMode = false;
    if (role.rolePermission) {
      this.selectedRoleValue = role.rolePermission;
    }
    this.modalRef = this.modalService.show(this.templateref);
  }

  private setExistingPermissoins(): void {
    if (this.selectedRoleValue) {
      this.permissionData.forEach((value, index) => {
        const test = this.selectedRoleValue.find((test) => test.permissionId === value.permissionId);
        if (test) {
          this.permission.setControl(index, this.fb.control(test));
        } else {
          this.permission.setControl(index, this.fb.control(false));
        }
      });
    }
  }
  public onUpdateRole(): void {
    const rolePermission: any[] = this.selectedRoleValue;
    const newData = { ...this.roleForm.value, rolePermission };
    this.roleService.updateRole(newData.roleId, newData).subscribe((data) => {
      if (data) {
        this.toastNotificationService.showSuccess(CommonConstants.ROLEUPDATED);
        this.modalRef.hide();
        this.roleForm.reset();
        this.rolePermissionDataFromChild.emit();
        this.selectedRoleValue = [];
      }
    });
  }
  public onRoleCheckbox(event: Event, roleIndex: number): void {
    const valueData = +(event.target as HTMLInputElement).value;
    if ((event.target as HTMLInputElement).checked) {
      this.selectedRoleValue.push({
        permissionId: this.permissionData[roleIndex].permissionId,
        permissionName: this.permissionData[roleIndex].permissionName
      });
    } else {
      const getIndex = this.selectedRoleValue.findIndex((t: RolePermission) => t.permissionId === valueData);
      this.selectedRoleValue.splice(getIndex, 1);
    }
  }
  private populatePermission(): FormControl[] {
    const control = this.setControlsCustom();
    return control;
  }

  private setControlsCustom(): FormControl[] {
    return this.permissionData.map((item: PermissionModel) => {
      return this.fb.control(false);
    });
  }

  private getPermissionData(role?): void {
    this.permissionService.getPermission().subscribe(
      (data: PermissionModel[]) => {
        this.permissionData = data;
        this.createRoleForm();
        if (this.isEditMode) {
          const test = this.populatePermission();
          test.forEach((item) => {
            this.permission.push(item);
          });
          this.isLoad = true;
        } else {
          this.setExistingPermissoins();
          this.roleForm.patchValue(role);
          this.isLoad = true;
        }
      },
      (error) => {
        throw new Error(error.error.message);
      }
    );
  }

  private createRoleForm(): void {
    this.roleForm = this.fb.group({
      roleId: [''],
      roleName: ['', Validators.required],
      roleDescription: ['', Validators.required],
      permission: this.fb.array([], [minimumSelection(1)]),
    });
  }
}
