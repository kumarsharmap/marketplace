import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PermissionModel } from 'src/app/core/models/permission.model';
import { HttpClientHelper } from 'src/http-client-helper';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private http: HttpClient) {}

  public addPermission(storePersmissoinData: PermissionModel): Observable<any> {
    return this.http.post(
      `${HttpClientHelper.PERMISSION}`,
      storePersmissoinData
    );
  }

  public updatePermission(
    id: number,
    updatePersmissoinData: PermissionModel
  ): Observable<any> {
    return this.http.put(
      `${HttpClientHelper.PERMISSION}/${id}`,
      updatePersmissoinData
    );
  }

  public getPermission(): Observable<any> {
    return this.http.get(`${HttpClientHelper.PERMISSION}`);
  }

  public removePermission(permissionId: number[]): Observable<any> {
    return this.http.post(`${HttpClientHelper.DELETEPERMISSION}`,permissionId);
  }
}
