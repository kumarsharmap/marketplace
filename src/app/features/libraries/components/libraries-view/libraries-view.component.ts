import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { LibraryService } from '../../services/library.service';
import { Location } from '@angular/common';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { On } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchService } from 'src/app/features/search/sevices/search.service';
@Component({
  selector: 'app-libraries-view',
  templateUrl: './libraries-view.component.html',
  styleUrls: ['./libraries-view.component.css']
})
export class LibrariesViewComponent implements OnInit, OnChanges {

  public selectedLibrary;
  @Output() public editData = new EventEmitter();
  @Input('selectedLibraryId') public selectedLibraryId;

  public hideButton = false;
  public showSearch = false;
  public editModeFlag: boolean;
  public libraryInput: { type: string; details: object };
  public role=''
  constructor(
    private libraryService: LibraryService,
    private searchService: SearchService,
    private toastNotificationService: ToastNotificationService,
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

    if (this.selectedLibraryId !== undefined || this.selectedLibraryId !== null) {
      this.getSelectedLibraryDetails();
    }
  }
  public back(): void {
    this.location.back();
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
    if (this.selectedLibraryId !== undefined || this.selectedLibraryId !== null) {
      this.getSelectedLibraryDetails();
    }
  }

  public getSelectedLibraryDetails(): void {
    this.libraryService.getLibraryByID(this.selectedLibraryId).subscribe(
      (res) => {
        this.selectedLibrary = res;
        this.postRecentlyViewed(this.selectedLibrary);
      },
      (error: HttpErrorResponse) => {
        this.toastNotificationService.showError(error.error.message);
        throw error;
      }
    );
  }
  public showEdit(): void {
    this.libraryInput = {
      type: 'Edit',
      details: this.selectedLibrary
    };
    this.editModeFlag = true;
  }
  public handleRefresh(event): void {
    if (event === 'Reset') {
      this.editModeFlag = false;
      this.showEdit();
    } else if (event === 'refreshDraft') {
      this.editData.emit(event);
    } else {
      this.editModeFlag = false;
    }
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
      viewcount: 1
    };
    this.loginService.postRecentViewed(obj).subscribe(
      (res) => { },
      (error: HttpErrorResponse) => {
        throw new Error(error.error.message);
      }
    );
  }
}
