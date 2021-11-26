import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClientHelper } from 'src/http-client-helper';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  public manageUser: any;
  constructor(private http: HttpClient, private router: Router) {}

  public updateUserManagement(
    userId: number,
    userManagementData
  ): Observable<any> {
    return this.http.put(
      `${HttpClientHelper.USERMANAGEMENT}/${userId}`,
      userManagementData
    );
  }

  public getAllUserManagement(): Observable<any> {
    return this.http.get(`${HttpClientHelper.USERMANAGEMENT}`);
  }

  public deleteUserManagement(userId: number[]): Observable<any> {
    return this.http.post(`${HttpClientHelper.DELETEUSER}`,userId);
  }

  public getUserById(userId): Observable<any> {
    return this.http
      .get(`${HttpClientHelper.USERMANAGEMENT}/${userId}`);
      
  }
public setManageUser(manageUser): any{
this.manageUser = manageUser;
}
  public getManageUser() {
    return this.manageUser;
  }
}
