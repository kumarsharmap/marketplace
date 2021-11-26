import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientHelper } from 'src/http-client-helper';
import { share, take } from 'rxjs/operators';
import { RegisterModel } from 'src/app/core/models/register.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) { }

  public addRegister(storeRegisterData: RegisterModel): Observable<any> {
    return this.http.post(`${HttpClientHelper.REGISTER}`, storeRegisterData);
  }

  public getProjectsList(): Observable<any> {
    return this.http.get(`${HttpClientHelper.PROJECTS}`);
  }

  public forgotPassword(forgotPasswordData): Observable<any> {
    return this.http.post(`${HttpClientHelper.FORGOT}`, forgotPasswordData, { responseType: 'text' });
  }

  public changePassword(newPasswordData): Observable<any> {
    return this.http.post(`${HttpClientHelper.CHANGEPASSWORD}`, newPasswordData, { responseType: 'text' });
  }
}
