import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTenantModel } from 'src/app/core/models/tenant.model';
import { HttpClientHelper } from 'src/http-client-helper';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
  static editTenant: CreateTenantModel;

  constructor(private http: HttpClient) {}

  public createTenant(tenantData): Observable<any> {
    return this.http.post(`${HttpClientHelper.TENANT}`, tenantData);
  }

  public getTenant(): Observable<any> {
    return this.http.get(`${HttpClientHelper.TENANT}`);
  }

  public getTenantByAdmin(adminMenuById: number, adminFlag:boolean): Observable<any> {
    const flag = adminFlag === true ? '1':'0';
    return this.http.get(`${HttpClientHelper.TENANT}/${adminMenuById}/${flag}`);
  }

  public updateTenant(tenantId: number, updateTenantData): Observable<any> {
    return this.http.put(
      `${HttpClientHelper.TENANT}/${tenantId}`,
      updateTenantData
    );
  }

  public getAllTenant(): Observable<any> {
    return this.http.get(`${HttpClientHelper.PROJECTS}`);
  }

  public removeTenant(tenantId: number): Observable<any> {
   // return this.http.post(`${HttpClientHelper.DELETETENANT}`,deleteTenant);
   return this.http.delete(`${HttpClientHelper.TENANT}/${tenantId}`);
  }

  public setTenantData(tenant) {
    TenantService.editTenant = tenant;
  }

  public getTenantData() {
    return TenantService.editTenant;
  }
}
