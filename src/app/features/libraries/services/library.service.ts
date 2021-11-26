import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, timeout } from 'rxjs/operators';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';
import { SearchService } from '../../search/sevices/search.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private makerActionUrl;
  private approverActionUrl;
  private deleteRecordUrl;
  private allLibrariesUrl;
  private libraryByIDUrl;
  private approverUpdateUrl;
  private makerUpdateUrl;
  private libraryByStatusUrl;
  private gitFileUrl;
  private gitFolderUrl;
  private artifactFileUrl;
  menuItem: any = '';
  draftRecord: any;
  detailsUser = new BehaviorSubject(this.menuItem);

  constructor(
    private http: HttpClient,
    private spinner: SpinnerService,
    private searchService: SearchService
  ) {
    this.makerActionUrl = 'libraries';
    this.makerUpdateUrl = 'libraries';
    this.approverActionUrl = '';
    this.approverUpdateUrl = '';
    this.deleteRecordUrl = '';
    this.allLibrariesUrl = '';
    this.libraryByIDUrl = 'libraries/';
    this.libraryByStatusUrl = 'libraries/';
    this.gitFileUrl = '';
    this.gitFolderUrl = 'uploadFolderTOGIT';
    this.artifactFileUrl = "";
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
    return this.http.get(this.allLibrariesUrl + data, http);
  }
  getLibraryByID(id, http?): Observable<any> {
    return this.http.get(this.libraryByIDUrl + id, http);
  }
  getLibraryByStatus(tenantId, status, http?): Observable<any> {
    this.spinner.startAPICall();
    return this.http.get(this.libraryByStatusUrl + tenantId + '/' + status, http).pipe(
      finalize(() => this.spinner.stopAPICall()),
      timeout(30000)
    );
  }
  uploadFilesToRepo(url, data, http?): Observable<any> {
    this.spinner.start();
    return this.http.post(url, data, http).pipe(
      finalize(() => this.spinner.stop()),
      timeout(30000)
    );
  }
  uploadFoldersToGit(data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };
    this.spinner.start();
    return this.http.post(this.gitFolderUrl, data, httpOptions).pipe(
      finalize(() => this.spinner.stop()),
      timeout(30000)
    );
  }
  uploadFileToArtifact(data, http?): Observable<any> {
    this.spinner.start();
    return this.http.post(this.artifactFileUrl, data, http).pipe(
      finalize(() => this.spinner.stop()),
      timeout(30000)
    );
  }
  setSelectedMenuItem(data: any) {
    this.menuItem = data;
    this.detailsUser.next(this.menuItem);
    this.searchService.searchView.next(null);
  }
  getSelectedMenuItem() {
    return this.menuItem;
  }
  setDraftRecord(data: any) {
    this.draftRecord = data;
  }
  getDraftRecord() {
    return this.draftRecord;
  }
}
