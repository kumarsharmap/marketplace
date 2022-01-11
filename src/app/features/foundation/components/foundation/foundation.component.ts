import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { SearchService } from 'src/app/features/search/sevices/search.service';
import { FoundationService } from '../services/foundation.service';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';

@Component({
  selector: 'app-foundation',
  templateUrl: './foundation.component.html',
  styleUrls: ['./foundation.component.css']
})
export class FoundationComponent implements OnInit {

  public list: any = [];
  public listAsync;
  public createCustomForm: FormGroup;
  public homeFoundationFlag = false;
  public createFoundationFlag = false;
  public foundationFlag = false;
  public othersFoundationFlag = false;
  public viewOtherArtifactFlag = false;
  public clicked: any;
  public id: any;
  public idToSend: any;
  public statusFlag = '';
  public inpObjTosend: any = {};
  public selectedOption: any;
  public richTextTemplateInpsendut: any;
  public homePageInput = true;
  public richTextTemplateInput: {
    foundationArtifactType: string; type: string; details: any
  };
  public role = '';
  public tenantId: any;
  public isSuperAdmin: boolean;

  constructor(
    public formBuilder: FormBuilder,
    private foundationServ: FoundationService,
    private toastNotificationService: ToastNotificationService,
    private searchService: SearchService,
    private loginService: LoginService,
    private spinner: SpinnerService
  ) { }
  public ngOnInit(): void {
    //this.role = JSON.parse(sessionStorage.getItem('menu')).roleName;
    this.role = (sessionStorage.getItem('menu') != undefined) ? JSON.parse(sessionStorage.getItem('menu')).roleName : '';


    this.searchService.searchView.subscribe((value) => {
      this.spinner.startBrowse();
      this.list = [];
      this.viewOtherArtifactFlag = false;
      this.tenantId = null;
      if (value) {
        this.homeFoundationFlag = false;
        this.tenantId = value['tenantId'];
        this.role = JSON.parse(sessionStorage.getItem('menu')).roleName;
        this.fetchlist('Approved');
        this.loadData('approved', value);
      }
      else {
        if (JSON.parse(sessionStorage.getItem('menu')).roleName) {
          this.foundationServ.detailsUser.subscribe((value) => {
            this.list = [];
            this.homeFoundationFlag = false;
            this.viewOtherArtifactFlag = false;
            this.tenantId = null;
            this.tenantId = JSON.parse(sessionStorage.getItem('menu')).tenantId;
            this.role = JSON.parse(sessionStorage.getItem('menu')).roleName;
            this.fetchlist('Approved');
            this.loadHome();
          });
        }
      }
    });
    this.spinner.stopBrowse();
    this.isSuperAdmin = this.loginService.getSuperAdmin();
  }
  public fetchlist(type): void {
    this.list = [];
    this.listAsync = this.foundationServ.getOtherArtifactsByStatus(type, this.tenantId)/*.subscribe(
      (response) => {
        if (response != null) {
          this.list = response;
        } else {
          this.list = [];
        }
      },
      (error) => {
        this.toastNotificationService.showError('Failed fetch list of Foundation artifacts');
      }
    );*/
  }
  public loadData(status, obj): void {
    this.clicked = obj;
    for (const i in this.list) {
      if (this.list[i] === obj) {
        this.id = i;
      }
    }
    if (status === 'approved') {
      this.homeFoundationFlag = false;
      this.createFoundationFlag = false;
      this.othersFoundationFlag = false;
      this.foundationFlag = false;
      this.viewOtherArtifactFlag = true;
      this.idToSend = obj.artifactId;

    }
  }

  public loadHome(): void {
    this.idToSend = {};
    this.clicked = {};
    this.homePageInput = !this.homePageInput;
    this.foundationFlag = false;
    this.createFoundationFlag = false;
    this.othersFoundationFlag = false;
    this.viewOtherArtifactFlag = false;
    this.homeFoundationFlag = true;
  }

  public loadOthers(): void {
    this.richTextTemplateInput = {
      foundationArtifactType: 'Foundation',
      type: 'Create',
      details: {}
    };
    this.clicked = {};
    this.foundationFlag = false;
    this.homeFoundationFlag = false;
    this.createFoundationFlag = false;
    this.viewOtherArtifactFlag = false;
    this.othersFoundationFlag = true;
  }
  public handleRefresh(event): void {
    if (event === 'refreshMenu') {
      this.fetchlist('Approved');
      this.loadHome();
    }
    if (event === 'refreshMenuForSave') {
      this.fetchlist('Approved');
      this.loadHome();
    }
  }
  public handleClick(event): void {
    this.loadData(event.status, event.details);
  }
}

