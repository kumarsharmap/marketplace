import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ComponentServiceService } from 'src/app/component-service.service';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { CapabilitiesService } from 'src/app/features/capabilities/components/capabilities/capabilities.service';
import { SearchService } from 'src/app/features/search/sevices/search.service';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';

@Component({
  selector: 'app-component-left-menu',
  templateUrl: './component-left-menu.component.html',
  styleUrls: ['./component-left-menu.component.css']
})
export class ComponentLeftMenuComponent implements OnInit {

  public customerForm: FormGroup;
  public showHomePage = false;
  public showCreatePage = false;
  public showViewPage = false;
  public list: any = [];
  public statusFlag: any;
  public clicked: any = {};
  public inpObjTosend: any = {};
  public selectedCapabilityId: any = {};
  public role = '';
  public tennatId: any;
  public isSuperAdmin: boolean;

  constructor(
    public fb: FormBuilder,
    private capabilityService: CapabilitiesService,
    private componentServ: ComponentServiceService,
    private toastNotificationService: ToastNotificationService,
    private searchService: SearchService,
    private loginService: LoginService,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.role = JSON.parse(sessionStorage.getItem('menu')).roleName;
    this.searchService.searchView.subscribe((value) => {
      this.spinner.startBrowse();
      this.list = [];
      this.showViewPage = false;
      this.tennatId = null;
      if (value) {
        this.showHomePage = false;
        this.tennatId = value['tenantId'];
        this.role = JSON.parse(sessionStorage.getItem('menu')).roleName;
        this.getComponentList();
        this.loadData('component', value);
      } else {
        if (JSON.parse(sessionStorage.getItem('menu')).roleName) {
          this.componentServ.detailsUser.subscribe((value) => {
            this.list = [];
            this.role = JSON.parse(sessionStorage.getItem('menu')).roleName;
            this.tennatId = null;
            this.tennatId = JSON.parse(sessionStorage.getItem('menu')).tenantId;
            this.showHomePage = true;
            this.loadHome();
            this.getComponentList();
            this.customerForm = this.fb.group({
              customSelect: new FormControl()
            });
          });
        }
      }
    });
    this.spinner.stopBrowse()
    this.customerForm = this.fb.group({
      customSelect: new FormControl()
    });
    this.isSuperAdmin = this.loginService.getSuperAdmin();
  }
  public getComponentList(): void {
    this.list = [];
    this.componentServ.getComponentArtifactsByStatus('Approved', this.tennatId).subscribe(
      (res) => {
        this.list = res;
      }, (error: HttpErrorResponse) => {
        throw error;
      }
    )
  }

  public loadData(type, obj): void {
    this.clicked = obj;
    this.selectedCapabilityId = { type: 'Component', id: obj.artifactId };
    this.showHomePage = false;
    this.showCreatePage = false;
    this.showViewPage = true;
  }
  public loadCreate(): void {
    this.inpObjTosend = {
      type: "Create", details: {}
    };
    this.clicked = {};
    this.showHomePage = false;
    this.showViewPage = false;
    this.showCreatePage = true;
  }
  public loadHome(): void {
    this.clicked = {};
    this.showCreatePage = false;
    this.showViewPage = false;
    this.showHomePage = true;
  }
  public refreshListCreate(event): void {
    if (event === 'Reset') {
      this.loadCreate();
    } else {
      this.getComponentList();
      this.loadHome();
    }
  }
  public refreshList(event): void {
    this.getComponentList();
    this.loadHome();
  }
}
