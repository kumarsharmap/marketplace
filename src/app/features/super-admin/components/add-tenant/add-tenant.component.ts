import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  BsModalService,
  BsModalRef,
  ModalDirective,
} from 'ngx-bootstrap/modal';
import { CommonConstants } from 'src/app/core/constants/common.constants';
import { RoleModel } from 'src/app/core/models/roles.model';
import { CreateTenantAddUserModel } from 'src/app/core/models/tenant.model';
import { UserManagementModel } from 'src/app/core/models/user-management.model';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { AddUserService } from '../../services/add-user/add-user.service';
import { TenantService } from '../../services/tenant/tenant.service';
import { UserManagementService } from '../../services/user-management/user-management.service';

@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.css'],
})
export class AddTenantComponent implements OnInit {
  tenantManagement: any[];
  @ViewChild('template') public templateref: TemplateRef<any>;
  @ViewChild('parentModal') parentClose: ModalDirective;
  @Output() public addTenantEvent: EventEmitter<any> = new EventEmitter();
  @Input() public roles: RoleModel[];
  public addTenantForm: FormGroup;
  public modalRef: BsModalRef;
  public rolesValue: RoleModel;
  public tenantValue: any;
  public addTenant: any;
  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private tenantService: TenantService,
    private toastNotificationService: ToastNotificationService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.createRegistration();
    this.getUserManagement();
    if (!this.loginService.getSuperAdmin()) {
      this.rolesValue = this.roles.find((data) => data.roleName === 'Subscriber');
      (this.addTenantForm.get('roleName') as FormArray).setValue(['Subscriber']);
      (this.addTenantForm.get('roleName') as FormArray).disable();

    }
  }

  public openModal(): void {
    this.modalRef = this.modalService.show(this.templateref);
  }

  public onSelectedRole(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.rolesValue = this.roles.find((data) => data.roleName === value);
  }

  public onSelectedTenant(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.tenantValue = this.tenantManagement.find(
      (data) => data.tenantName === value
    );
  }

  public onClose(): void {
    this.parentClose.hide();
    this.resetForm();
    delete this.addTenant;
  }

  public onSaveAdduser(): void {
    this.addTenantForm.markAllAsTouched();
    if (this.tenantValue) {
      this.addTenant = {
        tenantId: this.tenantValue?.tenantId,
        tenantName: this.tenantValue?.tenantName,
        roleId: this.rolesValue?.roleId,
        roleName: this.rolesValue?.roleName
      };
      this.addTenantEvent.emit(this.addTenant);
      this.toastNotificationService.showSuccess(CommonConstants.ADDTENANT);
      this.onClose();
    }
    delete this.addTenant;
    delete this.tenantValue;

  }
  private resetForm(): void {
    this.addTenantForm.reset({
      roleName: '',
      tenantName: '',
    });
    this.createRegistration();
    this.getUserManagement();
    if (!this.loginService.getSuperAdmin()) {
      this.rolesValue = this.roles.find((data) => data.roleName === 'Subscriber');
      (this.addTenantForm.get('roleName') as FormArray).setValue(['Subscriber']);
      (this.addTenantForm.get('roleName') as FormArray).disable();
    }
  }

  private createRegistration(): void {
    this.addTenantForm = this.fb.group({
      roleName: ['', Validators.required],
      tenantName: ['', Validators.required],
    });

  }

  private getUserManagement(): void {
    this.tenantService.getAllTenant().subscribe((getAllUsers: any) => {
      this.tenantManagement = getAllUsers;
    });
  }
}
