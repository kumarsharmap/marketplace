import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { finalize, timeout } from 'rxjs/operators';
import { SearchService } from 'src/app/features/search/sevices/search.service';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';


@Injectable({
  providedIn: 'root'
})
export class CapabilitiesService {

  private makerActionUrl;
  private approverActionUrl;
  private deleteRecordUrl;
  private allCapabilitiesUrl;
  private capabilityByIDUrl;
  private approverUpdateUrl;
  private makerUpdateUrl;
  private capabilityByStatusUrl;
  private gitFileUrl;
  private gitFolderUrl;
  private artifactFileUrl;
  menuItem: any = '';
  draftRecord: any;
  detailsUser = new BehaviorSubject(this.menuItem)

  constructor(private http: HttpClient,
    private spinner: SpinnerService,
    private searchService: SearchService
  ) {

    this.makerActionUrl = 'capabilities';
    this.makerUpdateUrl = 'capabilities';
    this.approverActionUrl = '';
    this.approverUpdateUrl = '';
    this.deleteRecordUrl = '';
    this.allCapabilitiesUrl = '';
    this.capabilityByIDUrl = 'capabilities/';
    this.capabilityByStatusUrl = 'capabilities/';
    this.gitFileUrl = '';
    this.gitFolderUrl = 'uploadFolderToGit';
    this.artifactFileUrl = '';

  }

  makerAction(data, http?): Observable<any> {
    return this.http.post(this.makerActionUrl, data, http);
  }
  approverAction(data, http?): Observable<any> {
    return this.http.post(this.approverActionUrl, data, http);
  }
  approverUpdate(data): Observable<any> {
    return this.http.put(this.approverUpdateUrl, data);
  }
  makerUpdateAction(data): Observable<any> {
    return this.http.put(this.makerUpdateUrl, data);
  }
  deleteRecord(id): Observable<any> {
    return this.http.delete(this.deleteRecordUrl + id);
  }

  getAllCapabilities(data, http?): Observable<any> {
    return this.http.get(this.allCapabilitiesUrl + data, http);
  }

  getCapabilityByID(id, http?): Observable<any> {
    return this.http.get(this.capabilityByIDUrl + id, http);
  }
  getCapabilityByStatus(status, tenantId, http?): Observable<any> {
    this.spinner.startAPICall();
    return this.http.get(this.capabilityByStatusUrl + tenantId + "/" + status, http).pipe(
      finalize(() => this.spinner.stopAPICall()),
      timeout(30000)
    )
  }
  uploadFilesToRepo(url, data, http?): Observable<any> {
    this.spinner.start();
    return this.http.post(url, data, http).pipe(
      finalize(() => this.spinner.stop()),
      timeout(30000));
  }
  uploadFoldersToGit(data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };
    this.spinner.start();
    return this.http.post(this.gitFolderUrl, data, httpOptions).pipe(
      finalize(() => this.spinner.stop()),
      timeout(30000));
  }
  uploadFileToArtifact(data, http?): Observable<any> {
    this.spinner.start();
    return this.http.post(this.artifactFileUrl, data, http).pipe(
      finalize(() => this.spinner.stop()),
      timeout(30000));
  }
  setSelectedMenuItem(data: any) {
    this.menuItem = data;
    this.searchService.searchView.next(null);
    this.detailsUser.next(this.menuItem);
  };

  getSelectedMenuItem() {
    return this.menuItem;
  };
  setDraftRecord(data: any) {
    this.draftRecord = data;
  };

  getDraftRecord() {
    return this.draftRecord;
  };

}
