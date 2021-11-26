import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { capabilitiesData } from '../capabilities/capabilities.model';
import { CapabilitiesService } from '../capabilities/capabilities.service';

@Component({
  selector: 'app-capabilities-updates',
  templateUrl: './capabilities-updates.component.html',
  styleUrls: ['./capabilities-updates.component.css']
})
export class CapabilitiesUpdatesComponent implements OnInit {
  public updatesForm: FormGroup;
  public showUpdatesAddBlock: boolean = true;
  public selectedDraftRecord;
  constructor(private fb: FormBuilder, public capabilityService: CapabilitiesService, public datePipe: DatePipe) { }

  public ngOnInit(): void {
    this.updatesForm = this.fb.group({
      updates: new FormArray([this.populateUpdatesArray()]),
    })
  }

  public populateUpdatesArray(): FormGroup {
    return new FormGroup({
      dateOfUpdate: new FormControl(this.datePipe.transform(Date.now(), 'mediumDate')),
      version: new FormControl(""),
      updateDescription: new FormControl("", Validators.maxLength(800)),
    });
  }

  public update(): FormArray {
    return this.updatesForm.get("updates") as FormArray
  }
  public addUpdates(): void {
    let control = this.updatesForm.get("updates") as FormArray;
    control.push(this.populateUpdatesArray());
  }

  public removeUpdates(i): void {
    let control = this.updatesForm.get("updates") as FormArray;
    control.removeAt(i);
  }

  public updatesFormToModel() {
    let modelData = Object.assign({}, capabilitiesData.updatesDTO[0]);
    let formData = this.updatesForm.getRawValue();
    for (let key in formData) {
      if (modelData.hasOwnProperty(key))
        modelData[key] = formData[key] || '';
    };
    return formData.updates;
  };
  public closeUpdatesAddBlock(): void {
    this.showUpdatesAddBlock = false;
  }
  public unSetFormControls(): void {
    this.updatesForm = this.fb.group({
      updates: new FormArray([]),
    })
  }
  public setUpdates(obj): void {
    let control = <FormArray>this.updatesForm.controls.updates;
    obj.forEach(x => {
      control.push(this.fb.group({
        dateOfUpdate: x['dateOfUpdate'],
        version: x['version'],
        updateDescription: x['updateDescription']
      }))
    })
  }

}
