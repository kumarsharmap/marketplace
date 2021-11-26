import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentSubscriptionComponent } from 'src/app/core/components/parent-subscription/parent-subscription.component';
import { UserManagementModel } from 'src/app/core/models/user-management.model';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { UserManagementService } from '../../services/user-management/user-management.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent
  extends ParentSubscriptionComponent
  implements OnInit {
  public userManagement: UserManagementModel[];
  private userId:number;

  constructor(
    private userManagementService: UserManagementService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
    
  ) {
    super();
  }

  ngOnInit(): void {
    this.getUserManagement();
    this.userId = JSON.parse(sessionStorage.getItem('userId'));
  }

  public navigateToCreateUser(): void {
    this.router.navigate(['../createuser'], { relativeTo: this.route });
    }
    

    public navigateToManage(usermanagement: UserManagementModel): void {
      this.userManagementService.getUserById(usermanagement.userId).subscribe((userManagement) => {
      // this.userManagementService.setManageUser(userManagement);
      sessionStorage.setItem('userManagement', JSON.stringify(userManagement));
      this.router.navigate(['../manage'], { relativeTo: this.route });
      });
      }
      

      private getUserManagement(): void {
        this.userManagementService.getAllUserManagement().subscribe((getallUsers) => {
        this.userManagement = getallUsers;
        this.IsCheckSuperAdminOrNot();
        });
        }
        
        private IsCheckSuperAdminOrNot(): void {
          if (!JSON.parse(sessionStorage.getItem('isSuperAdmin'))) {
          this.userManagement = this.userManagement.filter((user) => user.userId ===this.userId);
          }
          }
          public changeUrl(): void{
          window.location.hash ='adminmenu/user';
          }
          }
          