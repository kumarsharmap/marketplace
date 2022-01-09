import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ComponentServiceService } from 'src/app/component-service.service';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { CapabilitiesResourcesComponent } from 'src/app/features/capabilities/components/capabilities-resources/capabilities-resources.component';
import { CapabilitiesTechnicalSummaryComponent } from 'src/app/features/capabilities/components/capabilities-technical-summary/capabilities-technical-summary.component';
import { CapabilitiesUpdatesComponent } from 'src/app/features/capabilities/components/capabilities-updates/capabilities-updates.component';
import { CapabilitiesService } from 'src/app/features/capabilities/components/capabilities/capabilities.service';
import { ComponentCodeComponent } from '../component-code/component-code.component';
import { ComponentUsageComponent } from '../component-usage/component-usage.component';

@Component({
  selector: 'app-component-create',
  templateUrl: './component-create.component.html',
  styleUrls: ['./component-create.component.css']
})
export class ComponentCreateComponent implements OnInit {
  detailsSection: any;
  public techArray: CapabilitiesTechnicalSummaryComponent[];
  public titleErr = true;
  blockTitleFlag: boolean = true;
  errMsg: string;
  errFlagArr: any = [];
  titleErrFlag: any = [];
  constructor(private loginService: LoginService,
    private toastNotificationService: ToastNotificationService,
    public formBuilder: FormBuilder,
    private router: Router,
    public capabilityService: CapabilitiesService,
    public componentServ: ComponentServiceService
  ) { this.navigationUrl = this.router.url; }
  @Input('data') inputDetails;
  @Input('artifactCategory') artifactCategory;
  @Output() sendData = new EventEmitter<String>();
  @ViewChildren('tabset') public tabset: QueryList<TabsetComponent>;
  @ViewChildren('resourcesTab') public resourcesTab: QueryList<CapabilitiesResourcesComponent>;
  @ViewChildren('updatesTab') public updatesTab: QueryList<CapabilitiesUpdatesComponent>;
  @ViewChildren('code') public code: QueryList<ComponentCodeComponent>;
  @ViewChildren('usage') public usage: QueryList<ComponentUsageComponent>;
  @ViewChildren('technicalSummaryTab') public technicalSummaryTab: QueryList<CapabilitiesTechnicalSummaryComponent>;
  public componentForm: FormGroup;
  public headings = [];
  public pills: string[] = [];
  public value: string;
  public isFocussed: boolean;
  public list: string[] = ['hallo', 'bye', 'all', 'farout'];
  public filteredList: string[];
  public toggleSubmit: boolean;
  public toggleSave: boolean;
  public toggleBack: boolean;
  public toggleReset: boolean;
  public toggleCancel: boolean;
  public showTabs = false;
  public navigationUrl: string;
  public id = 0;
  public status = '';
  public tabHeading = 'Example';
  public responseJson: any = {};
  public groups = [];

  public ngOnInit(): void {
    this.componentForm = this.formBuilder.group({
      pageTitle: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      pageDescription: new FormControl('', [Validators.required]),
      artifactType: new FormControl('', [Validators.required]),
      taskId: new FormControl('')
    });
    this.addGroupItem();
    if (this.groups.length !== 0) {
      this.errFlagArr[this.groups.length - 1] = 't';
      this.titleErrFlag[this.groups.length - 1] = 't';
    }
    this.headings = [
      { tabTitle: 'Example' },
      { tabTitle: 'Code' },
      { tabTitle: 'Usage' },
      { tabTitle: 'Resource' },
      { tabTitle: 'Update' }
    ];
    if (this.inputDetails.type === 'Edit') {
      this.responseJson = this.inputDetails.details;
      for (let k = 0; k < this.responseJson.componentDetails.length; k++) {
        if (k !== 0) {
          this.addGroupItem();
        }
      }
    }
  }
  public setTaskId(e: KeyboardEvent): void {
    const val = this.componentForm.controls.taskId.value;
    if (e.key === 'Backspace' && !val) {
      this.pills.pop();
    }
    if (e.key === 'Enter' && val) {
      this.addPill(val);
      this.componentForm.controls.taskId.setValue(' ');
    }
  }
  public removePill(value: string): void {
    this.pills = this.pills.filter((x) => x !== value);
  }
  public addPill(value: string): void {
    if (!this.pills.find((x) => x === value)) {
      this.pills.push(value);
      this.componentForm.controls.taskId.setValue('');
    }
  }
  public ngAfterViewInit(): void {
    if (this.inputDetails.type === 'Edit') {
      this.responseJson = this.inputDetails.details;
      this.setValues();
    }
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
  public setValues(): void {
    this.pills = [];
    this.id = this.responseJson.artifactId;
    this.componentForm.get('pageTitle').setValue(this.responseJson.pageTitle);
    this.componentForm.get('pageDescription').setValue(this.responseJson.pageDescription);
    this.componentForm.get('artifactType').setValue(this.responseJson.artifactType);
    var newObject = JSON.parse(JSON.stringify(this.inputDetails.details));
    let tags = newObject.taskId;
    this.componentForm.get('taskId').setValue('');
    this.pills = tags;
    this.capabilityService.setDraftRecord(newObject.componentDetails);
    let techobjArray = this.technicalSummaryTab.toArray();
    let codeObjArray = this.code.toArray();
    let usageObjArray = this.usage.toArray();
    let updateObjArray = this.updatesTab.toArray();
    let resourceObjArray = this.resourcesTab.toArray();

    for (let k = 0; k < newObject.componentDetails.length; k++) {
      codeObjArray[k].setValues(newObject.componentDetails[k].code.richTextArray);
      usageObjArray[k].setValues(newObject.componentDetails[k].usage.richTextArray);
      resourceObjArray[k].unSetFormControls();
      resourceObjArray[k].setResources(newObject.componentDetails[k].resource.resources);
      updateObjArray[k].unSetFormControls();
      updateObjArray[k].setUpdates(newObject.componentDetails[k].update.updates);
      techobjArray[k].unSetFormControls();
      techobjArray[k].setPreviews(newObject.componentDetails[k].tech.previews);
      techobjArray[k].setRichText(newObject.componentDetails[k].tech.richTextBlock);
    }
  }
  public refresh(): void {
    this.toggleSubmit = false;
    this.toggleSave = false;
    this.toggleCancel = false;
    this.toggleBack = false;
    this.toggleReset = true;
    if (this.inputDetails.type === 'Edit') {
      this.sendData.emit('Reset');
    } else {
      this.componentForm.reset();
      this.groups.splice(0, this.groups.length);
      this.pills = [];
      this.addGroupItem();
    }
  }

  public selectTab(event, i): void {
    const data = { heading: 'Example' };
    this.confirmTabSwitch(data);
    const tabsArray = this.tabset.toArray();
    tabsArray[i].tabs[0].active = true;
  }
  public gotoHome(): void {
    this.toggleBack = true;
    setTimeout(() => {
      this.toggleBack = false;
    }, 200);
    this.router.navigateByUrl('/landing');
  }
  public createComponent(btnAction): void {
    let model = {
      status: 'Draft',
      pageTitle: this.componentForm.controls.pageTitle.value,
      pageDescription: this.componentForm.controls.pageDescription.value,
      userName: sessionStorage.getItem('userName'),
      userId: JSON.parse(sessionStorage.getItem('userId')),
      tenantId: JSON.parse(sessionStorage.getItem('menu')).tenantId,
      artifactType: this.componentForm.controls.artifactType.value,
      taskId: this.pills,
      comments: [],
      componentDetails: []
    };
    let techobjArray = this.technicalSummaryTab.toArray();
    let codeObjArray = this.code.toArray();
    let usageObjArray = this.usage.toArray();
    let updateObjArray = this.updatesTab.toArray();
    let resourceObjArray = this.resourcesTab.toArray();

    for (let j = 0; j < this.groups.length; j++) {
      let componentObj = {
        tech: techobjArray[j].technicalSummaryForm.value,
        code: codeObjArray[j].form.value,
        usage: usageObjArray[j].form.value,
        update: updateObjArray[j].updatesForm.value,
        resource: resourceObjArray[j].resourcesForm.getRawValue()
      };
      model['componentDetails'].push(componentObj);
    }
    this.componentForm.markAllAsTouched();
    for (let p = 0; p < this.groups.length; p++) {
      techobjArray[p].technicalSummaryForm.markAllAsTouched();
    }
    for (let m = 0; m < this.groups.length; m++) {
      if (techobjArray[m].technicalSummaryForm.get('previews')['controls'][0]['controls'].blockTitle.value !== '') {
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
    if (this.inputDetails.type === 'Edit') {
      model['artifactId'] = this.responseJson.artifactId;
    } else {
      model['artifactId'] = 0;
    }

    if (this.id === 0) {
      const x = document.querySelectorAll('.ErrMessage');
      if (x.length > 0) {
        if (btnAction === 'save') {
          this.toggleSave = false;
        } else if (btnAction === 'submit') {
          this.toggleSubmit = false;
        }
        return;
      }
      if (this.componentForm.valid && this.blockTitleFlag) {
        for (let n = 0; n < this.groups.length; n++) {
          if (this.errFlagArr[n] == 'f') {
            return;
          }
        }
        this.componentServ.createComponent(model).subscribe(
          (res) => {
            this.toastNotificationService.showSuccess(
              btnAction === 'save' ? 'Data saved as draft' : 'Component submitted for approval'
            );
            this.toggleSubmit = false;
            this.toggleSave = false;
            this.sendData.emit('refreshMenu');
          },
          (error: HttpErrorResponse) => {
            this.toggleSubmit = false;
            this.toggleSave = false;
            this.toastNotificationService.showError(error.error.message);
          }
        );
      }
    } else {
      const y = document.querySelectorAll('.ErrMessage');
      if (y.length > 0) {
        if (btnAction === 'save') {
          this.toggleSave = false;
        } else if (btnAction === 'submit') {
          this.toggleSubmit = false;
        }
        return;
      }
      if (this.componentForm.valid && this.blockTitleFlag) {
        for (let n = 0; n < this.groups.length; n++) {
          if (this.errFlagArr[n] === 'f') {
            return;
          }
        }
        this.componentServ.updateComponent(model).subscribe(
          (res) => {
            this.toastNotificationService.showSuccess(
              btnAction === 'save' ? 'Data saved as draft' : 'Component submitted for approval'
            );
            this.toggleSave = false;
            this.toggleSubmit = false;
            if (!this.navigationUrl.includes('adminmenu')) {
              this.sendData.emit('refreshMenu');
            }
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
  public getPlaceholder(): string {
    if (this.pills.length === 0) {
      return 'Enter associated id eg-JIRA';
    } else {
      return '';
    }
  }

  public addGroupItem(): void {
    this.groups.push({
      title: 'Component New- ${this.groups.length + 1}'
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
      if (res === '' && this.errFlagArr[i] === 't') {
        return 'Component New';
      } else if (
        res !== '' &&
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
        return 'Component title is required';
      }
    } else {
      return 'Component New';
    }
  }
  public confirmTabSwitch(data): void {
    this.tabHeading = data.heading;
  }
}


