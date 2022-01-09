import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChildren, QueryList } from '@angular/core';
import { TabDirective, TabsetComponent } from "ngx-bootstrap/tabs";
import { CapabilitiesService } from '../capabilities/capabilities.service';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { capabilitiesData, imageValue } from '../capabilities/capabilities.model';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { Location } from '@angular/common';
import { ComponentServiceService } from 'src/app/component-service.service';
import { SearchService } from 'src/app/features/search/sevices/search.service';
@Component({
  selector: 'app-capabilities-view',
  templateUrl: './capabilities-view.component.html',
  styleUrls: ['./capabilities-view.component.css']
})
export class CapabilitiesViewComponent implements OnInit, OnChanges {
  public selectedCapability;
  @Input('selectedCapabilityId') inputObj;
  @ViewChildren('tabset') public tabset: QueryList<TabsetComponent>;
  @Output() data = new EventEmitter<string>();
  @Output() editData = new EventEmitter<any>();
  public refresh = new EventEmitter<string>();
  public headings = [];
  public EditModeFlag = false;
  public tabHeading = 'Technical Summary';
  public imgUrl: string;
  public previousImage: string;
  public pageTitle =
    '<p><strong>gayathri</strong></p><p><strong><em>tummala</em></strong></p><p><u>hcl</u></p><p><s>bangalore</s></p>';
  public code: any;
  public imagesArr: any = [];
  public senData: { type: string; details: any };
  public showBitbucket: boolean = false;
  public showJira = false;
  public showArtifactory = false;
  public hideButton = false;
  public showSearch = false;
  public capabilityInput: { type: string; details: any };
  public editModeFlag: boolean;
  public commentInput: any;
  public role='';
  constructor(
    private capabilityService: CapabilitiesService,
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

    this.headings = [{ tabTitle: 'Technical Summary' }, { tabTitle: 'Resources' }, { tabTitle: 'Updates' }];
    this.getSelectedCapabilityDetails();
    this.commentInput = { type: this.inputObj.type, details: this.selectedCapability };
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

    this.headings = [{ tabTitle: 'Technical Summary' }, { tabTitle: 'Resources' }, { tabTitle: 'Updates' }];
    this.getSelectedCapabilityDetails();
    this.commentInput = { type: this.inputObj.type, details: this.selectedCapability };
  }
  public confirmTabSwitch(data): void {
    this.tabHeading = data.heading;
  }
  public subTabSwitch(data: TabDirective): void { }
  public showIcon(): void {
    for (let i in this.selectedCapability.resourcesDTO) {
      if (this.selectedCapability.resourcesDTO[i]['resourceName'] == 'Bitbucket') {
        this.showJira = false;
        this.showArtifactory = false;
        this.showBitbucket = true;
      } else if (this.selectedCapability.resourcesDTO[i]['resourceName'] == 'Jira') {
        this.showBitbucket = false;
        this.showArtifactory = false;
        this.showJira = true;
      } else if (this.selectedCapability.resourcesDTO[i]['resourceName'] == 'Artifactory') {
        this.showJira = false;
        this.showBitbucket = false;
        this.showArtifactory = true;
      }
    }
  }
  public refreshList(event): void {
    if (event === 'commentSubmitted') {
      this.refresh.emit('Approved');
    }
  }
  public getSelectedCapabilityDetails(): void {
    
    this.capabilityService.getCapabilityByID(this.inputObj['id']).subscribe(
      (res) => {
        this.selectedCapability = res;
        this.postRecentlyViewed(this.selectedCapability);
        setTimeout(() => {
          this.showIcon();
        }, 2000);
        this.commentInput = { type: this.inputObj.type, details: this.selectedCapability };
      },
      (error: HttpErrorResponse) => {
        this.toastNotificationService.showError(error.error.message);
      }
    );
  }

  public showEdit(): void {
    this.capabilityInput = {
      type: 'Edit',
      details: this.selectedCapability
    };
    this.editModeFlag = true;
  }
  public handleRefresh(event): void {
    if (event === 'Reset') {
      this.editModeFlag = false;
      setTimeout(() => {
        this.showEdit();
      }, 200);
    } else if (event === 'refreshDraft') {
      this.editData.emit(event);
    } else {
      this.editModeFlag = false;
    }
  }
  public back(): void {
    this.location.back();
  }
  public postRecentlyViewed(artifactData): void {
    let obj
    { };
    obj = {
      artifactCategory: artifactData.artifactcategory,
      artifactId: artifactData.artifactId,
      lastViewedOn: new Date(),
      pageTitle: artifactData.pageTitle,
      tenantId: artifactData.tenantId,
      tenantName: artifactData.tenantName,
      viewcount: 1
    };
    this.loginService.postRecentViewed(obj).subscribe(
      (res) => { },
      (error: HttpErrorResponse) => {
        throw new Error(error.error.message);
      }
    );
  }
  public selectTab(event, i): void {
    const data = { heading: 'Technical Summary' };
    this.confirmTabSwitch(data);
    let tabsArray = this.tabset?.toArray();
    tabsArray[i].tabs[0].active = true;
  }
}

