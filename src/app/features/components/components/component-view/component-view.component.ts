import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { throwError } from 'rxjs';
import { ComponentServiceService } from 'src/app/component-service.service';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { SearchService } from 'src/app/features/search/sevices/search.service';


@Component({
  selector: 'app-component-view',
  templateUrl: './component-view.component.html',
  styleUrls: ['./component-view.component.css']
})
export class ComponentViewComponent implements OnInit, OnChanges {
  @ViewChildren('tabset') public tabset: QueryList<TabsetComponent>;
  @Input('selectedCapabilityId') inputObj;
  @Output() public data = new EventEmitter<string>();
  @Output() public refresh = new EventEmitter<string>();
  public selectedCapability: any;
  public hideButton = false;
  public headings = [];
  public EditModeFlag = false;
  public tabHeading = 'Example';
  public imgUrl: string;
  public previousImage: string;
  public code: any;
  public imagesArr: any = [];
  public senData: { type: string; details: any };
  public showSearch = false;
  public role='';
  sendCommentsInput: any;
  constructor(
    private componentServ: ComponentServiceService,
    private toastNotificationService: ToastNotificationService,
    private searchService: SearchService,
    private location: Location,
    public loginService: LoginService
  ) { }

  public ngOnInit(): void {
    this.role = JSON.parse(sessionStorage.getItem('menu')).roleName;
    this.hideButton = false;
    this.searchService.searchView.subscribe((value) => {
      if (value?.hideButton === true) {
        this.hideButton = true;
        this.showSearch = false;
      } else if (value?.hideButton === false) {
        this.hideButton = false;
        this.showSearch = true;
      }
    });
    if (this.inputObj['type'] === 'Component') {
      this.headings = [
        { tabTitle: 'Example' },
        { tabTitle: 'Code' },
        { tabTitle: 'Usage' },
        { tabTitle: 'Resources' },
        { tabTitle: 'Updates' },
      ]
      this.getComponentsDetails();
      this.sendCommentsInput = { type: this.inputObj.type, details: this.selectedCapability };
    }
  }
  public ngOnChanges(): void {
    this.role = JSON.parse(sessionStorage.getItem('menu')).roleName;
    this.hideButton = false;
    this.searchService.searchView.subscribe((value) => {
      if (value?.hideButton === true) {
        this.hideButton = true;
        this.showSearch = false;
      } else if (value?.hideButton === false) {
        this.hideButton = false;
        this.showSearch = true;
      }
    });
    if (this.inputObj['type'] === 'Component') {
      this.getComponentsDetails();
      this.sendCommentsInput = { type: this.inputObj.type, details: this.selectedCapability };
    }
  }
  public confirmTabSwitch(data): void {
    this.tabHeading = data.heading;
  }
  public getComponentsDetails(): void {
    
    this.componentServ.fetchComponentArtifactsById(this.inputObj['id']).subscribe(
      (res) => {
        this.selectedCapability = res;
        this.sendCommentsInput = { type: this.inputObj.type, details: this.selectedCapability };
        this.postRecentlyViewed(this.selectedCapability);
      },
      (error: HttpErrorResponse) => {
        this.toastNotificationService.showError(error.error.message);
        throw error;
      }
    )
  }
  public subTabSwitch(data: TabDirective): void { }
  public showIcon(): string {
    for (let i in this.selectedCapability.resourcesDTO) {
      if (this.selectedCapability.resourcesDTO[i]['resourceName'] === 'Bitbucket') {
        return '../../../../../assets/images/bitbucket.png';
      } else if (this.selectedCapability.resourcesDTO[i]['resourceName'] === 'Jira') {
        return '../../../../../assets/images/jira.png';
      } else {
        return '../../../../../assets/images/artefactory.png';
      }
    }
  }
  public refreshList(event): void {
    if (event === 'commentSubmitted') {

    }
  }
  public handleCancel(event): void {
    if (event === 'Cancel') {
      this.getComponentsDetails();
      this.EditModeFlag = false;
    }
    if (event === 'refreshMenu') {
      this.data.emit('refreshMenu');
    }
    if (event === 'Reset') {
      this.EditModeFlag = false;
      setTimeout(() => {
        this.edit();
      }, 200);
    }
  }
  public back(): void {
    this.location.back();
  }
  public edit(): void {
    this.senData = { type: 'Edit', details: this.selectedCapability };
    this.EditModeFlag = true;
  }
  public postRecentlyViewed(artifactData): void {
    let obj = {};
    obj = {
      artifactCategory: artifactData.artifactCategory,
      artifactId: artifactData.artifactId,
      lastViewedOn: new Date(),
      pageTitle: artifactData.pageTitle,
      tenantId: artifactData.tenantId,
      tenantName: artifactData.tenantName,
      viewCount: 1
    }
    this.loginService.postRecentViewed(obj).subscribe(
      (res) => { },
      (error: HttpErrorResponse) => {
        throw new Error(error.error.message);

      }
    );
  }
  public selectTab(event, i): void {
    const data = { heading: 'Example' };
    this.confirmTabSwitch(data);
    let tabsArray = this.tabset?.toArray();
    tabsArray[i].tabs[0].active = true;
  }
}
