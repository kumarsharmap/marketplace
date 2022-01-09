import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { LoginService } from 'src/app/features/auth/services/login/login.service';
import { FoundationService } from 'src/app/features/foundation/components/services/foundation.service';
import { SearchService } from 'src/app/features/search/sevices/search.service';
@Component({
    selector: 'app-view-rich-text-template',
    templateUrl: './view-rich-text-template.component.html',
    styleUrls: ['./view-rich-text-template.component.css']
})

export class ViewRichTextTemplateComponent implements OnInit, OnChanges {
    public editModeFlag = false;
    public richTextTemplateInput: { foundationArtifactType: string; type: string; details: {} };
    public hideButton = false;
    public showSearch = false;
    public role='';
    constructor(
        public foundationServ: FoundationService,
        private toastNotificationService: ToastNotificationService,
        public sanitizer: DomSanitizer,
        private searchService: SearchService,
        public location: Location,
        public loginService: LoginService
    ) { }

    public responseToBeViewed: any ;
    public responseLoadFlag = false;
    @Input('data') id: number;
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
        this.fetchDetails();
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
        this.fetchDetails();
    }
    public fetchDetails(): void {
        
        this.foundationServ.fetchOtherArtifactsById(this.id).subscribe(
            (response) => {
                this.responseLoadFlag = true;
                this.responseToBeViewed = response;
                this.postRecentlyViewed(this.responseToBeViewed);
            },
            (error) => {
                this.toastNotificationService.showError('Fail to fetch details');
            }
        );
    }
    public edit(): void {
        this.richTextTemplateInput = {
            foundationArtifactType: 'Foundation',
            type: 'Edit',
            details: this.responseToBeViewed
        };
        this.editModeFlag = true;
    }
    public handleRefresh(event): void {
        if (event === 'Reset') {
            this.editModeFlag = false;
            this.edit();
        } else {
            this.editModeFlag = false;
        }
    }
    public back(): void {
        this.location.back();
    }
    public postRecentlyViewed(artifactData): void {
        let obj = {};
        obj = {
            artifactCategory: artifactData.artifactCategory,
            artifactId: artifactData.artifactId,
            lastViewedOn: new Date(),
            pageTitle: artifactData.pageTitle,
            tenantid: artifactData.tenantId,
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
