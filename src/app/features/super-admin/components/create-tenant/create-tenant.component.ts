import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { ArtifactoryModel } from 'src/app/core/models/artifactory.model';
import { RoleModel } from 'src/app/core/models/roles.model';
import {
  CreateTenantModel,
  CreateTenantAddUserModel,
} from 'src/app/core/models/tenant.model';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { RoleService } from '../../services/role/role.service';
import { TenantService } from '../../services/tenant/tenant.service';

@Component({
  selector: 'app-create-tenant',
  templateUrl: './create-tenant.component.html',
  styleUrls: ['./create-tenant.component.css'],
})
export class CreateTenantComponent
  extends ParentSubscriptionComponent
  implements OnInit, OnDestroy {
  public createTenantForm: FormGroup;
  public selectLocationList: ArtifactoryModel[] = [];
  public roles: RoleModel[] = [];
  public addUsers: CreateTenantAddUserModel[] = [];
  public selectedArtifactoryCategories: string[] = [];
  public editTenantMode: boolean;
  public editTenantValue: CreateTenantModel;
  public tenantEditId: number;
  public rolesValue: RoleModel;

  constructor(
    private roleService: RoleService,
    private fb: FormBuilder,
    private tenantService: TenantService,
    private router: Router,
    private toastNotificationService: ToastNotificationService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.editTenantMode = false;
    this.getRoles();
    this.createTenant();
    this.selectLocationList = this.getOrders();
    // this.editTenantValue = this.tenantService.getTenantData();
    this.editTenantValue = JSON.parse(sessionStorage.getItem('createTenant'));
    this.isEditModeCreateTenant();
  }

  private isEditModeCreateTenant(): void {
    if (this.editTenantValue) {
//    this.createTenantForm.get('tenantName').disable();
      this.tenantEditId = this.editTenantValue.tenantId;
      this.editTenantMode = true;
      if (this.editTenantValue.artifactCategory !== '') {
        this.selectedArtifactoryCategories = this.editTenantValue.artifactCategory.split(
          ','
        );
      }
      this.createTenantForm.patchValue(this.editTenantValue);
      this.setExistingTenantUser();
      this.addUsers = this.editTenantValue.tenantUser;
      this.populateUsersTable();
    } else {
      this.addCheckboxes();
    }
  }

  private setExistingTenantUser(): void {
    if (this.editTenantValue) {
      this.selectLocationList.forEach((value) => {
        const indexvalue = this.selectedArtifactoryCategories.indexOf(
          value.artifactoryName
        );
        if (indexvalue !== -1) {
          this.selectLocationArray.push(new FormControl(true));
        } else {
          this.selectLocationArray.push(new FormControl(false));
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.tenantService.setTenantData(null);
  }

  public onSelectedRole(event: Event, i: number): void {
    const value = (event.target as HTMLInputElement).value;
    this.rolesValue = this.roles.find((data) => data.roleName === value);
    this.addUsers[i].roleId = this.rolesValue.roleId;
    this.addUsers[i].roleName = this.rolesValue.roleName;
    this.projectUserArray.clear();
    this.populateUsersTable();
  }

  public onCreateTenant(): void {
    this.createTenantForm.markAllAsTouched();
    if (this.createTenantForm.valid) {
      const artifactCategory = this.selectedArtifactoryCategories.toString();
      const newData = { ...this.createTenantForm.value, artifactCategory };
      this.subscriptions.push(
        this.tenantService.createTenant(newData).subscribe(
          () => {
            this.toastNotificationService.showSuccess(CommonConstants.CREATETENANT);
            this.router.navigate(['../createTenantList'], { relativeTo: this.route });
          },
          (error: HttpErrorResponse) => {
            throw error;
          }
        )
      );
    }
  }


  public onUpdateTenant(): void {
    const artifactCategory = this.selectedArtifactoryCategories.toString();
    const newData = { ...this.createTenantForm.value, artifactCategory };
    newData.tenantName = this.editTenantValue.tenantName;
    this.subscriptions.push(
      this.tenantService
        .updateTenant(this.editTenantValue.tenantId, newData)
        .subscribe(
          () => {
            this.toastNotificationService.showSuccess(CommonConstants.UPDATETENANT);
            this.router.navigate(['../createTenantList'], { relativeTo: this.route });

          },
          (error: HttpErrorResponse) => {
            throw error;
          }
        )
    );
  }

  public getOrders(): ArtifactoryModel[] {
    return [
      { id: 1, artifactoryName: 'Components' },
      { id: 2, artifactoryName: 'Libraries' },
      { id: 3, artifactoryName: 'Capabilities' },
      { id: 4, artifactoryName: 'Design Foundations' },
      { id: 5, artifactoryName: 'Guides' },
    ];
  }

  get selectLocationArray(): FormArray {
    return this.createTenantForm.controls.selectLocation as FormArray;
  }

  private createTenant(): void {
    this.createTenantForm = new FormGroup({
      tenantName: new FormControl('', Validators.required),
      tenantDescription: new FormControl('', Validators.required),
      selectLocation: new FormArray([]),
      tenantUser: new FormArray([]),
    });
  }

  private addCheckboxes(): void {
    if (this.selectLocationList) { 
      this.selectLocationList.map(item => {this.selectedArtifactoryCategories.push(item.artifactoryName)})    
      this.selectLocationList.forEach(() =>
        this.selectLocationArray.push(new FormControl(true))
      );
    }
  }

  public onSelectedArtifactoryCategories(
    event: Event,
    artifactoryName: string,
    i: number
  ): void {
    if ((event.target as HTMLInputElement).checked) {
      this.selectedArtifactoryCategories.push(
        this.selectLocationList[i].artifactoryName
      );
    } else {
      const index = this.selectedArtifactoryCategories.indexOf(artifactoryName);
      this.selectedArtifactoryCategories.splice(index, 1);
    }
  }

  get projectUserArray(): FormArray {
    return this.createTenantForm.get('tenantUser') as FormArray;
  }

  public onAddUsers(addUser: CreateTenantAddUserModel): void {
    this.projectUserArray.controls = [];
    this.addUsers.push(addUser);
    this.populateUsersTable();
  }

  private populateUsersTable(): void {
    if (this.addUsers.length >= 0) {
      this.addUsers.forEach((user: CreateTenantAddUserModel) => {
        (this.createTenantForm.get('tenantUser') as FormArray).push(
          this.fb.group({
            email: this.fb.control(user.email),
            roleName: this.fb.control(user.roleName),
            userId: this.fb.control(user.userId),
            roleId: this.fb.control(user.roleId),
            name: this.fb.control(user.name),
            tenantId: this.fb.control(this.tenantEditId),
          })
        );
      });
    }
  }

  private getRoles(): void {
    this.roleService.getRole().subscribe((role) => {
      this.roles = role;
    });
  }

  public onDeleteUser(user) {
    const userIndex = user.controls.email.value;
    this.addUsers = this.addUsers.filter((item) => {
      return item.email !== userIndex;
    });
    this.projectUserArray.clear();
    this.populateUsersTable();
  }
  public navigateToCreateList() {
    this.router.navigate(['../createTenantList'], { relativeTo: this.route });
  }
}
