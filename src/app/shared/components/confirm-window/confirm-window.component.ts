import {
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-window',
  templateUrl: './confirm-window.component.html',
  styleUrls: ['./confirm-window.component.css'],
})
export class ConfirmWindowComponent {
  @ViewChild('template') public templateref: TemplateRef<any>;
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() noDeleted: EventEmitter<any> = new EventEmitter();
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  openModal(): void {
    this.modalRef = this.modalService.show(this.templateref, {
      class: 'modal-sm',
    });
  }

  confirm(): void {
    this.deleted.emit();
    this.modalRef.hide();
  }

  decline(): void {
    this.noDeleted.emit();
    this.modalRef.hide();
  }
}
