import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-component-code',
  templateUrl: './component-code.component.html',
  styleUrls: ['./component-code.component.css']
})
export class ComponentCodeComponent implements OnInit {
  public form: FormGroup;
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
  constructor(public formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      richTextArray: new FormArray([this.createRichTextArray()])
    });
  }
  public createRichTextArray(): FormGroup {
    return this.formBuilder.group({
      blockTiitle: new FormControl(),
      richText: new FormControl()
    });
  }

  public setValues(obj): void {
    for (let i = 0; i < obj.length; i++) {
      let section = this.form.get('richTextArray') as FormArray;
      if (i > 0) {
        this.addRichText();
      }
      section['controls'][i]['controls']['blockTiitle'].setValue(obj[i].blockTiitle);
      section['controls'][i]['controls']['richText'].setValue(obj[i].richText);
    }
  }
  public deleteRichTextSection(index): void {
    let section = this.form.get('richTextArray') as FormArray;
    section.removeAt(index);
  }
  public addRichText(): void {
    let section = this.form.get('richTextArray') as FormArray;
    section.push(this.createRichTextArray());
  }
  public updatesFormToModel() {
    let section = this.form.get('richTextArray') as FormArray;
    let arry = [];
    for (let i = 0; i < section.length; i++) {
      arry.push({
        blockTitle: section['controls'][i]['controls']['blockTiitle'].value,
        richTextArray: section['controls'][i]['controls']['richText'].value
      })
    }
    return arry;
  }

}
