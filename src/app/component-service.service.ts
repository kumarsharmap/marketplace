import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize, timeout } from 'rxjs/operators';
import { SpinnerService } from './core/services/spinner/spinner.service';

import { SearchService } from './features/search/sevices/search.service';
@Injectable({
  providedIn: 'root'
})
export class ComponentServiceService {
  constructor(private http: HttpClient, private searchService: SearchService, private spinner: SpinnerService) { }
  userDetails: any = {};
  detailsUser = new BehaviorSubject(this.userDetails);
  setApprovalHeaderData(data: any) {
    this.userDetails = data;
    this.detailsUser.next(this.userDetails);
    this.searchService.searchView.next(null);
  }
  getApprovalHeaderData(): number {
    return this.userDetails.tenantId;
  }
  getrole() {
    return this.userDetails.roleName;
  }
  getTenantName() {
    return this.userDetails.tenantName;
  }

  getComponentArtifactsByStatus(status, tenantId) {
    this.spinner.startAPICall();
    return this.http.get('components/' + tenantId + '/' + status).pipe(
      finalize(() => this.spinner.stopAPICall()), timeout(30000)
    );
  }


  createComponent(data) {
    return this.http.post('components', data);
  }
  updateComponent(data) {
    return this.http.put('components', data);
  }
  fetchComponentArtifactsById(id) {
    return this.http.get('components/' + id);
  }
  getAllComponentsArtifact() {
    return this.http.get('components');
  }
}