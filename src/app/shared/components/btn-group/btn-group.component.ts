
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
selector: 'app-btn-group',
templateUrl: './btn-group.component.html',
styleUrls: ['./btn-group.component.css']
})
export class BtnGroupComponent {
@Input() public isShowIcon: boolean = true;
@Input() public labelForCreate: string;
@Input() public labelForDelete: string;
@Output()
public clickCreate: EventEmitter<any> = new EventEmitter();
@Output() public clickdelete: EventEmitter<any> = new EventEmitter();

constructor() {}

public onclickCreateTenant(): void {
  this.clickCreate.emit();
}


public onDeleteTenant(): void {
this.clickdelete.emit();
}
}
