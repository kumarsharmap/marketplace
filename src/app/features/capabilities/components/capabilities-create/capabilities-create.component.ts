import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { SearchService } from 'src/app/features/search/sevices/search.service';
import { CapabilitiesResourcesComponent } from '../capabilities-resources/capabilities-resources.component';
import { CapabilitiesTechnicalSummaryComponent } from '../capabilities-technical-summary/capabilities-technical-summary.component';
import { CapabilitiesUpdatesComponent } from '../capabilities-updates/capabilities-updates.component';
import { CapabilitiesService } from '../capabilities/capabilities.service';

@Component({
  selector: 'app-capabilities-create',
  templateUrl: './capabilities-create.component.html',
  styleUrls: ['./capabilities-create.component.css']
})
export class CapabilitiesCreateComponent implements OnInit {
  @Input('data') inputDetails;
  @Input('artifactCategory') artifactCategory;
  @Output() sendData = new EventEmitter<String>();
  @Output() refreshCapList = new EventEmitter<string>();
  @ViewChildren('tabset') public tabset: QueryList<TabsetComponent>;
  @ViewChildren('resourcesTab') public resourcesTab: QueryList<CapabilitiesResourcesComponent>;
  @ViewChildren('updatesTab') public updatesTab: QueryList<CapabilitiesUpdatesComponent>;
  @ViewChildren('technicalSummaryTab') public technicalSummaryTab: QueryList<CapabilitiesTechnicalSummaryComponent>;
  public headings = [];
  public tabHeading = 'Technical Summary';
  toggleSave: boolean;
  toggleSubmit: boolean;
  toggleCancel: boolean;
  toggleReset: boolean;
  toggleBack: boolean;
  titleForm: FormGroup;
  id: any = 0;
  pills: string[] = [];
  value: string;
  public titleErr = true;
  blockTitleFlag: boolean = true;
  errmsg: string;
  isFocussed: boolean;
  errFlagArr: any = [];
  titleErrFlag: any = [];
  list: string[] = ['hallo', 'bye', 'all', 'farout'];
  filteredList: string[];
  navigationUrl: string;
  public groups = [];
  responseJson: any;
  constructor(
    public capabilityService: CapabilitiesService,
    private toastNotificationService: ToastNotificationService,
    private route: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private datePipe: DatePipe,
    private searchService: SearchService
  ) {
    this.headings = [{ tabTitle: 'Technical Summary' }, { tabTitle: 'Resources' }, { tabTitle: 'Updates' }];
    this.navigationUrl = this.route.url;
  }
  public ngOnInit(): void {
    this.titleForm = this.fb.group({
      pageTitle: ['', [Validators.required, Validators.maxLength(80)]],
      pageDescription: ['', [Validators.required, Validators.maxLength(300)]],
      artifactType: ['', [Validators.required]],
      taskId: ['']
    });
    this.addGroupItem();
    if (this.groups.length !== 0) {
      this.errFlagArr[this.groups.length - 1] = 't';
      this.titleErrFlag[this.groups.length - 1] = 't';
    }
  }
  public ngOnChanges(): void {
    this.titleForm = this.fb.group({
      pageTitle: ['', [Validators.required, Validators.maxLength(80)]],
      pageDescription: ['', [Validators.required, Validators.maxLength(300), Validators.pattern('[a-zA-Z0-9_]+. *$')]],
      artifactType: ['', [Validators.required]],
      taskid: ['']
    });
    if (this.inputDetails) {
      if (this.inputDetails.type === 'Edit') {
        for (let k = 0; k < this.inputDetails.details.capabilityDetails.length; k++) {
          if (k !== 0) {
            this.addGroupItem();
          }
        }
        this.responseJson = this.inputDetails.details;
        setTimeout(() => {
          this.editPage();
        }, 200);
      }
    } else {
      this.titleForm.reset();
    }
  }
  public ngAfterViewInit(): void {
    if (this.inputDetails) {
      if (this.inputDetails.type === 'Edit') {
        this.responseJson = this.inputDetails.details;
      }
    }
  }
  get titleFormControls() {
    return this.titleForm.controls;
  }
  public back(): void {
    this.toggleBack = true;
    setTimeout(() => {
      this.toggleBack = false;
    }, 200);
    this.route.navigate(['/landing']);
  }
  public cancel(): void {
    this.toggleSave = false;
    this.toggleSubmit = false;
    this.toggleReset = false;
    this.toggleBack = false;
    this.toggleCancel = true;
    setTimeout(() => {
      this.sendData.emit('Cancel');
      this.toggleCancel = false;
    }, 200);
  }
  public reset(): void {
    this.toggleSubmit = false;
    this.toggleSave = false;
    this.toggleCancel = false;
    this.toggleBack = false;
    this.toggleReset = true;
    if (this.inputDetails?.type === 'Edit') {
      this.sendData.emit('Reset');
    } else {
      this.groups.splice(0, this.groups.length);
      this.titleForm.reset();
      this.pills = [];
      this.addGroupItem();
    }
  }
  public addGroupItem(): void {
    this.groups.push({
      title: "Component New - ${this.groups.length + 1}"
    });
    if (this.groups.length !== 0) {
      this.errFlagArr[this.groups.length - 1] = 't';
      this.titleErrFlag[this.groups.length - 1] = 't';
    }
  }
  public removeGroup(index): void {
    this.groups.splice(index, 1);
    setTimeout(() => {
      this.errFlagArr.splice(index, 1);
      this.titleErrFlag.splice(index, 1);
    }, 10);
  }
  public fetchComponentName(i): string {
    let a = [];
    if (this.technicalSummaryTab) {
      a = this.technicalSummaryTab.toArray();
    }
    if (a.length > 0) {
      let res = a[i]?.technicalSummaryForm.value.previews[0].blockTitle;
      if (res === '' && this.errFlagArr[i] == 't') {
        return 'Capability New';
      } else if (
        res != '' &&
        a[i]?.technicalSummaryForm['controls']['previews']['controls'][0]['controls']['blockTitle'].valid
      ) {
        this.titleErr = true;
        this.blockTitleFlag = true;
        this.errFlagArr[i] = 't';
        this.titleErrFlag[i] = 't';
        return res;
      } else if (
        a[i]?.technicalSummaryForm['controls']['previews']['controls'][0]['controls']['blockTitle'].invalid &&
        this.errFlagArr[i] === 'f'
      ) {
        return 'Capability title is required';
      }
    } else {
      return 'Capability New';
    }
  }
  public editPage(): void {
    this.id = this.responseJson.artifactId;
    this.capabilityService.setDraftRecord(this.responseJson);
    this.titleForm.controls.pageTitle.setValue(this.responseJson.pageTitle);
    this.titleForm.controls.pageDescription.setValue(this.responseJson.pageDescription);
    this.titleForm.controls.artifactType.setValue(this.responseJson.artifactType);
    var newObject = JSON.parse(JSON.stringify(this.responseJson));
    let tags = newObject.taskId;
    this.titleForm.get('taskId').setValue('');
    this.pills = tags;
    let techObjArray = this.technicalSummaryTab.toArray();
    let updateObjArray = this.updatesTab.toArray();
    let resourceObjArray = this.resourcesTab.toArray();
    for (let k = 0; k < newObject.capabilityDetails.length; k++) {
      resourceObjArray[k].unSetFormControls();
      resourceObjArray[k].setResources(newObject.capabilityDetails[k].resource.resources);
      updateObjArray[k].unSetFormControls();
      updateObjArray[k].setUpdates(newObject.capabilityDetails[k].update.updates);
      techObjArray[k].unSetFormControls();
      techObjArray[k].setPreviews(newObject.capabilityDetails[k].tech.previews);
      techObjArray[k].setRichText(newObject.capabilityDetails[k].tech.richTextBlock);
    }
  }

  onkeyUp(e: KeyboardEvent): void {
    const val = this.titleForm.controls.taskId.value;
    if (e.key === 'Backspace' && !val) {
      this.pills.pop();
    }
    if (e.key === 'Enter' && val) {
      this.addPill(val);
      this.titleForm.controls.taskId.setValue('');
    }
  }
  removePill(value: string) {
    this.pills = this.pills.filter((x) => x !== value);
  }
  addPill(value: string) {
    if (!this.pills.find((x) => x === value)) {
      this.pills.push(value);
      this.titleForm.controls.taskId.setValue("");
    }
  }
  confirmTabSwitch(data): void {
    this.tabHeading = data.heading;
  }
  public selectTab(event, i): void {
    const data = { heading: 'Technical Summary' };
    this.confirmTabSwitch(data);
    const tabsArray = this.tabset.toArray();
    tabsArray[i].tabs[0].active = true;
  }
  makerAction(btnAction) {
    let model = {
      status: 'Draft',
      artifactId: this.id,
      pageTitle: this.titleForm.controls.pageTitle.value,
      pageDescription: this.titleForm.controls.pageDescription.value,
      userName: sessionStorage.getItem('userName'),
      userId: JSON.parse(sessionStorage.getItem('userId')),
      tenantId: JSON.parse(sessionStorage.getItem('menu')).tenantId,
      artifactType: this.titleForm.controls.artifactType.value,
      taskId: this.pills,
      version: 0,
      comments: [],
      capabilityDetails: [],
      tenantName: JSON.parse(sessionStorage.getItem('menu')).tenantName,
    };
    let techObjArray = this.technicalSummaryTab.toArray();
    let updateObjArray = this.updatesTab.toArray();
    let resourceObjArray = this.resourcesTab.toArray();
    for (let j = 0; j < this.groups.length; j++) {
      let componentObj = {
        tech: techObjArray[j].technicalSummaryForm.value,
        update: updateObjArray[j].updatesForm.value,
        resource: resourceObjArray[j].resourcesForm.getRawValue()
      };
      model['capabilityDetails'].push(componentObj);
    }
    for (let p = 0; p < this.groups.length; p++) {
      techObjArray[p].technicalSummaryForm.markAllAsTouched();
    }
    for (let m = 0; m < this.groups.length; m++) {
      if (techObjArray[m].technicalSummaryForm.get('previews')['controls'][0]['controls'].blockTitle.value !== "") {
        this.titleErr = true;
        this.blockTitleFlag = true;
        this.titleErrFlag[m] = 't';
        this.errFlagArr[m] = 't';
      } else {
        this.titleErr = false;
        this.blockTitleFlag = false;
        this.titleErrFlag[m] = 'f';
        this.errFlagArr[m] = 'f';
      }
      if (this.groups.length === 0) {
        this.titleErr = true;
        this.blockTitleFlag = true;
        this.titleErrFlag[0] = 't';
        this.errFlagArr[0] = 't';
      }

      if (btnAction === 'save') {
        model.status = 'Draft';
        this.toggleSave = true;
      } else if (btnAction === 'submit') {
        model.status = 'Pending';
        this.toggleSubmit = true;
      }
      this.titleForm.markAllAsTouched();
      if (this.id === 0) {
        // const x = document.querySelectorAll('.ErrMessage');
        // if (x.length > 0) {
        //   if (btnAction === 'save') {
        //     this.toggleSave = false;
        //   } else if (btnAction === 'submit') {
        //     this.toggleSubmit = false;
        //   }
        //   return;
        // }
        if (this.titleForm.valid && this.blockTitleFlag) {
          for (let n = 0; n < this.groups.length; n++) {
            if (this.errFlagArr[n] === 'f') {
              return;
            }
          }
          this.capabilityService.makerAction(model).subscribe(
            (res) => {
              this.toastNotificationService.showSuccess(
                btnAction === 'save' ? 'Data saved as draft' : 'Capability submitted for approval');
              this.toggleSubmit = false;
              this.toggleSave = false;
              this.refreshCapList.emit('refreshDraft');
            },
            (error: HttpErrorResponse) => {
              this.toggleSubmit = false;
              this.toggleSave = false;
              this.toastNotificationService.showError(error.error.message);
            }
          );
        }
      } else {
        // const y = document.querySelectorAll('. ErrMessage');
        // if (y.length > 0) {
        //   if (btnAction === 'save') {
        //     this.toggleSave = false;
        //   } else if (btnAction === 'submit') {
        //     this.toggleSubmit = false;
        //   }
        //   return;
        // }
        this.capabilityService.makerUpdateAction(model).subscribe(
          (res) => {
            this.toastNotificationService.showSuccess(
              btnAction === 'save' ? 'Data saved as draft' : 'Capability submitted for approval'
            );
            if (!this.navigationUrl.includes('adminmenu')) {
              this.sendData.emit('refreshDraft');
            }
            this.toggleSave = false;
            this.toggleSubmit = false;
          },
          (error: HttpErrorResponse) => {
            this.toggleSubmit = false;
            this.toggleSave = false;
            this.toastNotificationService.showError(error.error.message);
          }
        );
      }
    }
  }
}
