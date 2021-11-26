import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { GuideServiceService } from '../../guide-service.service';
import { Location } from '@angular/common';
import { SearchService } from 'src/app/features/search/sevices/search.service';

@Component({
  selector: 'app-guide-view',
  templateUrl: './guide-view.component.html',
  styleUrls: ['./guide-view.component.css']
})
export class GuideViewComponent implements OnInit {

  @Input('data') inputDetails;
  @Output() sendData = new EventEmitter<string>();
  public editModeFlag = false;
  public richTextTemplateInput: { foundationArtifactType: string; type: string; details: any };
  public hideButton = false;
  public showSearch = false;
  public role='';
  constructor(
    private guidesService: GuideServiceService,
    private searchService: SearchService,
    private location: Location,
    public loginService: LoginService
  ) { }
  public resposneJson: any;
  public ngOnInit(): void {
    this.role = JSON.parse(sessionStorage.getItem('menu')).roleName;
    this.hideButton = false;
    this.searchService.searchView.subscribe((value) => {
      if (value?.hideButton === true) {
        this.hideButton = true;
        this.showSearch = false;
      } else if (value?.hideButton === false) {
        this.hideButton = false;
        this.showSearch = true;
      }
    });
    this.getGuidesList();
  }
  public ngOnChanges(): void {
    this.role = JSON.parse(sessionStorage.getItem('menu')).roleName;
    this.hideButton = false;
    this.searchService.searchView.subscribe((value) => {
      if (value?.hideButton === true) {
        this.hideButton = true;
        this.showSearch = false;
      } else if (value?.hideButton === false) {
        this.hideButton = false;
        this.showSearch = true;
      }
    });
    this.getGuidesList();
  }

  public edit(): void {
    this.richTextTemplateInput = {
      foundationArtifactType: 'Guides',
      type: 'Edit',
      details: this.resposneJson
    };
    this.editModeFlag = true;
  }
  public handleClose(event): void {
    if (event === 'guideExit') {
      this.editModeFlag = false;
    }
    if (event === 'guidesCancel') {
      this.sendData.emit('refresh');
    }
    if (event === 'Reset') {
      this.editModeFlag = false;
      this.edit();
    }
  }
  public getGuidesList(): void {
    this.resposneJson = [];
    this.resposneJson = {
      "artifactId": 0,
      "artifactType": "Design",
      "taskId": [],
      "status": "Pending",
      "image": {
        "imageUrl": "",
        "name": "No file chosen"
      },
      "pageDescription": "TeTS",
      "pageTitle": "TeTS",
      "version": 0,
      "richTextArray": [{
        "richText": "<p>Block 1</p>"
      },
      {
        "richText": "<p>Block 2</p>"
      }
      ]
    }
    this.guidesService.fetchGuidesById(this.inputDetails.artifactId).subscribe(
      (res) => {
        if (res != null) {
          this.resposneJson = res;
          this.postRecentlyViewed(this.resposneJson);
        } else {
          this.resposneJson = [];
        }
      },
      (error: HttpErrorResponse) => {
        throw error;
      }
    );
  }
  public back(): void {
    this.location.back();
  }

  public postRecentlyViewed(artifactData): void {
    let obj = {};
    obj = {
      artifactCategory: artifactData.artifactCategory,
      artifactId: artifactData.artifactId,
      lastViewedon: new Date(),
      pageTitle: artifactData.pageTitle,
      tenantId: artifactData.tenantId,
      tenantName: artifactData.tenantName,
      viewcount: 1
    };
    this.loginService.postRecentViewed(obj).subscribe(
      (res) => { },
      (error: HttpErrorResponse) => {
        throw new Error(error.error.message);
      }
    );
  }

}
