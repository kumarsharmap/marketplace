import { Component, OnInit, ElementRef, EventEmitter, ViewChild, AfterViewInit, Output, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { capabilitiesData } from '../capabilities/capabilities.model';
import { CapabilitiesService } from '../capabilities/capabilities.service';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';

@Component({
  selector: 'app-capabilities-resources',
  templateUrl: './capabilities-resources.component.html',
  styleUrls: ['./capabilities-resources.component.css']
})
export class CapabilitiesResourcesComponent implements OnInit {
  public resourcesForm: FormGroup;
  public showResourcesAddBlock = true;
  public fileName = '';
  public selectedFile: File;
  public downloadLink = '#';
  public selectedDraftRecord;
  public myResIndx: any;
  public showUpload = true;
  public toggleUpload: boolean;
  filesAllowed: any;
  filesAllowedSrtring: any;
  constructor(
    private fb: FormBuilder,
    private capabilityService: CapabilitiesService,
    private toastNotificationService: ToastNotificationService,
    public loginService: LoginService,
    private spinner: SpinnerService
  ) { }
  public ngOnInit(): void {
    this.resourcesForm = this.fb.group({
      resources: new FormArray([this.populateResourcesArray()])
    });
    this.resource().controls[0]['controls']['linkLocation'].disable();
    this.loginService.getListofFilesAllowed().subscribe(
      (res) => {
        this.filesAllowed = res;
        this.filesAllowedSrtring = res.toString();
      },
      (error: HttpErrorResponse) => {
        this.toastNotificationService.showError(error.error.message);
      }
    );
  }
  public showSpinner(): void {
    this.spinner.startBrowse();
  }
  public hideSpinner(): void {
    this.spinner.stopBrowse();
  }
  public resource(): FormArray {
    return this.resourcesForm.get('resources') as FormArray;
  }
  public populateResourcesArray(): FormGroup {
    this.showUpload = true;
    return new FormGroup({
      resourceName: new FormControl('Artifactory'),
      linkLocation: new FormControl('')
    });
  }

  public addResources(): void {
    let control = this.resourcesForm.get('resources') as FormArray;
    control.push(this.populateResourcesArray());
    this.resource().controls[this.resource().length - 1]['controls']['linkLocation'].disable();
  }
  public removeResources(i): void {
    let control = this.resourcesForm.get('resources') as FormArray;
    control.removeAt(i);
  }
  public resourcesFormToModel() {
    let modelData = Object.assign({}, capabilitiesData.resourcesDTO[0]);
    let formData = this.resourcesForm.getRawValue();
    return formData.resources;
  }

  closeResourcesAddBlock() {
    this.showResourcesAddBlock = false;
  }
  setResources(obj) {
    //this.selectedDraftRecord =this.capabilityService.getDraftRecord();

    let control = this.resourcesForm.get('resources') as FormArray;
    obj.forEach((x) => {
      control.push(
        this.fb.group({
          resourceName: x['resourceName'],
          linkLocation: x['linkLocation']
        })
      );
    });
  }
  public resetLink(resIdx): void {
    this.myResIndx = resIdx;
    this.resource().controls[resIdx]['controls']['linkLocation'].reset();
    this.downloadLink = '#';
    if (this.resource().controls[resIdx]['controls']['resourceName'].value === 'Bitbucket' ||
      this.resource().controls[resIdx]['controls']['resourceName'].value === 'Artifactory') {
      this.showUpload = true;
      this.resource().controls[resIdx]['controls']['linkLocation'].disable();
    } else {
      this.showUpload = false;
      this.resource().controls[resIdx]['controls']['linkLocation'].enable();

    }
  }
  public toggle(): void {
    this.toggleUpload = true;
    setTimeout(() => (this.toggleUpload = false), 200);
  }
  public onFileSelected(event, index): void {
    this.hideSpinner();
    let extractedval = '';
    extractedval = event.target.files[0].name.split('.').pop();
    extractedval = '.' + extractedval;

    if (
      this.filesAllowed.includes(extractedval) !== true &&
      this.resource().controls[index]['controls']['resourceName'].value === 'Bitbucket'
    ) {
      if (event.target.files.length > 0) {
        this.toggleUpload = true;
      } else {
        this.toggleUpload = false;
      }
      this.selectedFile = <File>event.target.files[0];
      this.fileName = event.target.files[0].name;
      this.onUpload(this.myResIndx);
    } else if (this.resource().controls[index]['controls']['resourceName'].value === 'Artifactory') {
      if (event.target.files.length > 0) {
        this.toggleUpload = true;
      } else {
        this.toggleUpload = false;
      }
      this.selectedFile = <File>event.target.files[0];
      this.fileName = event.target.files[0].name;
      this.onUpload(this.myResIndx);
    } else {
      this.toastNotificationService.showError(
        'The file extension is blocked from being pushed into odyssey bitbucket, please upload valid file'
      );
    }
  }
  public onUpload(index): void {
    const fd = new FormData();
    this.resource().controls[index]['controls']['resourceName'].value === 'Bitbucket' ?
      fd.append('content', this.selectedFile, this.selectedFile.name) : fd.append('file', this.selectedFile, this.selectedFile.name)
    const name = JSON.parse(sessionStorage.getItem('menu')).tenantName;
    const category = JSON.parse(sessionStorage.getItem('mainMenu')).artifactName;
    let url =
      this.resource().controls[index]['controls']['resourceName'].value === 'Bitbucket'
        ? 'uploadToBitbucket'
        : 'uploadToArtifactory/' + name + '/' + category;
    this.capabilityService.uploadFilesToRepo(url, fd).subscribe(
      (res) => {
        this.resource().controls[index]['controls']['linkLocation'].disable();
        this.resource().controls[index]['controls']['linkLocation'].setValue(res[0]);
        this.downloadLink = res[0];
        this.toastNotificationService.showSuccess('File Uploaded Successfully');
        this.toggleUpload = false;
      },
      (error: HttpErrorResponse) => {
        throw error;
      }
    );
  }
  public unSetFormControls(): void {
    this.resourcesForm = this.fb.group({
      resources: new FormArray([])
    })
  }
}
