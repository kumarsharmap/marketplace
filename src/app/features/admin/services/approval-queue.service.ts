import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { CommonConstants } from 'src/app/core/constants/common.constants';
import { LoginResponse } from 'src/app/core/models/header-menu.model';
import { PageManagementModel } from 'src/app/core/models/page-management.model';
import { HttpClientHelper } from 'src/http-client-helper';
@Injectable({
providedIn: 'root'
})
export class ApprovalQueueService {
public selectTenant: LoginResponse;
private artifactName: string;
private tenant: PageManagementModel[];
private tenantName: string;
private tenantId: number;
constructor(private http: HttpClient) {}
public getuserId(userId: number): Observable<any> {
return this.http.get( `${HttpClientHelper.APPROVALQUEUE}/${userId}`);
}
public approvedStatus (artifactTitle, artifactId: number, status: string): Observable<any> {
if (artifactTitle === 'Design Foundations') {
const foundations = this.http.put( `${HttpClientHelper.APPROVALQUEUEFOUNDATIONS}/${artifactId}/${status}`, {});
const arifact = this.http.put(`${HttpClientHelper.FOUNDATIONSAPPROVAL}/${artifactId}/${status}`, {});
return forkJoin([arifact, foundations]);
} else if (artifactTitle ==='Capabilities') {
return this.http.put( `${HttpClientHelper.APPROVALQUEUECAPABILITIES}/${artifactId}/${status}` , {});
} else if (artifactTitle === 'Components') {
return this.http.put( `${HttpClientHelper.APPROVALQUEUECOMPONENTS}/${artifactId}/${status}`, {});
} else if (artifactTitle ==='Libraries') {
return this.http.put( `${HttpClientHelper.APPROVALQUEUELIBRARIES}/${artifactId}/${status}` , {});
} else if (artifactTitle === 'Guides') {
return this.http.put( `${HttpClientHelper.APPROVALQUEUEGUIDES}/${artifactId}/${status}`, {});
}

}
public getPageManagementuserId(userId: number): Observable<any> {
return this.http.get( `${HttpClientHelper.PAGEMANAGEMENT}/${userId}`);
}
public getTenantByUserId(tenantId): Observable<any> {
return this.http.get( `${HttpClientHelper.ARTIFACT}/${tenantId}`);
}
public setSelectTenant(selectTenant: LoginResponse): void {
this.selectTenant = selectTenant;
}
public getSelectTenant(): LoginResponse { 
return this.selectTenant;
}
public setTenant(selectTenant: PageManagementModel[]): void {
this.tenant = JSON.parse(sessionStorage.getItem('tenantListData'));
}
public geTenant(): PageManagementModel[] {
return this.tenant;
}
public setTenantName(tenantName: string): void {
this.tenantName = JSON.parse(sessionStorage.getItem('selectedTenant')).tenantName;
}
public geTenantName(): string {
return this.tenantName;
}
public setTenantId(tenantId: number): void {
this.tenantId = JSON.parse(sessionStorage.getItem('selectedTenant')).tenantId;
}
public geTenantId(): number {
return this.tenantId;
}
public setartifactName(artifactName: string): void { 
this.artifactName = artifactName;
}
public geartifactName(): string {
return this.artifactName;
}
public artifactDelete(artifactTitle: string, artifactId: number): Observable<any> {
switch (artifactTitle) {
case 'Design Foundations':
return this.http.delete( `${HttpClientHelper.FOUNDATIONS}/${artifactId}`, {});
case CommonConstants.CAPABILITIES:
return this.http.delete( `${HttpClientHelper.CAPABILITIES}/${artifactId}`, {});
case CommonConstants.COMPONENTS:
return this.http.delete( `${HttpClientHelper.COMPONENTS}${artifactId}`, {});
case CommonConstants. LIBRARIES:
return this.http.delete( `${HttpClientHelper.LIBRARIES}/${artifactId}` , {});
case 'Guides':
return this.http.delete( `guides/${artifactId}` , {});
default:
break;
}
}
}

    