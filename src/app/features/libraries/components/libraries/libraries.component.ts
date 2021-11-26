import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ParentSubscriptionComponent } from 'src/app/core/components/parent-subscription/parent-subscription.component';
import { SearchService } from 'src/app/features/search/sevices/search.service';
import { LibraryService } from '../../services/library.service';
import { LibrariesHomeComponent } from '../libraries-home/libraries-home.component';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.css'],
  providers: [LibrariesHomeComponent]
})
export class LibrariesComponent extends ParentSubscriptionComponent implements OnInit {
  @ViewChild('createPage ') public createPage;
  public selectedLibraryId = 0;
  public status = 'Approved';
  public showHome = false;
  public showForm = false;
  public showView = false;
  public librariesList = [];
  public homePageInput: boolean;
  public id: number;
  public showCreateButton;
  public clicked;
  public tenantId = '';
  public libraryInput: { type: string; details: string };
  public isSuperAdmin: boolean;
  constructor(
    private libraryService: LibraryService,
    private viewPage: LibrariesHomeComponent,
    private searchService: SearchService,
    private loginService: LoginService,
    private spinner: SpinnerService
  ) {
    super();
  }
  public ngOnInit(): void {
    this.spinner.startBrowse();
    this.searchService.searchView.subscribe((value) => {
      this.librariesList = [];
      this.showView = false;
      this.tenantId = '';
      if (value) {
        this.showHome = false;
        this.status = 'Approved';
        this.tenantId = value.tenantId;
        this.getLibrariesList();
        this.loadData(value);
        this.clicked = value.pageTitle;
      } else {
        if (JSON.parse(sessionStorage.getItem('menu')).roleName) {
          this.libraryService.detailsUser.subscribe(() => {
            this.librariesList = [];
            this.showHome = false;
            this.showView = false;
            this.tenantId = '';
            this.tenantId = JSON.parse(sessionStorage.getItem('menu')).tenantId;
            this.getLibrariesList();
            this.showCreateButton = JSON.parse(sessionStorage.getItem('menu')).roleName;
            this.loadData('home');
          });
        }
      }
    });

    if (this.tenantId === '') {
      this.libraryService.detailsUser.subscribe((val) => {
        if (val) {
          this.librariesList = [];
          this.showHome = false;
          this.showView = false;
          this.tenantId = JSON.parse(sessionStorage.getItem('menu')).tenantId;
          this.getLibrariesList();
          this.showCreateButton = JSON.parse(sessionStorage.getItem('menu')).roleName;
          this.loadData('home');
        }
      });
    }
    this.spinner.stopBrowse();
    this.isSuperAdmin = this.loginService.getSuperAdmin();
  }
  public getLibrariesList(): void {
    this.librariesList = [];
    this.libraryService.getLibraryByStatus(this.tenantId, this.status).subscribe(
      (res) => {
        if (res != null) {
          this.librariesList=res;
        } else {
          this.librariesList = [];
        }
      },
      (error: HttpErrorResponse) => {
        throw error;
      }
    );
  }
  public loadData(selectedTab): void {
    this.clicked = selectedTab;
    if (selectedTab === 'home') {
      this.homePageInput = !this.homePageInput;
      this.showView = false;
      this.showForm = false;
      if (this.createPage) {
        this.createPage.showFooter = false;
      }
      this.viewPage.showView = false;
      this.showHome = true;
    } else if (selectedTab === 'create') {
      this.showView = false;
      this.showHome = false;
      this.viewPage.showView = false;
      this.showForm = true;
      this.createPage.showFooter = true;
      this.createPage.showPreview = [];
      this.createPage.imgurl = [];
      this.createPage.fileName = [];
      this.createPage.imageName = [];
      this.createPage.pills = [];
      this.createPage.toggleSave = false;
      this.createPage.toggleSubmit = false;
      this.createPage.librariesForm.reset();
      this.id = 0;
      this.clicked = {};
      this.libraryInput = {
        type: 'create',
        details: ''
      };
    } else {
      if (this.status == 'Approved') {
        this.selectedLibraryId = selectedTab.artifactId;
        this.libraryService.setDraftRecord(selectedTab);
        this.showView = true;
        this.showHome = false;
        this.showForm = false;
        this.viewPage.showView = true;
      } else if (this.status === 'Draft') {
        this.id = selectedTab.artifactId;
        this.libraryService.setDraftRecord(selectedTab);
        this.showView = false;
        this.showHome = false;
        this.showForm = true;
        this.viewPage.showView = false;
        this.createPage.showFooter = true;
        this.createPage.unSetFormControls();
        this.createPage.librariesForm.patchValue(selectedTab);
        this.createPage.setLibraries();
      } else if (this.status === 'Pending') {
        this.selectedLibraryId = selectedTab.artifactId;
        this.libraryService.setDraftRecord(selectedTab);
        this.showForm = false;
        this.showView = true;
        this.showHome = false;
        this.createPage.showFooter = false;
        this.viewPage.showView = true;
      }
    }
  }
  public refreshList(currentStatus): void {
    if (currentStatus === 'refreshPending') {
      this.status = 'Approved';
      this.getLibrariesList();
      this.loadData('home');
    } else if (currentStatus === 'refreshDraft') {
      this.status = 'Approved';
      this.getLibrariesList();
      this.loadData('home');
    } else if (currentStatus === 'Reset') {
      this.loadData('create');
    }
  }
  public viewApproved(selectedTab): void {
    this.clicked = selectedTab;
    this.selectedLibraryId = selectedTab.artifactId;
    this.libraryService.setDraftRecord(selectedTab);
    this.showView = true;
    this.showHome = false;
    this.showForm = false;
    this.viewPage.showView = true;
  }
  public viewDraft(selectedTab): void {
    this.clicked = selectedTab;
    this.createPage.librariesForm.reset();
    this.createPage.id = selectedTab.artifactId;
    this.libraryService.setDraftRecord(selectedTab);
    this.showView = false;
    this.showHome = false;
    this.showForm = true;
    this.viewPage.showView = false;
    this.createPage.showFooter = true;
    this.createPage.unsetFormControls();
    this.createPage.librariesForm.patchValue(selectedTab);
    this.createPage.librariesForm.controls.taskId.reset();
    this.createPage.pills = selectedTab.taskid;
    this.createPage.setLibraries();
  }
  public onStatusChange(event): void {
    this.librariesList = [];
    this.status = event;
    this.showHome = true;
    this.showView = false;
    this.showForm = false;
    this.getLibrariesList();
  }
}
