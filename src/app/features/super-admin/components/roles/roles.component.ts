import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonConstants } from 'src/app/core/constants/common.constants';
import { RoleModel } from 'src/app/core/models/roles.model';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { ConfirmWindowComponent } from 'src/app/shared/components/confirm-window/confirm-window.component';
import { RoleService } from '../../services/role/role.service';
import { AddRoleComponent } from '../add-role/add-role.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  @ViewChild(AddRoleComponent)
  public addRoleComponent: AddRoleComponent;
  @ViewChild(ConfirmWindowComponent)
  public confirmWindowComponent: ConfirmWindowComponent;
  public deleteRole: number[]=[];
  public roleData: RoleModel[];
  constructor(private roleService: RoleService, private toastNotificationService: ToastNotificationService) {}

  ngOnInit(): void {
    this.getRoleData();
  }

  onOpenModal(): void {
    this.addRoleComponent.openModal();
  }

  public onRoleEdit(role): void {
    this.addRoleComponent.openRoleModalEdit(role);
  }

  public onDeleteRole(): void {
    if (this.deleteRole) {
      this.confirmWindowComponent.openModal();
    }
  }

  public onDeleteCheckbox(event: Event, id: number): void {
    let deletedrole: RoleModel;
    if ((event.target as HTMLInputElement).checked) {
    deletedrole = this.roleData.find((item: RoleModel) => item.roleId === id);
    this.deleteRole.push(deletedrole.roleId);
    } else {
    const tenantIndex: number = this.roleData.findIndex((item: RoleModel) => item.roleId ===
    id);
    this.deleteRole.splice(tenantIndex, 1);
    }
    }
    

  public onClickYes(): void {
    this.roleService.removeRole(this.deleteRole).subscribe(() => {
      this.getRoleData();
      this.toastNotificationService.showSuccess(CommonConstants.DELETETENANT);
      delete this.deleteRole;
    });
  }

  public onClickNo(): void {}

  public getRoleData(): void {
    this.roleService.getRole().subscribe(
      (data) => {
        if (data) {
          this.roleData = data;
        }
      },
      (error) => {
        throw error;
      }
    );
  }
}
