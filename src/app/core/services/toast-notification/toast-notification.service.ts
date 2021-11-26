import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastNotificationService {
  constructor(private toastr: ToastrService) {}

  public showSuccess(message) {
    this.toastr.success(message);
  }

  public showError(message) {
    this.toastr.error(message);
  }

  public showInfo(message) {
    this.toastr.info(message);
  }

  public showWarning(message) {
    this.toastr.warning(message);
  }
}
