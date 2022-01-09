import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConstants } from 'src/app/core/constants/common.constants';
import { LoginResponse } from 'src/app/core/models/header-menu.model';
import { CreateLoginRequest } from 'src/app/core/models/login.model';
import { CreateTenantModel } from 'src/app/core/models/tenant.model';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { ConfirmWindowComponent } from 'src/app/shared/components/confirm-window/confirm-window.component';
import { TenantService } from '../../services/tenant/tenant.service';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.css'],
})
export class TenantListComponent implements OnInit {
  @ViewChild(ConfirmWindowComponent)
  public confirmWindowComponent: ConfirmWindowComponent;
  public tenantData: CreateTenantModel[];
  public deleteTenant: number[] = [];
  public menuData: any;
  public userId: number;
  public isSuperAdmin: boolean;
  

  constructor(
    private router: Router,
    private tenantService: TenantService, 
    private loginService: LoginService,
    private toastNotificationService: ToastNotificationService,
    private route: ActivatedRoute
    
  ) {}

  ngOnInit(): void {
    this.getTenant();
    this.isSuperAdmin = JSON.parse(sessionStorage.getItem('isSuperAdmin'));
  }

  public onTenantEdit(tenant: CreateTenantModel): void {
    // this.tenantService.setTenantData(tenant);
    sessionStorage.setItem('createTenant', JSON.stringify(tenant));
    this.router.navigate(['../createTenant'], { relativeTo: this.route });
    }
    

    public onclickCreateTenant(): void{
    sessionStorage.setItem('createTenant', JSON.stringify(null));
    this.router.navigate(['../createTenant'], { relativeTo: this.route });
    }
    
    public onDeleteCheckbox(event: Event, id: number): void {
      let deletedTenantManagement: CreateTenantModel;
      if ((event.target as HTMLInputElement).checked && this.tenantData) {
      deletedTenantManagement = this.tenantData.find((item: CreateTenantModel) => item.tenantId
      ===
      id);
      this.deleteTenant.push(deletedTenantManagement.tenantId); 
      } else {
      const tenantIndex: number = this.deleteTenant.findIndex((item) => item ===
      id);
      this.deleteTenant.splice(tenantIndex, 1);
      }
     
      }
      
  public onDeleteTenant(): void {
    if (this.deleteTenant.length > 0) {
      this.confirmWindowComponent.openModal();
    }
  }

  public onClickYes(): void {
    this.deleteTenant.map(id => {this.deleteTenantDetails(id)})
    }

public deleteTenantDetails(id){

  this.tenantService
  .removeTenant(id)
  .subscribe(() => {
    this.getTenant();
    this.referMenu();
    this.toastNotificationService.showSuccess (CommonConstants.DELETETENANT);
    delete this.deleteTenant;
  });

}

  public onClickNo(): void {}

  public referMenu(): void {
    const loginData: CreateLoginRequest = {
    email: sessionStorage.getItem('userEmail'), 
    password: sessionStorage.getItem('userData')
    };
    this.loginService.loginUser(loginData, false);
    }
    

    private getTenant(): void {
      // if (JSON.parse(sessionStorage.getItem("isSuperAdmin'))) {
      // this.getAllTenantlist();
      // } else {
      this.getTenantByAdmin();
      // }
      this.getTenantByAdmin();
      }
      

      private getTenantByAdmin(): void {
        this.userId = JSON.parse(sessionStorage.getItem('userId'));
        this.tenantService.getTenantByAdmin(this.userId, JSON.parse(sessionStorage.getItem('isSuperAdmin'))).subscribe(
        (data) => {
        this.tenantData = data;
        },
        (error) => {
        throw error;
        }
        );
        }
        

  private getAllTenantList(): void {
    this.tenantService.getTenant().subscribe(
      (data) => {
        this.tenantData = data;
      },
      (error) => {
        throw error;
      }
    );
  }
}
