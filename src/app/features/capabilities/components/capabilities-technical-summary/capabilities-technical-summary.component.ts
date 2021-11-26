import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { capabilitiesData } from '../capabilities/capabilities.model';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CapabilitiesService } from '../capabilities/capabilities.service';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';

@Component({
  selector: 'app-capabilities-technical-summary',
  templateUrl: './capabilities-technical-summary.component.html',
  styleUrls: ['./capabilities-technical-summary.component.css']
})
export class CapabilitiesTechnicalSummaryComponent implements OnInit, OnChanges {
  @Input('artifactCategory') artifactCategory;
  public technicalSummaryForm: FormGroup;
  public showExamplesAddBlock: boolean = true;
  public fileName = [];
  public componentName = 'Bock';
  public showPreview = [];
  public imgUrl = [];
  public quillConfiguration = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ['link'],
      ['image']
    ],
  }
  public selectedDraftRecord: any;
  public removeImg: any = [];
  public selectedIndex: any;
  public artifactDetails: string;
  public artifactTitle: string;
  public artifactDesc: string;
  public artifactImage: string;
  public artifactTitlePlaceHolder: string;
  public artifactDescPlaceHolder: string;
  constructor(
    private fb: FormBuilder,
    public capabilitiesService: CapabilitiesService,
    public router: Router,
    private spinner: SpinnerService
  ) { }

  public ngOnInit(): void {
    this.showPreview.push('f');
    this.removeImg.push('f');
    this.technicalSummaryForm = this.fb.group({
      previews: new FormArray([this.populatePreviewsArray()]),
      richTextBlock: new FormArray([this.populateRichTextArray()])
    });
    if (this.router.url === '/Capabilities') {
      this.artifactDetails = 'Capability Details';
      this.artifactTitle = 'Capability Title';
      this.artifactDesc = 'Capability Description';
      this.artifactImage = 'Capability Image';
      this.artifactTitlePlaceHolder = 'Enter capability title eg-Position List';
      this.artifactDescPlaceHolder = 'Enter capability description and purpose';
    } else if (this.router.url === '/Components') {
      this.artifactDetails = 'Component Details';
      this.artifactTitle = 'Component Title';
      this.artifactDesc = 'Component Description';
      this.artifactImage = 'Component Image';
      this.artifactTitlePlaceHolder = 'Enter component title eg-Primary Button';
      this.artifactDescPlaceHolder = 'Enter component description and purpose';
    }
  }
  public ngOnChanges(): void {
      if (this.router.url === '/Capabilities' || this.artifactCategory.type == 'Capability') {
      this.artifactDetails = 'Capability Details';
      this.artifactTitle = 'Capability Title';
      this.artifactDesc = 'Capability Description';
      this.artifactImage = 'Capability Image';
      this.artifactTitlePlaceHolder = 'Enter capability title eg-Position List';
      this.artifactDescPlaceHolder = 'Enter capability description and purpose';
    } else if (this.router.url === '/Components' || this.artifactCategory.type == 'Component') {
      this.artifactDetails = 'Component Details';
      this.artifactTitle = 'Component Title';
      this.artifactDesc = 'Component Description';
      this.artifactImage = 'Component Image';
      this.artifactTitlePlaceHolder = 'Enter component title eg-Primary Button';
      this.artifactDescPlaceHolder = 'Enter component description and purpose';
    }
  }

  public examples(): FormArray {
    return this.technicalSummaryForm.get('previews') as FormArray;
  }
  public images(index: number): FormArray {
    return this.examples().at(index).get('previewImages') as FormArray;
  }
  public codes(index: number): FormArray {
    return this.examples().at(index).get('codeSection') as FormArray;
  }
  public richtxt(): FormArray {
    return this.technicalSummaryForm.get('richTextBlock') as FormArray;
  }
  public getFileName(i, imgIdx) {
    return this.images(i).controls[imgIdx]['controls']['fileName'].value;
  }
  public populatePreviewsArray(): FormGroup {
    return new FormGroup({
      blockTitle: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      summdescription: new FormControl('', Validators.maxLength(800)),
      previewImages: new FormArray([this.populatePreviwImagesArray()]),
      codeSection: new FormArray([this.populateCodeSectionArray()])
    });
  }
  public populatePreviwImagesArray(): FormGroup {
    this.showPreview[this.showPreview.length] = 'f';
    this.removeImg[this.removeImg.length] = 'f';
    return new FormGroup({
      previewImage: new FormControl(''),
      fileName: new FormControl(''),
      capImage: new FormControl('')
    });
  }
  public populateCodeSectionArray(): FormGroup {
    return new FormGroup({
      syntax: new FormControl(''),
      code: new FormControl('', Validators.maxLength(5000))
    });
  }
  public populateRichTextArray(): FormGroup {
    return new FormGroup({
      blockTitle: new FormControl('', Validators.maxLength(50)),
      richText: new FormControl('', Validators.maxLength(800))
    });
  }
  public setPreviews(obj): void {
    let control = <FormArray>this.technicalSummaryForm.controls.previews;
    obj.forEach((x) => {
      control.push(
        this.fb.group({
          blockTitle: x['blockTitle'],
          summdescription: x['summdescription'],
          previewImages: this.setPreviewImages(x['previewImages']),
          codeSection: this.setCodeSection(x['codeSection'])
        })
      );
    });
  }

  public setRichText(obj): void {
    let control = <FormArray>this.technicalSummaryForm.controls.richTextBlock;
    obj.forEach((x) => {
      control.push(
        this.fb.group({
          blockTitle: x['blockTitle'],
          richText: x['richText']
        })
      );
    });
  }
  public setPreviewImages(x) {
    let arr = new FormArray([]);
    x.forEach((y) => {
      arr.push(
        this.fb.group({
          previewImage: y['previewImage'],
          fileName: y['fileName'],
          capImage: ''
        })
      );
      if (y['previewImage']) {
        this.fileName[this.examples().length] = y['fileName'];
        this.imgUrl[this.examples().length] = y['previewImage'];
        this.showPreview[this.examples().length] = 't';
        this.removeImg[this.examples().length - 1] = 't';
      } else {
        this.showPreview[this.examples().length] = 'f';
        this.removeImg[this.examples().length - 1] = 'f';
      }
    });
    return arr;
  }
  public setCodeSection(x) {
    let arr = new FormArray([]);
    x.forEach((y) => {
      arr.push(
        this.fb.group({
          syntax: y['syntax'],
          code: y['code']
        })
      );
    });
    return arr;
  }
  public addPreviews(): void {
    let control = this.technicalSummaryForm.get('previews') as FormArray;
    control.push(this.populatePreviewsArray());
  }
  public addRichText(): void {
    let control = this.technicalSummaryForm.get('richTextBlock') as FormArray;
    control.push(this.populateRichTextArray());
  }
  public addCode(i): void {
    let control = this.examples().at(i).get('codeSection') as FormArray;
    control.push(this.populateCodeSectionArray());
  }
  public removePreviews(i): void {
    this.imgUrl = [];
    this.fileName = [];
    let control = this.technicalSummaryForm.get('previews') as FormArray;
    control.removeAt(i);
  }
  public removeCode(i, codeIdx): void {
    let control = this.examples().at(i).get('codeSection') as FormArray;
    control.removeAt(codeIdx);
  }
  public removeRichText(i): void {
    let control = this.technicalSummaryForm.get('richTextBlock') as FormArray;
    control.removeAt(i);
  }
  public closeExamplesAddBlock(): void {
    this.showExamplesAddBlock = false;
  }
  public examplesFormToModel() {
    let modelData = Object.assign({}, capabilitiesData.technicalSummaryDTO[0]);
    let formData = this.technicalSummaryForm.getRawValue();
    for (let key in formData) {
      if (modelData.hasOwnProperty(key)) modelData[key] = formData[key] || '';
    }
    return modelData;
  }
  public getIndex(index): void {
    this.selectedIndex = index;
  }
  public unSetFormControls(): void {
    this.technicalSummaryForm = this.fb.group({
      previews: new FormArray([]),
      richTextBlock: new FormArray([])
    });
  }
  public onFileChange(event, index): void {
    this.hideSpinner();
    delete this.imgUrl[index];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imgUrl[index] = reader.result;
          this.images(index).controls[0]['controls']['previewImage'].setValue(this.imgUrl[index]);
          this.images(index).controls[0]['controls']['fileName'].setValue(this.fileName[index]);
        };
      }
    }

    if (event.target.files.length > 0) {
      this.fileName[index] = event.target.files[0].name;
    } else {
      delete this.fileName[index];
      delete this.imgUrl[index];
    }
  }
  public removeImage(index): void {
    this.images(index).controls[0]['controls']['capImage'].setValue(null);
    delete this.fileName[index];
    delete this.imgUrl[index];
    this.images(index).controls[0]['controls']['previewImage'].reset();
    this.images(index).controls[0]['controls']['fileName'].reset();
  }
  public setcomponentName(name): void {
    this.componentName = name;
  }
  public showSpinner(): void {
    this.spinner.startBrowse();
  }
  public hideSpinner(): void {
    this.spinner.stopBrowse();
  }
}
