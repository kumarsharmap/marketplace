import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { FoundationService } from 'src/app/features/foundation/components/services/foundation.service';
import { SearchService } from 'src/app/features/search/sevices/search.service';
import { GuideServiceService } from '../../guide-service.service';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';

@Component({
  selector: 'app-guides-leftmenu',
  templateUrl: './guides-leftmenu.component.html',
  styleUrls: ['./guides-leftmenu.component.css']
})
export class GuidesLeftmenuComponent implements OnInit {
  list: any = [];
  public createFlag = false;
  public richTextTemplateInput: { foundationArtifactType: string; type: string; details: {} };
  public clicked: any;
  public homeGuideFlag = false;
  public viewFlag = false;
  public homePageInput: boolean;
  public role: any;
  public tenantId: any;
  public isSuperAdmin: boolean;
  constructor(
    public formBuilder: FormBuilder,
    private toastNotificationService: ToastNotificationService,
    private loginService: LoginService,
    public guideServiceService: GuideServiceService,
    public foundationServ: FoundationService,
    private searchService: SearchService,
    private spinner: SpinnerService
  ) { }
  public ngOnInit(): void {
    this.role = JSON.parse(sessionStorage.getItem('menu')).roleName;
    this.spinner.startBrowse();
    this.searchService.searchView.subscribe((value) => {
      this.list = [];
      this.viewFlag = false;
      this.tenantId = null;
      if (value) {
        this.homeGuideFlag = false;
        this.tenantId = value['tenantId'];
        this.fetchlist('Approved');
        this.loadData(value);
      } else {
        if (JSON.parse(sessionStorage.getItem('menu')).roleName) {
          this.foundationServ.detailsUser.subscribe((value) => {
            this.list = [];
            this.homeGuideFlag = false;
            this.viewFlag = false;
            this.tenantId = null;
            this.tenantId = JSON.parse(sessionStorage.getItem('menu')).tenantId;
            this.role = JSON.parse(sessionStorage.getItem('menu')).roleName;
            this.loadHome();
            this.fetchlist('Approved');
          });
        }
      }
    });
    this.spinner.stopBrowse();
    this.isSuperAdmin = this.loginService.getSuperAdmin();
  }

  public fetchlist(type): void {
    this.list = [];
    this.guideServiceService.getGuidesByStatus(type, this.tenantId).subscribe(
      (response) => {
        if (response != null) {
          this.list = response;
        } else {
          this.list = [];
        }
      },
      (error) => {
        this.toastNotificationService.showError('Failed fetch list of Guides');
      }
    );
  }
  public loadData(obj): void {
    this.clicked = obj;
    this.createFlag = false;
    this.homeGuideFlag = false;
    this.viewFlag = true;
  }
  public loadHome(): void {
    this.clicked = {};
    this.homePageInput = !this.homePageInput;
    this.createFlag = false;
    this.viewFlag = false;
    this.homeGuideFlag = true;
  }
  public loadOthers(): void {
    this.richTextTemplateInput = {
      foundationArtifactType: 'Guides',
      type: 'Create',
      details: {}
    };
    this.homeGuideFlag = false;
    this.viewFlag = false;
    this.createFlag = true;
  }

  public handleRefresh(event): void {
    if (event === 'Reset') {
      this.loadOthers();
    } else {
      this.loadHome();
      this.fetchlist('Approved');

    }

  }
  public handleClick(event): void {
    this.loadData(event.details);
  }
}
