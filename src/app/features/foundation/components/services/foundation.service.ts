import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize, timeout } from 'rxjs/operators';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';
import { SearchService } from 'src/app/features/search/sevices/search.service';

@Injectable({
  providedIn: 'root'
})
export class FoundationService {
  constructor(
    private http: HttpClient,
    private searchService: SearchService,
    private spinner: SpinnerService) { }

  userDetails: any = {};
  detailsUser = new BehaviorSubject(this.userDetails);
  setApprovalHeaderData(data: any) {
    this.userDetails = data;
    this.searchService.searchView.next(null);
    this.detailsUser.next(this.userDetails);
  }
  getApprovalHeaderData(): number {
    return this.userDetails.tenantId;
  }
  getRole() {
    return this.userDetails.roleName;
  }
  getOtherArtifactsByStatus(status, tenantId) {
    this.spinner.startAPICall();
    return this.http.get('foundations/' + tenantId + '/' + status).pipe(
      finalize(() => this.spinner.stopAPICall()),
      timeout(30000)
    );

  }
  othersFoundationFormSubmit(data) {
    return this.http.post('foundations', data);
  }
  updateFoundationForm(data) {
    return this.http.put('foundations', data);
  }
  fetchOtherArtifactsById(id) {
    return this.http.get('foundations/' + id);
  }
  getAllotherArtifact() {
    return this.http.get('foundations');
  }
}