import { Component, OnInit, ViewChild, OnChanges, Input } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { capabilitiesData, imageValue } from '../capabilities/capabilities.model';
import { TabDirective, TabsetComponent } from "ngx-bootstrap/tabs";
import { Subject } from 'rxjs';
import { CapabilitiesService } from './capabilities.service';
import { takeUntil } from 'rxjs/operators';
import { Route, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { CapabilitiesResourcesComponent } from '../capabilities-resources/capabilities-resources.component';
import { CapabilitiesViewComponent } from '../capabilities-view/capabilities-view.component';
import { DatePipe } from '@angular/common';
import { SearchService } from 'src/app/features/search/sevices/search.service';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';

@Component({
  selector: 'app-capabilities',
  templateUrl: './capabilities.component.html',
  styleUrls: ['./capabilities.component.css'],
  providers: [CapabilitiesResourcesComponent]
})
export class CapabilitiesComponent implements OnInit {
  @Input('data') inputDetails;
  @ViewChild('tabset') tabset: TabsetComponent;
  @ViewChild('createPage') createPage;
  public titleForm: FormGroup;
  public artifact = 'Capability';
  public options = [
    { label: 'HTML', value: 'html' },
    { label: 'is', value: 'js' }
  ];
  public myobj1 = capabilitiesData.technicalSummaryDTO[0].previews[0];
  public myobj11 = capabilitiesData.technicalSummaryDTO[0].richTextBlock[0];
  public myobj2 = capabilitiesData.resourcesDTO[0];
  public myObj3 = capabilitiesData.updatesDTO[0];
  public headings = [];
  public tabHeading: string = 'Technical Summary';
  public pageDescription = '';
  public pageTitle = "";
  public showForm: boolean = false;
  public status = 'Approved';
  private onDestroy$: Subject<void>;
  public capabilitiesList: any = [];
  public showHome = true;
  public showCapability = false;
  public tenantName: any;
  public selectedCapabilityId = {};
  public showExamplesAddBlock = true;
  public showResourcesAddBlock = true;
  public showUpdatesAddBlock = true;
  public selectedDraftRecord = capabilitiesData;
  public id: any = 0;
  public pills: string[] = [];
  public value: string;
  public isFocussed: boolean;
  public list: string[] = ['hallo', 'bye', 'all', 'farout'];
  public filteredlist: string[];
  public showCreateButton: any;
  public clicked: any;
  public tenantId: any;
  public editFlag: boolean = false;
  public editInput: any;
  public toggleSubmit = false;
  public toggleSave = false;
  public isSuperAdmin: boolean;

  constructor(
    public capabilityService: CapabilitiesService,
    private fb: FormBuilder,
    private toastNotificationService: ToastNotificationService,
    private route: Router,
    private viewForm: CapabilitiesViewComponent,
    private loginService: LoginService,
    private datepipe: DatePipe,
    private searchService: SearchService,
    private spinner: SpinnerService
  ) {
    if (this.route.getCurrentNavigation().extras.queryParams != undefined) {
      this.tenantName = this.route.getCurrentNavigation().extras.queryParams.tenantName;
    }
    this.headings = [{ tabTitle: 'Technical Summary' }, { tabTitle: 'Resources' }, { tabTitle: 'Updates' }];
    this.onDestroy$ = new Subject<void>();
  }

  public loadData(tab): void {
    this.clicked = tab;
    if (tab === 'home') {
      this.showHome = true;
      this.showCapability = false;
      this.showForm = false;
    } else if (tab === 'create') {
      this.createPage.toggleSave = false;
      this.createPage.toggleSubmit = false;
      this.editFlag = false;
      this.showCapability = false;
      this.showHome = false;
      this.showForm = true;
      this.createPage.titleForm.reset();
      this.createPage.id = 0;
      this.createPage.pills = [];
      this.createPage.groups.splice(0, this.createPage.groups.length);
      this.createPage.addGroupItem();
      this.clicked = {};
    } else {
      if (this.status === 'Approved') {
        this.selectedCapabilityId = {
          id: tab.artifactId,
          type: 'Capability'
        };
        this.capabilityService.setDraftRecord(tab);
        this.showCapability = true;
        this.showHome = false;
        this.showForm = false;
      } else if (this.status === 'Pending') {
        this.selectedCapabilityId = {
          id: tab.artifactId,
          type: 'Capability'
        };
        this.capabilityService.setDraftRecord(tab);
        this.showForm = false;
        this.showCapability = true;
        this.showHome = false;
      }
    }
  }
  public confirmTabSwitch(data: TabDirective): void {
    this.tabHeading = data.heading;
  }
  public back(): void {
    this.route.navigate(['/landing']);
  }
  public ngOnInit(): void {
    this.spinner.startBrowse();
    this.searchService.searchView.subscribe((value) => {
      this.capabilitiesList = [];
      this.showCapability = false;
      this.tenantId = '';
      if (value) {
        this.showHome = false;
        this.status = 'Approved';
        this.tenantId = value['tenantId'];
        this.getCapabilityListByStatus('Approved');
        this.loadData(value);
        this.clicked = true;
      } else {
        if (JSON.parse(sessionStorage.getItem('menu')).roleName) {
          this.capabilityService.detailsUser.subscribe((value) => {
            this.capabilitiesList = [];
            this.showCapability = false;
            this.tenantId = '';
            this.tenantId = JSON.parse(sessionStorage.getItem('menu')).tenantId;
            this.showCreateButton = JSON.parse(sessionStorage.getItem('menu')).roleName;
            this.showHome = false;
            this.loadData('home');
            this.getCapabilityListByStatus('Approved');
          });
        }
      }
    });
    this.spinner.stopBrowse();
    this.titleForm = this.fb.group({
      pageTitle: ['', [Validators.required, Validators.maxLength(80)]],
      pageDescription: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+. *$')]],
      artifactType: ['', [Validators.required]],
      taskid: ['']
    });
    this.isSuperAdmin = this.loginService.getSuperAdmin();
  }
  public get titleFormControls() {
    return this.titleForm.controls;
  }
  public populateResourcesArray(): FormGroup {
    return new FormGroup({
      resourceName: new FormControl(''),
      linkLocation: new FormControl('')
    });
  }
  public closeResourcesAddBlock(): void {
    this.showResourcesAddBlock = false;
  }
  public onStatusChange(event): void {
    this.capabilitiesList = [];
    this.status = event;
    this.showHome = true;
    this.showCapability = false;
    this.showForm = false;
    this.getCapabilityListByStatus(this.status);
  }

  public getCapabilityListByStatus(status): void {
    this.capabilitiesList = [];
    this.capabilityService.getCapabilityByStatus(status, this.tenantId).pipe(takeUntil(this.onDestroy$))
      .subscribe(
        (res) => {
          if (res) {
            this.capabilitiesList = res;
          }
        },
        (err) => {
          setTimeout(() => { }, 1000);
        }
      );
  }

  public onkeyUp(e: KeyboardEvent): void {
    const val = this.titleForm.controls.taskId.value;
    if (e.key === 'Backspace' && !val) {
      this.pills.pop();
    }
    if (e.key === 'Enter' && val) {
      this.addPill(val);
      this.titleForm.controls.taskId.setValue(' ');
    }
  }
  public removePill(value: string): void {
    this.pills = this.pills.filter((x) => x !== value);
  }
  public addPill(value: string): void {
    if (!this.pills.find((x) => x === value)) {
      this.pills.push(value);
      this.titleForm.controls.taskid.setValue('');
    }
  }
  public changeValue(val: string): void {
    this.doSearch(val);
    this.titleForm.controls.taskid.setValue(val);
  }
  public doSearch(term: string): void {
    this.filteredlist = term && term.length > 1 ? this.list.filter((x) => x.includes(term)) : [];
  }
  public changeFocussed(state: boolean): void {
    setTimeout(() => (this.isFocussed = state), 200);
  }

  public refreshList(currentStatus): void {
    if (currentStatus === 'refreshPending') {
      this.status = 'Approved';
      this.getCapabilityListByStatus('Approved');
      this.loadData('home');
    } else if (currentStatus === 'refreshDraft') {
      this.status = 'Approved';
      this.getCapabilityListByStatus('Approved');
      this.loadData('home');
    } else if (currentStatus === 'Reset') {
      this.loadData('create');
    }
  }
  public cancel(): void {
    this.toggleSubmit = false;
    this.toggleSave = false;
    this.showForm = false;
    this.showCapability = true;
    this.showHome = false;
  }

  public ngonDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
