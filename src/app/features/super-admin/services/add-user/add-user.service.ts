import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientHelper } from 'src/http-client-helper';

@Injectable({
  providedIn: 'root',
})
export class AddUserService {
  constructor(private http: HttpClient) {}

  public addUser(storeAddUserData): Observable<any> {
    return this.http.post(`${HttpClientHelper.ADDUSER}`, storeAddUserData);
  }

  public getAddUser(): Observable<any> {
    return this.http.get(`${HttpClientHelper.ADDUSER}`);
  }
}
