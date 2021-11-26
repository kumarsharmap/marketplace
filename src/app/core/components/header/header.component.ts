import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Event, NavigationStart, Router } from '@angular/router';
import { ComponentServiceService } from 'src/app/component-service.service';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { CapabilitiesService } from 'src/app/features/capabilities/components/capabilities/capabilities.service';
import { FoundationService } from 'src/app/features/foundation/components/services/foundation.service';
import { LibraryService } from 'src/app/features/libraries/services/library.service';
import { LoginResponse, TenantList } from '../../models/header-menu.model';
import { MenuService } from '../../services/menu/menu.service';
import { StateUser } from '../../store/user-info/models/user-info.models'
import { ParentSubscriptionComponent } from '../parent-subscription/parent-subscription.component';
import { SearchService } from 'src/app/features/search/sevices/search.service';
import { ToastNotificationService } from '../../services/toast-notification/toast-notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent extends ParentSubscriptionComponent implements OnInit {
  private isAlive = true;
  public isOpen: boolean;
  public headerMenuItems: LoginResponse[] = [];
  public selectedMenu: string;
  public isSelectedAdminMenu = false;
  public headerMenuSelected: string;
  public isMenuRefresh = true;
  public isSuperAdmin: boolean;
  constructor(
    private store: Store<StateUser>,
    public router: Router,
    private loginService: LoginService,
    private menuService: MenuService,
    private capabilityService: CapabilitiesService,
    private foundationService: FoundationService,
    private searchService: SearchService,
    private componentServiceService: ComponentServiceService,
    private libraryService: LibraryService,
    private cdf: ChangeDetectorRef,
    private toastNotificationService:ToastNotificationService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.createHeaderMenu();
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        const test = event.url.split('/').toString();
        const admin = test.replace(/\//g, '').split(',');
        const selectedMenuItem = event.url.split('/').pop();
        if (selectedMenuItem === this.headerMenuSelected || selectedMenuItem === 'DesignFoundations') {
          this.isMenuRefresh = false;
          setTimeout(() => {
            if (selectedMenuItem === 'DesignFoundations') {
              this.selectedMenu = 'Design Foundations';
            } else {
              this.selectedMenu = this.headerMenuSelected;
            }
            this.isMenuRefresh = true;
          }, 0);
        } else {
          this.selectedMenu = '';
        }
        if (admin[1] === 'adminmenu') {
          this.isSelectedAdminMenu = true;
        } else {
          delete this.isSelectedAdminMenu;
        }
      }
    });
    this.isSuperAdmin = this.loginService.getSuperAdmin();
  }

  private getColors(menuItem): void {
    this.subscriptions.push(
      this.menuService.getAllColors().subscribe((colors) => {
        var tempMenu = JSON.parse(JSON.stringify(menuItem));
        if (colors) {

          for (const i in menuItem) {
            for (const j in menuItem[i].customTenantList) {
              for (const k in colors) {
                if (menuItem[i].customTenantList[j].tenantName === colors[k].tenantName) {

                  tempMenu[i].customTenantList[j].lightColor = this.hexToRGB(colors[k].tenantColor, 0.1);
                  tempMenu[i].customTenantList[j].darkColor = colors[k].tenantColor;
                } else {
                  if (!JSON.stringify(colors).includes(menuItem[i].customTenantList[j].tenantName)) {
                    if (colors[k].tenantName === 'Other') {
                      tempMenu[i].customTenantList[j].lightColor = this.hexToRGB(colors[k].tenantColor, 0.1);
                      tempMenu[i].customTenantList[j].darkColor = colors[k].tenantColor;
                    }
                  }
                }
              }
            }
          }

          Object.preventExtensions(tempMenu);
          this.headerMenuItems = tempMenu;

        }
      })
    );
  }

  public hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ', ' + g + ', '+ b + ','  + alpha + ')';
  }

  // private createHeaderMenu() {
  //   this.subscriptions.push(
  //     this.loginService.authentication$.subscribe((menuItem: LoginResponse[]) => {
  //         if (menuItem) {
  //           this.headerMenuItems = menuItem;
  //         }
  //       })
  //   );
  // }






  private createHeaderMenu(): void {
const login = JSON.parse(sessionStorage.getItem('loginResponse'));
    if(login) {
      this.headerMenuItems = login;
    }
    this.subscriptions.push(
      this.loginService.authentication$.subscribe((menuItemResponse: LoginResponse[]) => {
        const menuItem = JSON.parse(sessionStorage.getItem('loginResponse'));
        if (menuItemResponse) {
          //this.headerMenuItems = menuItem;
          this.getColors(menuItem)
        }
      })
    );
  }
  public navigateToDashboard() {
    this.menuService.setMenuItems(null);
    this.router.navigate(['/landing']);
  }

  public navigateToSignOut() {
    this.loginService.authentication$.next(null);
    this.router.navigate(['/']);
  }

  public navigateToCommonMenu() {
    this.router.navigate(['CSDigital']);
  }

  public navigateToMenu(mainMenu: LoginResponse, menu: TenantList): void {
    sessionStorage.setItem('menu', JSON.stringify(menu));
    sessionStorage.setItem('mainMenu', JSON.stringify(mainMenu));
    this.headerMenuSelected = JSON.parse(sessionStorage.getItem('mainMenu')).artifactName;
    this.menuService.setNavigationIndication(menu.tenantName);
    this.menuService.setMenuItems(menu);

    if (mainMenu.artifactName === 'Capabilities') {
      this.capabilityService.setSelectedMenuItem(menu);
      this.router.navigate(['Capabilities']);
    }
    if (mainMenu.artifactName === 'Design Foundations') {
      this.foundationService.setApprovalHeaderData(menu);
      this.router.navigate(['DesignFoundations']);
    }
    if (mainMenu.artifactName === 'Libraries') {
      this.libraryService.setSelectedMenuItem(menu);
      this.router.navigate(['Libraries']);
    }

    if (mainMenu.artifactName === 'Components') {
      this.componentServiceService.setApprovalHeaderData(menu);
      this.router.navigate(['Components']);
    }

    if (mainMenu.artifactName === 'Guides') {
      this.foundationService.setApprovalHeaderData(menu);
      this.router.navigate(['Guides']);
    }
  }

  public search(event) {
    if (event.target.value.indexOf(' ') >= 0) {
      this.toastNotificationService.showError('Search can not contain spaces');
    }
    else{
      if(event.target.value){
        sessionStorage.setItem('searchValue', event.target.value);
        if (event.keyCode == 13) {
          this.searchService.searchData(event.target.value);

          this.router.navigate(['Search']);
        }
      }
      }


  }
}
