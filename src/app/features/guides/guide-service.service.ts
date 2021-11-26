import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, timeout } from 'rxjs/operators';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class GuideServiceService {
  constructor(
    private http: HttpClient,
    private spinner: SpinnerService
  ) { }
  getGuidesByStatus(status, tenantId) {
    this.spinner.startAPICall();
    return this.http.get('guides/' + tenantId + '/' + status).pipe(
      finalize(() => this.spinner.stopAPICall()),
      timeout(30000)
    );
    return this.http.get('guides/' + tenantId + '/' + status);
  }
  guidesFormSubmit(data) {
    return this.http.post('guides', data);
  }
  updateGuidesForm(data) {
    return this.http.put('guides', data);
  }
  fetchGuidesById(id) {
    return this.http.get('guides/' + id);
  }
  getAllGuidesArtifact() {
    return this.http.get('guides');
  }
}
