import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionModel } from 'src/app/core/models/permission.model';
import { ConfirmWindowComponent } from 'src/app/shared/components/confirm-window/confirm-window.component';
import { PermissionService } from '../../services/permissoin/permission.service';
import { AddPermissionComponent } from '../add-permission/add-permission.component';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css'],
})
export class PermissionComponent implements OnInit {
  @ViewChild(AddPermissionComponent)
  public addPermissionModalComponent: AddPermissionComponent;
  @ViewChild(ConfirmWindowComponent)
  public confirmWindowComponent: ConfirmWindowComponent;
  public permissionData: PermissionModel[];
  public deletePermission: number[]=[];

  constructor(
    private permissionService: PermissionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPermissionData();
  }

  onOpenModal(): void {
    this.addPermissionModalComponent.openModal();
  }

  public onPermissionEdit(permission): void {
    this.addPermissionModalComponent.openPermissionModalEdit(permission);
  }

  public onDeleteCheckbox(event: Event, id: number): void {
    let deletedPermission: PermissionModel;
    if ((event.target as HTMLInputElement).checked) {
    deletedPermission = this.permissionData.find(
    (item: PermissionModel) => item.permissionId === id
    );
    this.deletePermission.push(deletedPermission.permissionId);
    } else {
    const tenantIndex: number = this.permissionData.findIndex(
    (item: PermissionModel) => item.permissionId  === id
    );
    this.deletePermission.splice(tenantIndex, 1);
    }
    }
    

  public onDeletePermission(): void {
    if (this.deletePermission) {
      this.confirmWindowComponent.openModal();
    }
  }

  public onClickYes(): void {
    this.permissionService
      .removePermission(this.deletePermission)
      .subscribe(() => {
        this.getPermissionData();
      });
  }

  public onClickNo(): void {}

  public onLogOut(): void {
    this.router.navigate(['/']);
  }

  public getPermissionData(): void {
    this.permissionService.getPermission().subscribe((data) => {
      this.permissionData = data;
    });
  }
}
