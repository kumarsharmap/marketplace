import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ParentSubscriptionComponent } from './core/components/parent-subscription/parent-subscription.component';
import { NavigationDropdownDirective } from './core/directives/drop-down/navigation-dropdown.directive';
import { LoginResponse } from './core/models/header-menu.model';
import { MenuService } from './core/services/menu/menu.service';
import { LoginService } from './features/auth/services/login/login.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent extends ParentSubscriptionComponent implements OnInit, AfterViewInit {
	@ViewChild(NavigationDropdownDirective)
	public navigationDropdownDirective: NavigationDropdownDirective;
	public isAdminMenu: boolean;
	public isCommonMenu: boolean;
	public hiddenMenu: boolean;
	public hiddenAdminMenu: boolean;

	public checkSuperAdmin: string;
	constructor(private loginService: LoginService, private menuService: MenuService, public router: Router) {
		super();
	}

	public ngOnInit(): void {
		this.hiddenMenu = false;
		this.isAdminMenu = false;
		this.isCommonMenu = false;
		this.hiddenAdminMenu = true;
		this.subscriptions.push(
			this.loginService.authentication$.subscribe((loginData: LoginResponse[]) => {
				const data = JSON.parse(sessionStorage.getItem('loginResponse'));
				console.log(data);
				if (data && data[0].isSuperAdmin === '1') {
					
					this.checkSuperAdmin = data[0].isSuperAdmin;
					sessionStorage.setItem('isSuperAdmin', JSON.stringify(true));
					this.loginService.setSuperAdmin(true);
					this.isAdminMenu = true;
					this.isCommonMenu = true;
					this.hiddenMenu = true;
					this.hiddenAdminMenu = true;
				} else if (data && (data[0].isSuperAdmin === '0' || data[0].isSuperAdmin === null)) {
					sessionStorage.setItem('isSuperAdmin', JSON.stringify(false));
					this.loginService.setSuperAdmin(false);
					this.isAdminMenu = false;
					this.isCommonMenu = true;
					this.hiddenMenu = true;
				} else {
					this.isAdminMenu = false;
					this.hiddenMenu = false;
				}
				this.menuService.setMenuItems(data);
			})
		);

		this.subscriptions.push(
			this.menuService.getMenuItems().subscribe((menuItems) => {
				if (this.isAdminMenu === false && menuItems !== null) {
					this.hiddenAdminMenu = true;
				} else if (this.checkSuperAdmin === '1') {
					this.hiddenAdminMenu = true;
				} else {
					this.hiddenAdminMenu = false;
				}
			})
		);
	}

	public ngAfterViewInit(): void { }
}



