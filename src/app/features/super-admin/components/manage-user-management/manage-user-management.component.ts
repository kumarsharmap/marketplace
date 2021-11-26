import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentSubscriptionComponent } from 'src/app/core/components/parent-subscription/parent-subscription.component';
import { CommonConstants } from 'src/app/core/constants/common.constants';
import { RoleModel } from 'src/app/core/models/roles.model';
import {
  UserManagementModel,
  UserManagementTenantModel,
} from 'src/app/core/models/user-management.model';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { ConfirmWindowComponent } from 'src/app/shared/components/confirm-window/confirm-window.component';
import { RoleService } from '../../services/role/role.service';
import { UserManagementService } from '../../services/user-management/user-management.service';

@Component({
  selector: 'app-manage-user-management',
  templateUrl: './manage-user-management.component.html',
  styleUrls: ['./manage-user-management.component.css'],
})
export class ManageUserManagementComponent
  extends ParentSubscriptionComponent
  implements OnInit {
  public userManagement: UserManagementModel;
  public roles: RoleModel[] = [];
  public addUsers: UserManagementTenantModel[] = [];
  public rolesValue: RoleModel;
  public userManagementForm: FormGroup;
  public USERNAME='name';
  public isDisableAdmin=true;
  public isVisibleAddTenant=false;
  @ViewChild(ConfirmWindowComponent)
  public confirmWindowComponent: ConfirmWindowComponent;
  constructor(
    private roleService: RoleService,
    private userManagementService: UserManagementService,
    private router: Router,
    private fb: FormBuilder,
    private toastNotificationService: ToastNotificationService,
    private route: ActivatedRoute,
    private loginService: LoginService
    ){
    super();
    }
    public ngOnInit(): void {
    this.getRoles();
    this.createTenant();
    // this.userManagement = this.userManagementService.getManageUser();
    this.userManagement = JSON.parse( sessionStorage.getItem('userManagement'));
    if (this.userManagement) {
    this.userManagementForm.patchValue({
    name: this.userManagement.name,
    email: this.userManagement.email
    });
    this.addUsers = this.userManagement.tenantUser;
    }
    this.populateUsersTable();
    this.isSuperAdmin();
    }
    private isSuperAdmin(): void { 
    if (!this.loginService.getSuperAdmin()) {
    this.isDisableAdmin = false;
    (this.userManagementForm.get('tenantUser') as FormArray).disable();
    }
    }
    public onUserManagement(): void {
    if (this.addUsers.length > 0) {
    this.subscriptions.push(
    this.userManagementService.
    updateUserManagement(this.userManagement.userId, this.userManagementForm.getRawValue())
    .subscribe(
    () => {
    this.toastNotificationService.showSuccess(CommonConstants.USERUPDATE);
    this.router.navigate(['../user'], { relativeTo: this.route });
    },
    (error: HttpErrorResponse) => {
    throw error;
    }
    )
    );
    } else {
    this.toastNotificationService.showError(CommonConstants.ADDTENANTERR);
    }
    }
    public navigateToUser(): void { 
    this.router.navigate(['../user'], { relativeTo: this.route });
    }
    get userManagementArray(): FormArray {
    if (this.userManagementForm) {
    return this.userManagementForm.get('tenantUser') as FormArray;
    }
    }
  
    public onSelectedRole(event: Event, i: number): void {
    const value = (event.target as HTMLInputElement).value;
    this.rolesValue = this.roles.find((data) => data.roleName ===   value);
    this.addUsers[i].roleId = this.rolesValue.roleId;
    this.addUsers[i].roleName = this.rolesValue.roleName;
    this.populateUsersTable();
    }
    private populateUsersTable(): void {
    this.userManagementArray.controls = [];
    if (this.addUsers.length > 0) {
    this.addUsers.forEach((user) => {
    this.userManagementArray .push(
    this.fb.group({
    roleId: this.fb.control(user.roleId),
    roleName: this.fb.control(user.roleName),
    tenantId: this.fb.control(user.tenantId)
    }) 
    );
    });
    }
    this.isSuperAdmin();
    }
   
    public addTenant(addUser: any): void {
    if (addUser) {
    const tenantIndex: number = this.addUsers.findIndex((item) => item.tenantId === addUser.tenantId);
    if (tenantIndex != -1) {
    this.addUsers.splice(tenantIndex, 1);
    this.userManagementArray.clear();
    this.addUsers.push(addUser);
    this.populateUsersTable();
    } else {
    this.userManagementArray.clear();
    this.addUsers.push(addUser);
    this.populateUsersTable();
    }
    }
    }
    public onDeleteUser(user): void {
    const userIndex = user.controls.tenantId.value; 
    this.addUsers = this.addUsers.filter((item) => {
    return item.tenantId !== userIndex;
    });
    this.userManagementArray.clear();
    this.populateUsersTable();
    }
    public onDeleteUserManagement(): void {
      if (this.userManagement.email.toLowerCase() !== sessionStorage.getItem('userEmail').toLowerCase()) {
      this.confirmWindowComponent.openModal();
      }
    }
    private createTenant(): void {
    this.userManagementForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    tenantUser: new FormArray([])
    });
  }
    private getRoles(): void {
    this.roleService.getRole().subscribe((role) => {
    this.roles = role;
    this.isVisibleAddTenant=true;
    });
    
    }
    public onClickYes(): void {
      this.userManagementService.deleteUserManagement([this.userManagement.userId]).subscribe((deleteResponse) => {
      this.router.navigate(['../user'], { relativeTo: this.route });
      this.toastNotificationService.showSuccess (CommonConstants.DELETEUSER);
      });
      }
      public onClickNo(): void {}
      
  }
    
    