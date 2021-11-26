import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { GuideServiceService } from '../../guide-service.service';

@Component({
  selector: 'app-guides-home',
  templateUrl: './guides-home.component.html',
  styleUrls: ['./guides-home.component.css']
})
export class GuidesHomeComponent implements OnInit, OnChanges {
  @Input('data') inputDetails;
  @Output() clickedArtifact = new EventEmitter<any>();
  public listOfGuides: any;
  public guidesHome = 1;
  constructor(
    public guideServiceService: GuideServiceService,
    public toastNotificationService: ToastNotificationService
  ) { }
  public ngOnInit(): void {
    this.listOfGuides = [];
    this.fetchlist('Approved');
  }
  public ngOnChanges(): void {
    this.listOfGuides = [];
    this.fetchlist('Approved');
  }
  public fetchlist(type): void {
    this.listOfGuides = [];
    this.guideServiceService.getGuidesByStatus(type, JSON.parse(sessionStorage.getItem('menu')).tenantId).subscribe(
      (response) => {
        if (response != null) {
          this.listOfGuides = response;
        } else {
          this.listOfGuides = [];
        }
      },
      (error) => {
        this.toastNotificationService.showError('Failed fetch list of Guides');
      }
    );
  }

  public loadData(obj): void {
    this.clickedArtifact.emit({ status: 'approved', details: obj });
  }
}

