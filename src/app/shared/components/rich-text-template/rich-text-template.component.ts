import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { FoundationComponent } from 'src/app/features/foundation/components/foundation/foundation.component';
import { FoundationService } from 'src/app/features/foundation/components/services/foundation.service';
import { GuideServiceService } from 'src/app/features/guides/guide-service.service';
@Component({
    selector: 'app-rich-text-template',
    templateUrl: './rich-text-template.component.html',
    styleUrls: ['./rich-text-template.component.css']
})
export class RichTextTemplateComponent implements OnInit, OnChanges {
    @Input('data') inputDetails
    @Output() sendData = new EventEmitter<string>();
    public form: FormGroup;
    public imgArray = '';
    public nameMatch = false;
    public submitSuccess = false;
    public responseToBeViewed: any;
    public fileName = 'No file chosen';
    public pills: string[] = [];
    public value: string;
    public isFocussed: boolean;
    public list: string[] = ['hallo', 'bye', 'all', 'farout'];
    public filteredList: string[];
    public editorStyle = {
        'font-family': 'Inter',
        'min-height': '150px'
    };
    public quillConfiguration = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            ['link'],
            ['image']
        ]
    };
    public imgSrc: any;
    public listApproved = [];
    public sortList: any
    public colorPaletteSection: FormArray;
    public hexFormatCheck: boolean;
    public colorPaletteitems: FormArray;
    public toggleSave: boolean;
    public toggleSubmit: boolean;
    public toggleBack: boolean;
    public toggleCancel: boolean;
    public toggleReset: boolean;
    public validRGB = false;
    public navigationUrl: string;
    public imageObject = [];
    constructor(
        public foundationComponent: FoundationComponent,
        public formBuilder: FormBuilder,
        private router: Router,
        public loginService: LoginService,
        public foundationServ: FoundationService,
        public toastNotificationService: ToastNotificationService,
        public guideServiceService: GuideServiceService,
        private spinner: SpinnerService
    ) {
        this.navigationUrl = this.router.url;
    }
    public ngOnInit(): void {
        this.toggleSave = false;
        this.toggleSubmit = false;
        this.form = this.formBuilder.group({
            pageTitle: new FormControl('', [Validators.required, Validators.maxLength(80)]),
            pageDescription: new FormControl('', [Validators.required]),
            artifactType: new FormControl('', [Validators.required]),
            taskId: new FormControl(''),
            image: new FormControl(''),
            richTextArray: new FormArray([this.createRichTextArray()]),
            colorSection: this.formBuilder.array([this.createColorPaletteSection()])
        });
        this.deleteColorPaletteSection(0);
        this.pills = [];
        this.form.get('image').setValue(null);
        this.fileName = 'No file chosen';
        this.imgArray = '';
        this.form.clearValidators();
        this.form.reset();
        if (this.inputDetails.type === 'Edit') {
            this.responseToBeViewed = this.inputDetails.details;
            this.setValueForm();
        } else {
            this.form.reset();
        }
    }
    public ngOnChanges(): void {
        this.toggleSave = false;
        this.toggleSubmit = false;
        this.form = this.formBuilder.group({
            pageTitle: new FormControl('', [Validators.required, Validators.maxLength(80)]),
            pageDescription: new FormControl('', [Validators.required]),
            artifactType: new FormControl('', [Validators.required]),
            taskId: new FormControl(''),
            image: new FormControl(''),
            richTextArray: new FormArray([this.createRichTextArray()]),
            colorSection: this.formBuilder.array([this.createColorPaletteSection()])
        });
        this.deleteColorPaletteSection(0);
        this.pills = [];
        this.form.get('image').setValue(null);
        this.fileName = 'No file chosen';
        this.imgArray ='';
        this.form.clearValidators();
        this.form.reset();
        if (this.inputDetails.type === 'Edit') {
            this.responseToBeViewed = this.inputDetails.details;
            this.setValueForm();
        }
    }
    public createColorPaletteSection(): FormGroup {
        return this.formBuilder.group({
            title: new FormControl(null),
            description: new FormControl(null),
            items: this.formBuilder.array([this.createItem()])
        });
    }
    public createItem(): FormGroup {
        return this.formBuilder.group({
            colourName: new FormControl('', [Validators.required]),
            hexaValue: new FormControl('', [Validators.required, this.hexValidator]),
            rgbValue: new FormControl('', [Validators.required, this.rgbValidator])
        });
    }
    public setValueForm(): void {
        this.form.get('pageTitle').setValue(this.responseToBeViewed.pageTitle);
        this.form.get('pageDescription').setValue(this.responseToBeViewed.pageDescription);
        this.form.get('artifactType').setValue(this.responseToBeViewed.artifactType);
        var newObject = JSON.parse(JSON.stringify(this.inputDetails.details));
        let tags = newObject.taskId;
        this.form.get('taskId').setValue('');
        this.pills = tags;
        // this.fileName = this.responseToBeViewed.image.name;
        // this.imgArray = this.responseToBeViewed.image.imageUrl;
        // this.imgSrc = this.responseToBeViewed.image.imageUrl;
        // this.imgSrc = this.imgSrc.replace('""', "''");
        this.imageObject = this.responseToBeViewed.image;
        for (let k = 0; k < this.responseToBeViewed.richTextArray.length; k++) {
            if (k !== 0) {
                this.addRichText();
            }
            const richTextArray = this.form.get('richTextArray') as FormArray;
            (richTextArray.controls[k] as FormGroup).controls.richText.setValue(
                this.responseToBeViewed.richTextArray[k].richText
            );
        }
        if (this.inputDetails.foundationArtifactType !== 'Guides') {
            for (let i = 0; i < this.responseToBeViewed.colorSection.length; i++) {
                this.colorPaletteSection = this.form.get('colorSection') as FormArray;
                this.addColorPaletteSection();
                (this.colorPaletteSection.controls[i] as FormGroup).controls.title.setValue(
                    this.responseToBeViewed.colorSection[i].title
                );
                (this.colorPaletteSection.controls[i] as FormGroup).controls.description.setValue(
                    this.responseToBeViewed.colorSection[i].description
                );
                for (let j = 0; j < this.responseToBeViewed.colorSection[i].items.length; j++) {
                    if (j !== 0) {
                        this.addItem(i);
                    }
                    this.colorPaletteSection = this.form.get('colorSection') as FormArray;
                    this.colorPaletteitems = this.colorPaletteSection.at(i).get('items') as FormArray,
                        (this.colorPaletteitems.controls[j] as FormGroup).controls.colourName.setValue(
                            this.responseToBeViewed.colorSection[i].items(j).colourName
                        );
                    (this.colorPaletteitems.controls[j] as FormGroup).controls.hexaValue.setValue(
                        this.responseToBeViewed.colorSection[i].items[j].hexaValue
                    );
                    (this.colorPaletteitems.controls[j] as FormGroup).controls.rgbValue.setValue(
                        this.responseToBeViewed.colorSection[i].items[j].rgbValue
                    );
                }
            }
        }
    }
    public formSubmit(): void {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            this.toggleSubmit = true;
            const img = {
                imageUrl: this.imgArray,
                name: this.fileName
            };
            let colorSec = [];
            let colorItem = [];
            if (this.form.value.colorSection.length > 0) {
                for (let i = 0; i < this.form.value.colorSection.length; i++) {
                    for (let j = 0; j < this.form.value.colorSection[i].items.length; j++) {
                        if (
                            this.form.value.colorSection[i].items[j].colourName != null ||
                            this.form.value.colorSection[i].items[j].hexaValue != null ||
                            this.form.value.colorSection[i].items[j].rgbValue != null
                        ) {
                            colorItem.push({
                                colourName: this.form.value.colorSection[i].items[j].colourName,
                                hexaValue: this.form.value.colorSection[i].items[j].hexaValue,
                                rgbValue: this.form.value.colorSection[i].items[j].rgbValue
                            });
                        }
                    }
                    colorSec.push({
                        title: this.form.value.colorSection[i].title,
                        description: this.form.value.colorSection[i].description,
                        items: colorItem
                    });
                    colorItem = [];
                }
            } else {
                colorSec = [];
            }
            let obj = {};
            if (this.inputDetails.type === 'Edit') {
                obj = {
                    artifactType: this.form.value.artifactType,
                    taskId: this.pills,
                    status: 'Pending',
                    image: this.imageObject,
                    /*image: {
                        image: this.imageObject
                    },*/
                    tenantId: JSON.parse(sessionStorage.getItem('menu')).tenantId,
                    userName: sessionStorage.getItem("userName"),
                    userId: JSON.parse(sessionStorage.getItem('userId')),
                    pageDescription: this.form.value.pageDescription,
                    pageTitle: this.form.value.pageTitle,
                    version: this.inputDetails.details.version,
                    richTextArray: this.form.value.richTextArray,
                    artifactId: this.inputDetails.details.artifactId,

                    tenantName:JSON.parse(sessionStorage.getItem('menu')).tenantName

                };
                if (this.inputDetails.foundationArtifactType !== 'Guides') {
                    obj['colorSection'] = colorSec;
                }
                if (this.inputDetails.foundationArtifactType === 'Guides') {
                    this.updateGuideArtifact(obj, 'submit');
                } else {
                    this.updateFoundationArtifact(obj, 'submit');
                }
            } else {
                obj = {
                    artifactId: 0,
                    artifactType: this.form.value.artifactType,
                    taskId: this.pills,
                    status: 'Pending',
                    image: this.imageObject,
                    /*
                    image: {
                        image: this.imageObject
                    }, */

                    tenantId: JSON.parse(sessionStorage.getItem('menu')).tenantId,
                    userName: sessionStorage.getItem('userName'),
                     userId: JSON.parse(sessionStorage.getItem("userId")),
                    pageDescription: this.form.value.pageDescription,
                    pageTitle: this.form.value.pageTitle,
                    version: 0,
                    richTextArray: this.form.value.richTextArray
                };
                if (this.inputDetails.foundationArtifactType !== 'Guides') {
                    obj['colorSection'] = colorSec;
                }
                if (this.inputDetails.foundationArtifactType === 'Guides') {
                    this.createGuideArtifact(obj, 'submit');
                } else {
                    this.createFoundationArtifact(obj, 'submit');
                }
            }
        }
    }
    public createRichTextArray(): FormGroup {
        return this.formBuilder.group({
            richText: new FormControl('')
        });
    }
    public deleteRichTextSection(index): void {
        const section = this.form.get('richTextArray') as FormArray;
        section.removeAt(index);
    }
    public addRichText(): void {
        const seciton = this.form.get('richTextArray') as FormArray;
        seciton.push(this.createRichTextArray());
    }
    public onFileChange(event): void {
        this.hideSpinner();
        this.imgArray ='';
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            if (event.target.files && event.target.files.length) {
                const [file] = event.target.files;
                reader.readAsDataURL(file);
                reader.onload = () => {
                    this.imgArray = reader.result as string;
                    this.fileName = event.target.files[0].name;
                    console.log("1------", typeof(this.imgArray));
                    console.log("2-----------",typeof(this.fileName));
                    

                    const temp = JSON.parse(JSON.stringify({
                        imageURL: this.imgArray,
                        thumbImage: this.imgArray,
                        title: this.fileName
                        }));
                    this.imageObject.push(temp);
                };
            }
        }
        if (event.target.files.length > 0) {
            this.fileName = event.target.files[0].name;
        } else {
            this.fileName = 'No file chosen';
            this.imgArray = '';
        }
    }
    public removeImage(): void {
        this.form.get('image').setValue(null);
        this.fileName = 'No file chosen';
        this.imgArray = '';
    }
    public refreshForm(): void {
        this.toggleSubmit = false;
        this.toggleSave = false;
        this.toggleCancel = false;
        this.toggleBack = false;
        this.toggleReset = true;
        if (this.inputDetails.foundationArtifactType !== 'Foundation' && this.inputDetails.type === 'Edit') {
            this.sendData.emit('Reset');
        } else if (this.inputDetails.foundationArtifactType === 'Foundation' && this.inputDetails.type === 'Edit') {
            this.sendData.emit('Reset');
        } else if (this.inputDetails.foundationArtifactType === 'Foundation' && this.inputDetails.type !== 'Edit') {
            this.foundationComponent.loadOthers();
        } else if (this.inputDetails.foundationArtifactType !== 'Foundation' && this.inputDetails.type !== 'Edit') {
            this.sendData.emit('Reset');
        }
        setTimeout(() => (this.toggleReset = false), 200);
    }
    public saveForm(): void {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            this.toggleSave = true;
            const img = {
                imageUrl: this.imgArray,
                name: this.fileName
            };
            let colorSec = [];
            let colorItem = [];
            if (this.form.value.colorSection.length > 0) {
                for (let i = 0; i < this.form.value.colorSection.length; i++) {
                    for (let j = 0; j < this.form.value.colorSection[i].items.length; j++) {
                        if (
                            this.form.value.colorSection[i].items[j].colourName != null ||
                            this.form.value.colorSection[i].items[j].hexaValue != null ||
                            this.form.value.colorSection[i].items[j].rgbValue != null
                        ) {
                            colorItem.push({
                                colourName: this.form.value.colorSection[i].items[j].colourName,
                                hexaValue: this.form.value.colorSection[i].items[j].hexaValue,
                                rgbValue: this.form.value.colorSection[i].items[j].rgbValue
                            });
                        }
                    }
                    colorSec.push({
                        title: this.form.value.colorSection[i].title,
                        description: this.form.value.colorSection[i].description,
                        items: colorItem
                    });
                    colorItem = [];
                }
            } else {
                colorSec = [];
            }
            let obj = {};
            if (this.inputDetails.type === 'Edit') {
                obj = {
                    artifactId: this.inputDetails.details.artifactId,
                    artifactType: this.form.value.artifactType,
                    taskId: this.pills,
                    version: this.inputDetails.details.version,
                    status: 'Draft',
                    image: this.imageObject,
                   /* image: {
                        image: this.imageObject
                    },*/

                    tenantId: JSON.parse(sessionStorage.getItem('menu')).tenantId,
                    userName: sessionStorage.getItem('userName'),
                    userId: JSON.parse(sessionStorage.getItem('userId')),
                    pageDescription: this.form.value.pageDescription,
                    pageTitle: this.form.value.pageTitle,
                    richTextArray: this.form.value.richTextArray
                };
                if (this.inputDetails.foundationArtifactType !== 'Guides') {
                    obj['colorSection'] = colorSec;
                }
                if (this.inputDetails.foundationArtifactType === 'Guides') {
                    this.updateGuideArtifact(obj, 'save');
                } else {
                    this.updateFoundationArtifact(obj, 'save');
                }
            }
            else {

                
             /*   obj = {
                    artifactId: 0,
                    artifactType: this.form.value.artifactType,
                    taskId: this.pills,
                    version: 0,
                    status: 'Draft',
                    image: this.imageObject,
                    tenantId: JSON.parse(sessionStorage.getItem('menu')).tenantId,
                    userName: sessionStorage.getItem('userName'),
                    userId: JSON.parse(sessionStorage.getItem('userId')),
                    pageDescription: this.form.value.pageDescription,
                    pageTitle: this.form.value.pageTitle,
                    richTextArray: this.form.value.richTextArray
                };
                */
                
                obj = JSON.parse(JSON.stringify({
                    artifactId: 0,
                    artifactType: this.form.value.artifactType,
                    taskId: this.pills,
                    version: 0,
                    status: 'Draft',
                   image: this.imageObject,
/*
                   image: {
                    image: this.imageObject
                }, */
                    tenantId: JSON.parse(sessionStorage.getItem('menu')).tenantId,
                    userName: sessionStorage.getItem('userName'),
                    userId: JSON.parse(sessionStorage.getItem('userId')),
                    pageDescription: this.form.value.pageDescription,
                    pageTitle: this.form.value.pageTitle,
                    richTextArray: this.form.value.richTextArray
                }));
                console.log("JSON DEsign Foundation-------",obj);
                console.log('richText', this.form.value.richTextArray);
                if (this.inputDetails.foundationArtifactType !== 'Guides') {
                    obj['colorSection'] = colorSec;
                }
                if (this.inputDetails.foundationArtifactType === 'Guides') {
                    this.createGuideArtifact(obj, 'save');
                } else {
                    this.createFoundationArtifact(obj, 'save');
                }
            }
        }
    }
    public gotoHome(): void {
        this.toggleBack = true;
        setTimeout(() => {
            this.toggleBack = false;
        }, 209);
        this.router.navigateByUrl('/landing');
    }
    public cancel(): void {
        if (this.inputDetails.foundationArtifactType = 'Guides') {
            this.toggleSave = false;
            this.toggleSubmit = false;
            this.toggleReset = false;
            this.toggleBack = false;
            this.toggleCancel = true;
            setTimeout(() => {
                this.sendData.emit('Cancel');
                this.toggleCancel = false;
            }, 200);
        } else {
            this.toggleSave = false;
            this.toggleSubmit = false;
            this.toggleReset = false;
            this.toggleBack = false;
            this.toggleCancel = true;
            setTimeout(() => {
                this.sendData.emit('guideExit');
                this.toggleCancel = false;
            }, 200);
        }
    }
    public onkeyUp(e: KeyboardEvent): void {
        const val = this.form.controls.taskId.value;
        if (e.key === 'Backspace' && !val) {
            this.pills.pop();
        }
        if (e.key === 'Enter' && val) {
            this.addPill(val);
            this.form.controls.taskId.setValue('');
        }
    }
    public removePill(value: string): void {
        this.pills = this.pills.filter((x) => x !== value);
    }
    public addPill(value: string): void {
        if (!this.pills.find((x) => x === value)) {
            this.pills.push(value);
            this.form.controls.taskId.setValue('');
        }
    }
    public addItem(index): void {
        this.colorPaletteSection = this.form.get('colorSection') as FormArray;
        this.colorPaletteitems = this.colorPaletteSection.at(index).get('items') as FormArray;
        this.colorPaletteitems.push(this.createItem());
    }
    public addColorPaletteSection(): void {
        this.colorPaletteSection = this.form.get('colorSection') as FormArray;
        this.colorPaletteSection.push(this.createColorPaletteSection());
    }
    public deleteColorPaletteSection(index): void {
        const section = this.form.get('colorSection') as FormArray;
        section.removeAt(index);
    }
    public deleteColorPaletteItem(j, i): void {
        const section = this.form.get('colorSection') as FormArray;
        const item = this.colorPaletteSection.at(j).get("items") as FormArray;
        item.removeAt(i);
    }
    public hexToRgb(j, i): void {
        const section = this.form.get('colorSection') as FormArray;
        const item = section.at(j).get('items') as FormArray;
        const hex = item.value[i].hexaValue;
        let testInp;
        if (hex !== null) {
            testInp = hex.substring(1);
        }
        const check = typeof testInp === 'string' && testInp.length == 6 && !isNaN(Number('0x' + testInp));
        if (check === true) {
            this.hexFormatCheck = false;
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            const r = parseInt(result[1], 16);
            const g = parseInt(result[2], 16);
            const b = parseInt(result[3], 16);
            parseInt(result[3], 16);
            const res = '(' + r + ',' + g + ',' + b + ')';
            (item.controls[i] as FormGroup).controls.rgbValue.setValue(res);
        } else {
            (item.controls[i] as FormGroup).controls.rgbValue.setValue(' ');
            this.hexFormatCheck = true;
        }
    }

    public rgbToHex(j, k): void {
        let section = this.form.get('colorSection') as FormArray;
        let item = section.at(j).get('items') as FormArray;
        let rgb = item.value[k].rgbValue;
        rgb = rgb.substring(1);
        const newString = rgb.substring(0, rgb.length - 1);
        let elem: any = newString.split(',');
        for (let i = 0; i < elem.length; i++) {
            elem[i] = parseInt(elem[i]);
            if (elem[i] >= 0 && elem[i] <= 255) {
                this.validRGB = true;
            } else {
                this.validRGB = false;
                break;
            }
        }
        let r = elem[0];
        let g = elem[1];
        let b = elem[2]
        if (
            this.validRGB === true &&
            item.value[k].rgbValue.startsWith('(') === true &&
            item.value[k].rgbValue.endsWith(')') === true
        ) {
            item['controls'][k]['controls'].hexaValue.setValue(
                '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
            );
        } else {
            item['controls'][k]['controls'].hexaValue.setValue(' ');
        }
    }

    public rgbValidator(control: AbstractControl): object | null {
        let rgb = control.value;
        if (rgb.startsWith('(') === true) {
            rgb = rgb.substring(1);
        }
        let newString = rgb;
        if (rgb.endsWith(')') === true) {
            newString = rgb.substring(0, rgb.length - 1);
        }
        let elem: any = newString.split(',');
        for (let i = 0; i < elem.length; i++) {
            elem[i] = parseInt(elem[i]);
            if (control.value.length > 0) {
                if (
                    elem[0] >= 0 &&
                    elem[0] <= 255 &&
                    elem[1] >= 0 &&
                    elem[1] <= 255 &&
                    elem[2] >= 0 &&
                    elem[2] <= 255 &&
                    control.value.startsWith('(') === true &&
                    control.value.endsWith(')') === true
                ) {
                    return null;
                } else {
                    return { invalidRgb: true };
                }
            }
        }
    }
    public hexValidator(control: AbstractControl): object | null {
        const hex = control.value;
        let testInp: any;
        if (hex !== null) {
            testInp = hex.substring(1);
        }
        const check = typeof testInp === 'string' && testInp.length == 6 && !isNaN(Number('0x' + testInp));
        if (check !== true && hex.length > 0) {
            return { invalidHex: true };
        } else {
            return null;
        }
    }
    public createFoundationArtifact(obj, type) {
        this.foundationServ.othersFoundationFormSubmit(obj).subscribe(
            (response) => {
                if (type === 'submit') {
                    this.toastNotificationService.showSuccess('Submitted successfully');
                    this.toggleSubmit = false;
                } else {
                    this.toastNotificationService.showSuccess('Saved in drafts successfully');
                    this.toggleSave = false;
                }
                this.submitSuccess = true;
                this.form.disable();
                this.foundationComponent.handleRefresh('refreshMenuForSave');
            },
            (error: HttpErrorResponse) => {
                this.toggleSave = false;
                this.toggleSubmit = false;
                this.toastNotificationService.showError(error.error.message);
            }
        );
    }
    public updateFoundationArtifact(obj, type): void {
        this.foundationServ.updateFoundationForm(obj).subscribe(
            (response) => {
                if (type === 'submit') {
                    this.toastNotificationService.showSuccess('Submitted successfully');
                    this.toggleSubmit = false;
                } else {
                    this.toastNotificationService.showSuccess('Saved in drafts successfully');
                    this.toggleSave = false;
                }
                if (!this.navigationUrl.includes('adminmenu')) {
                    this.foundationComponent.handleRefresh('refreshMenuForSave');
                }
            },
            (error: HttpErrorResponse) => {
                this.toggleSubmit = false;
                this.toggleSave = false;
                this.toastNotificationService.showError(error.error.message);
            }
        );
    }
    public createGuideArtifact(obj, type): void {
        this.guideServiceService.guidesFormSubmit(obj).subscribe(
            (response) => {
                if (type === 'submit') {
                    this.toastNotificationService.showSuccess('Submitted successfully');
                    this.toggleSubmit = false;
                } else {
                    this.toastNotificationService.showSuccess('Saved in drafts successfully');
                    this.toggleSave = false;
                }
                this.sendData.emit('guidesCancel');
                this.submitSuccess = true;
            },
            (error: HttpErrorResponse) => {
                this.toggleSubmit = false;
                this.toggleSave = false;
                this.toastNotificationService.showError(error.error.message);
            }
        );
    }
    public updateGuideArtifact(obj, type): void {
        this.guideServiceService.updateGuidesForm(obj).subscribe(
            (response) => {
                if (!this.navigationUrl.includes('adminmenu')) {
                    this.sendData.emit('guidesCancel');
                }
                if (type === 'submit') {
                    this.toastNotificationService.showSuccess('Submitted successfully');
                    this.toggleSubmit = false;
                } else {
                    this.toastNotificationService.showSuccess('Saved in drafts successfully');
                    this.toggleSave = false;
                }
            },
            (error: HttpErrorResponse) => {
                this.toggleSubmit = false;
                this.toggleSave = false;
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
    public handleDeleteImage(i) {
        this.imageObject.splice(i, 1);
        }

}