import { Inject, Injectable, Injector, NgZone } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(@Inject(Injector) private readonly injector: Injector, private zone: NgZone) { }
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
         const errors = {
          error: {
            message: 'Invalid Username/Password'
          }
         };         
         this.zone.run(() => {
          this.toastrService.error(errors?.error?.message)
         });
        } else {
          return throwError(error);
        }
      })
    );
  }

  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }
}
