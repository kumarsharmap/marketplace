import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable, Injector, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(@Inject(Injector) private readonly injector: Injector, private zone: NgZone) { }

  public handleError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      this.zone.run(() => {
        this.toastrService.error(error?.error?.message);
      });
    } else {
      console.error(error);
    }
  }
  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }
}
