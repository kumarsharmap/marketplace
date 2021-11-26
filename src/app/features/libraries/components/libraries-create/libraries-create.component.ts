import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-libraries-create',
  templateUrl: './libraries-create.component.html',
  styleUrls: ['./libraries-create.component.css']
})
export class LibrariesCreateComponent implements OnInit, OnChanges {
  @Output() public refreshLibList = new EventEmitter<string>();
  @Output() public sendData = new EventEmitter<string>();
  @Input('data') public inputDetails;
  public librariesForm: FormGroup;
  public showUpdatesAddBlock = true;
  public selectedDraftRecord;
  public fileName = [];
  public showFooter = true;
  public showPreview = [];
  public removeImg = [];
  public removeZip = [];
  public imgUrl = [];
  public taskId = ['JIRA123', 'JIRA222'];
  public pills: string[] = [];
  public value: string;
  public isFocussed: boolean;
  public list: string[] = ['hallo', 'bye', 'all', 'farout'];
  public filteredList: string[];
  public id = 0;
  public imageName = [];
  public fileUrl = [];
  public selectedFile;
  public downloadlink;
  public selectedIndex = 0;
  public imgArray = [];
  public toggleSave: boolean;
  public toggleSubmit: boolean;
  public toggleBack: boolean;
  public toggleReset: boolean;
  public toggleCancel: boolean;
  public toggleUpload: boolean;
  public navigationUrl: string;
  filesAllowed: any;
  filesAllowedSrtring: any;
  constructor(
    private fb: FormBuilder,
    public libraryService: LibraryService,
    private loginService: LoginService,
    private toastNotificationService: ToastNotificationService,
    private route: Router,
    private spinner: SpinnerService
  ) {
    this.navigationUrl = this.route.url;
  }
  public ngOnInit(): void {
    this.showPreview.push('f');
    this.removeImg.push('f');
    this.removeZip.push('f');
    this.imgArray = [];
    this.librariesForm = this.fb.group({
      pageTitle: ['', [Validators.required, Validators.maxLength(80)]],
      pageDescription: ['', [Validators.required, Validators.maxLength(300)]],
      artifactType: ['', Validators.required],
      taskId: [''],
      libraries: new FormArray([this.populateLibrariesArray()])
    });
    if (this.inputDetails) {
      if (this.inputDetails.type === 'Edit') {
        this.viewDraft(this.inputDetails.details);
      }
    } else {
      this.librariesForm.reset();
    }
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
  public ngOnChanges(): void {
    this.imgArray = [];
    this.showPreview.push('f');
    this.removeImg.push('f');
    this.removeZip.push('f');
    this.librariesForm = this.fb.group({
      pageTitle: ['', [Validators.required, Validators.maxLength(80)]],
      pageDescription: ['', [Validators.required, Validators.maxLength(300)]],
      artifactType: ['', [Validators.required]],
      taskId: [''],
      libraries: new FormArray([this.populateLibrariesArray()])
    });
    if (this.inputDetails) {
      if (this.inputDetails.type === 'Edit') {
        this.viewDraft(this.inputDetails.details);
      } else {
        this.librariesForm.reset();
      }
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
  }
  public onkeyUp(e: KeyboardEvent): void {
    const val = this.librariesForm.controls.taskId.value;
    if (e.key === 'Backspace' && !val) {
      this.pills.pop();
    }
    if (e.key === 'Enter' && val) {
      this.addPill(val);
      this.librariesForm.controls.taskId.setValue('');
    }
  }
  public removePill(value: string): void {
    this.pills = this.pills.filter((x) => x !== value);
  }
  public addPill(value: string): void {
    if (!this.pills.find((x) => x === value)) {
      this.pills.push(value);
      this.librariesForm.controls.taskId.setValue('');
    }
  }
  public populateLibrariesArray(): FormGroup {
    this.showPreview[this.showPreview.length] = 'f';
    this.removeImg[this.removeImg.length] = 'f';
    this.removeZip[this.removeZip.length] = 'f';
    return new FormGroup({
      libraryName: new FormControl(''),
      libraryDesc: new FormControl('', Validators.maxLength(800)),
      previewImage: new FormControl(''),
      imageName: new FormControl(''),
      libraryFile: new FormControl(''),
      fileName: new FormControl(''),
      libImage: new FormControl(''),
      libFile: new FormControl('')
    });
  }
  get libraryFormControls() {
    return this.librariesForm.controls;
  }
  public library(): FormArray {
    return this.librariesForm.get('libraries') as FormArray;
  }
  public addLibraries(): void {
    const control = this.librariesForm.get('libraries') as FormArray;
    control.push(this.populateLibrariesArray());
  }

  public removeLibraries(i): void {
    const control = this.librariesForm.get('libraries') as FormArray;
    control.removeAt(i);
  }
  public librariesFormToModel(): void {
    const formData = this.librariesForm.getRawValue();
    return formData.updates;
  }
  public unSetFormControls(): void {
    this.librariesForm = this.fb.group({
      pageTitle: ['', [Validators.required, Validators.maxLength(80), Validators.pattern('[a-zA-Z] [a-zA-Z ]+[a-zA-Z]$')]],
      pageDescription: ['', [Validators.required, Validators.maxLength(300), Validators.pattern('[a-zA-Z0-9_]+. *$')]],
      artifactType: ['', [Validators.required]],
      taskId: ['', [Validators.required]],
      libraries: new FormArray([])
    });
  }
  public setLibraries(): void {
    if (this.library().length === 0) {
      this.fileName = [];
      this.fileUrl = [];
      this.imgUrl = [];
      this.imageName = [];
      this.showPreview = [];
      this.removeImg = [];
      this.removeZip = [];
    }
    this.selectedDraftRecord = this.libraryService.getDraftRecord();
    const control = this.librariesForm.controls.libraries as FormArray;
    this.selectedDraftRecord.libraries.forEach((x) => {
      control.push(
        this.fb.group({
          libraryName: x.libraryName,
          libraryDesc: x.libraryDesc,
          previewImage: x.previewImage,
          imageName: x.imageName,
          libraryFile: x.libraryFile,
          fileName: x.fileName,
          libImage: '',
          libFile: ''
        })
      );
      if (x.fileName) {
        this.fileName[this.library().length - 1] = x.fileName;
        this.fileUrl[this.library().length - 1] = x.libraryFile;
        this.removeZip[this.library().length - 1] = 't';
      } else {
        this.removeZip[this.library().length - 1] = 'f';
      }

      if (x.previewImage) {
        this.imgUrl[this.library().length - 1] = x.previewImage;
        this.imgArray[this.library().length - 1] = x.previewImage;
        this.imageName[this.library().length - 1] = x.imageName;
        this.showPreview[this.library().length - 1] = 't';
        this.removeImg[this.library().length - 1] = 't';
      } else {
        this.showPreview[this.library().length - 1] = 'f';
        this.removeImg[this.library().length - 1] = 'f';
      }
    });
  }
  public getIndex(index): void {
    this.selectedIndex = index;
  }
  public removeFile(index): void {
    this.fileName[index] = [];
    this.removeZip[index] = 'f';
  }
  public onImageChange(imgIndx, event): void {
    this.imageName[this.selectedIndex] = event.target.files[0].name;
    if (
      event.target.files[0].type === 'image/jpeg' ||
      event.target.files[0].type === 'image/jpg' ||
      event.target.files[0].type === 'image/png'
    ) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = () => {
        // called once readAsDataURL is completed
        this.imgUrl[this.selectedIndex] = reader.result;
        this.library().controls[this.library().length - 1]['controls']['previewImage'].setValue(
          this.imgUrl[this.selectedIndex]
        );
        this.library().controls[this.library().length - 1]['controls']['imageName'].setValue(
          this.imageName[this.selectedIndex]
        );
        this.showPreview[this.selectedIndex] = 't';
        this.removeImg[this.selectedIndex] = 't';
      };
    }
  }
  public viewDraft(selectedTab): void {
    this.librariesForm.reset();
    this.id = selectedTab.artifactId;
    this.libraryService.setDraftRecord(selectedTab);
    this.showFooter = true;
    this.unSetFormControls();
    this.librariesForm.get('pageTitle').setValue(selectedTab.pageTitle);
    this.librariesForm.get('pageDescription').setValue(selectedTab.pageDescription);
    this.librariesForm.get('artifactType').setValue(selectedTab.artifactType);
    this.librariesForm.controls.taskId.reset();
    const newObject = JSON.parse(JSON.stringify(selectedTab));
    const tags = newObject.taskId;
    this.librariesForm.get('taskId').setValue('');
    this.pills = tags;
    this.setLibraries();
  }
  public makerAction(btnAction): void {
    const model = Object.assign({}, this.librariesForm.getRawValue());
    model.status = 'Draft';
    model.artifactId = this.id;
    model.userName = sessionStorage.getItem('userName');
    model.userId = JSON.parse(sessionStorage.getItem('userId'));
    model.tenantId = JSON.parse(sessionStorage.getItem('menu')).tenantId;
    model.taskId = this.pills;
    if (btnAction === 'save') {
      model.status = 'Draft';
      this.toggleSave = true;
    } else if (btnAction === 'submit') {
      model.status = 'Pending';
      this.toggleSubmit = true;
    }
    this.librariesForm.markAllAsTouched();
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
      if (this.librariesForm.valid) {
        this.libraryService.makerAction(model).subscribe(
          (res) => {
            this.toastNotificationService.showSuccess(
              btnAction === 'save' ? 'Data saved as draft' : 'Library submitted for approval');
            this.toggleSubmit = false;
            this.toggleSave = false;
            this.refreshLibList.emit('refreshDraft');
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
      this.libraryService.makerUpdateAction(model).subscribe(
        (res) => {
          this.toastNotificationService.showSuccess(
            btnAction === 'save' ? 'Data saved as draft' : 'Library submitted for approval');
          this.toggleSave = false;
          this.toggleSubmit = false;
          if (!this.navigationUrl.includes('adminmenu')) {
            this.sendData.emit('refreshDraft');
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

  public resetForm(): void {
    this.toggleSubmit = false;
    this.toggleSave = false;
    this.toggleCancel = false;
    this.toggleBack = false;
    this.toggleReset = true;
    if (this.inputDetails?.type === 'Edit') {
      this.sendData.emit('Reset');
    } else {
      this.librariesForm.reset();
      this.showPreview = [];
      this.removeImg = [];
      this.removeZip = [];
      this.imgUrl = [];
      this.pills = [];
      this.imageName = [];
      this.fileUrl = [];
      this.imgArray = [];
      this.fileName = [];
    }
    setTimeout(() => (this.toggleReset = false), 200);
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
  public back(): void {
    this.toggleBack = true;
    setTimeout(() => {
      this.toggleBack = false;
    }, 200);
    this.route.navigate(['/landing']);
  }
  public onFileChange(event, libIndex): void {
    this.hideSpinner();
    delete this.imgArray[libIndex];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imgArray[libIndex] = reader.result;
          this.library().controls[libIndex]['controls']['previewImage'].setValue(this.imgArray[libIndex]);
          this.library().controls[libIndex]['controls']['imageName'].setValue(this.imageName[libIndex]);
        };
      }
    }
    if (event.target.files.length > 0) {
      this.imageName[libIndex] = event.target.files[0].name;
    } else {
      delete this.imageName[libIndex];
      delete this.imgArray[libIndex];
    }
  }
  public removeImage(index): void {
    this.library().controls[index]['controls']['libImage'].setValue(null);
    delete this.imageName[index];
    delete this.imgArray[index];
    this.library().controls[index]['controls']['previewImage'].reset();
    this.library().controls[index]['controls']['imageName'].reset();
  }
  public removeLibFile(index): void {
    this.library().controls[index]['controls']['libFile'].setValue(null);
    delete this.fileName[index];
    this.library().controls[index]['controls']['fileName'].reset();
  }
  public onlibFileChange(event, libIndex): void {
    this.hideSpinner();
    this.selectedFile = event.target.files[0] as File;
    delete this.fileName[libIndex];
    let extractedval = '';
    extractedval = this.selectedFile.name.split(':').pop();
    extractedval = '.' + extractedval;

    if (!this.filesAllowed.includes(extractedval) === true) {
      if (event.target.files && event.target.files[0]) {
        if (event.target.files && event.target.files.length) {
          this.fileName[libIndex] = event.target.files[0].name;
        }
        if (event.target.files.length > 0) {
          this.fileName[libIndex] = event.target.files[0].name;
        } else {
          delete this.fileName[libIndex];
        }
      }
    } else {
      this.toastNotificationService.showError('The file extension is blocked from being pushed into odyssey bitbucket, please upload valid file')
    }
  }

  public uploadzip(resIdx): void {
    this.toggleUpload = true;
    this.library().controls[resIdx]['controls']['libraryFile'].reset();
    setTimeout(() => (this.toggleUpload = false), 200);
    this.onUpload(resIdx);
  }
  public onUpload(index): void {
    if (this.selectedFile) {
      this.toggleUpload = true;
    } else {
      this.toggleUpload = false;
    }
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    const name = JSON.parse(sessionStorage.getItem('menu')).tenantName;
    const category = JSON.parse(sessionStorage.getItem('mainMenu')).artifactName;
    const url = 'uploadFileTOGIT/' + name + '/' + category;
    this.libraryService.uploadFilesToRepo(url, fd).subscribe(
      (res) => {
        this.fileName[index] = res[0];
        this.library().controls[index]['controls']['fileName'].setValue(res[0]);
        this.toastNotificationService.showSuccess('File Uploaded Successfully ');
        this.toggleUpload = false;
      },
      (error: HttpErrorResponse) => {
        throw new Error(error.error.message);
      }
    );
  }
  public showSpinner(): void {
    this.spinner.startBrowse();
  }
  public hideSpinner(): void {
    this.spinner.stopBrowse();
  }
}
