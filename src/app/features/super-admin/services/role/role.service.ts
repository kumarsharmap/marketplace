import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleModel } from 'src/app/core/models/roles.model';
import { HttpClientHelper } from 'src/http-client-helper';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  public addRole(storeRoleData: RoleModel): Observable<any> {
    return this.http.post(`${HttpClientHelper.ROLE}`, storeRoleData);
  }

  public getRole(): Observable<any> {
    return this.http.get(`${HttpClientHelper.ROLE}`);
  }

  public updateRole(id: number, updateRoleData: RoleModel): Observable<any> {
    return this.http.put(`${HttpClientHelper.ROLE}/${id}`, updateRoleData);
  }

  public removeRole(roleId: number[]): Observable<any> {
    return this.http.post(`${HttpClientHelper.DELETEROLE}`,roleId);
  }
}
