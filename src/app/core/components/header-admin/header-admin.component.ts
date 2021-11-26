import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { CommonConstants } from '../../constants/common.constants';
import { LoginResponse } from '../../models/header-menu.model';
import { MenuService } from '../../services/menu/menu.service';
import { ParentSubscriptionComponent } from '../parent-subscription/parent-subscription.component';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css'],
})
export class HeaderAdminComponent extends ParentSubscriptionComponent implements OnInit {
  @Input() public isAdminMenu: boolean;
  public adminMenuData: LoginResponse;
  public isMenuRendering = true;
  public selectedMenuItem: string;
  public isSuperAdmin: boolean;

  constructor(
    private menuService: MenuService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.menuService.getMenuItems().subscribe((item) => {
      this.isMenuRendering = false;
      setTimeout(() => {
        this.isMenuRendering = true;
        this.adminMenuData = { ...item };
      }, 0);
    });
    this.isSuperAdmin = false;
    if (this.router.url === '/adminmenu/approval') {
      this.selectedMenuItem = CommonConstants.APPROVAL;
    } else if (sessionStorage.getItem('selectedPageName')) {
      this.selectedMenuItem = sessionStorage.getItem('selectedPageName');
    }
  }

  public onNavigateToApproval(approvalQueue: string): void {
    sessionStorage.setItem('selectedPageName', approvalQueue);
    this.selectedMenuItem = sessionStorage.getItem('selectedPageName');
    this.router.navigate(['approval'], { relativeTo: this.route })
  }

  public onNavigateToPageManagement(pagemanagement: string): void {
    sessionStorage.setItem('selectedPageName', pagemanagement);
    this.selectedMenuItem = sessionStorage.getItem('selectedPageName');
    this.router.navigate(['pagemanagement'], { relativeTo: this.route })
  }

  public onNavigateToUser(user: string): void {
    sessionStorage.setItem('selectedPageName', user);
    this.selectedMenuItem = sessionStorage.getItem('selectedPageName');
    this.router.navigate(['user'], { relativeTo: this.route })
  }

  public onNavigateToCreateTenantList(createTenantList: string): void {
    sessionStorage.setItem('selectedPageName', createTenantList);
    this.selectedMenuItem = sessionStorage.getItem('selectedPageName');
    this.router.navigate(['createTenantList'], { relativeTo: this.route })
  }

  public onNavigateToArtifacts(myartifact: string): void {
    sessionStorage.setItem('selectedPageName', myartifact);
    this.selectedMenuItem = sessionStorage.getItem('selectedPageName');
    this.router.navigate(['myartifact'], { relativeTo: this.route })
  }

  public onNavigateToRole(role: string): void {
    sessionStorage.setItem('selectedPageName', role);
    this.selectedMenuItem = sessionStorage.getItem('selectedPageName');
    this.router.navigate(['role'], { relativeTo: this.route })
  }

  public onNavigateToPermission(permission: string): void {
    sessionStorage.setItem('selectedPageName', permission);
    this.selectedMenuItem = sessionStorage.getItem('selectedPageName');
    this.router.navigate(['permission'], { relativeTo: this.route })
  }
  public onNavigateToNewpassword(newpassword: string): void {
    sessionStorage.setItem('selectedPageName', newpassword);
    this.selectedMenuItem = sessionStorage.getItem('selectedPageName');
    this.router.navigate(['newpassword'], { relativeTo: this.route });
  }
  public onNavigateToHome(): void {
    this.selectedMenuItem = CommonConstants.APPROVAL;
    this.router.navigate(['approval'], { relativeTo: this.route });
  }
}
