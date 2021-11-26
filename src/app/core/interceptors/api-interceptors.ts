import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from '../services/environment-service/env.service';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    constructor(private envService: EnvService) { }
    public intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const baseurl = this.envService.getapiUrl;
        const apiReq = req.clone({
            url: `${baseurl}/${req.url}`
        });
        return next.handle(apiReq);
    }
}
