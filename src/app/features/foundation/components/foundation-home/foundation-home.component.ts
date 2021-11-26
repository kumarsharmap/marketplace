import { Component, EventEmitter, Input, OnChanges, OnInit, Output, } from '@angular/core';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { FoundationService } from '../services/foundation.service';

@Component({
  selector: 'app-foundation-home',
  templateUrl: './foundation-home.component.html',
  styleUrls: ['./foundation-home.component.css']
})
export class FoundationHomeComponent {
  public listOfFoundationArtifacts: any = [];
  inpObjTosend: { type: string; detailsObj: any };
  public idToSend: any;

  @Input('data') inputDetails;
  @Output() clickedArtifact = new EventEmitter<any>();
  public EditResponse: any;

  constructor(
    public foundationServ: FoundationService,
    private toastNotificationService: ToastNotificationService
  ) { }

  public ngOnChanges(): void {
    this.listOfFoundationArtifacts = [];
    this.foundationServ.getOtherArtifactsByStatus('Approved', JSON.parse(sessionStorage.getItem('menu')).tenantId)
      .subscribe(
        (responseOutside) => {
          this.listOfFoundationArtifacts = [];
          if (responseOutside !== null) {
            this.listOfFoundationArtifacts = responseOutside;
          } else {
            this.listOfFoundationArtifacts = [];
          }
        },
        (error) => {
          this.toastNotificationService.showError('Failed fetch list of others artifacts');
        }
      );
  }
  public loadData(obj): void {
    // this.clickedArtifact.emit({
    //   status: 'approved', details: obj
    // });
  }
}
