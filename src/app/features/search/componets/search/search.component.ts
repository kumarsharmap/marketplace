import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ComponentServiceService } from 'src/app/component-service.service';
import { SearchInterface } from 'src/app/core/models/search.model';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { CapabilitiesService } from 'src/app/features/capabilities/components/capabilities/capabilities.service';
import { FoundationService } from 'src/app/features/foundation/components/services/foundation.service';
import { LibraryService } from 'src/app/features/libraries/services/library.service';
import { SearchService } from '../../sevices/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public searchValue: string;
  public searchList: SearchInterface[];
  public librariesArray = [];
  public componentsArray = [];
  public guidesArray: any = [];
  public foundationsArray: any = [];
  public capabilitiesArray: any = [];
  public toggle = true;
  public componentPage = 1;
  public capabilityPage = 1;
  public libraryPage = 1;
  public guidesPage = 1;
  public foundationsPage = 1;
  public maximumPerPage = 2;
  public itemsPerPage = 2;
  public colors = [];
  public bsModalRef: BsModalRef;
  public showCapability = false;
  public showComponent = false;
  public showGuide = false;
  public showLibrary = false;
  public showFoundation = false;
  public selectedId: any;
  public selectedLibraryId: any;

  constructor(
    public searchService: SearchService,
    private router: Router,
    private menu: MenuService,
    private modalService: BsModalService,
    public libraryService: LibraryService,
    public componentService: ComponentServiceService,
    public capabilityService: CapabilitiesService,
    public foundationService: FoundationService
  ) { }
  public ngOnInit(): void {
    this.getColours();
    this.searchService.searchInput.subscribe((value) => {
      this.getColours();
      this.searchValue = sessionStorage.getItem('searchvalue');
      this.getSearchDetails();
    });
  }
  public getColours(): void {
    this.colors = [];
    this.menu.getAllColors().subscribe((colors) => {
      if (colors) {
        this.colors = colors;
      }
    });
  }

  public hexToRGB(hex, alpha): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  }
  public getSearchDetails(): void {
    this.searchList = [];
    this.searchService.getSearchList(this.searchValue).subscribe(
      (res) => {
        if (res !== null) {
          this.searchList = res;
          for (const i in this.searchList) {
            for (const k in this.colors) {
              if (this.searchList[i].tenantName === this.colors[k].tenantName) {
                this.searchList[i].lightColor = this.hexToRGB(this.colors[k].tenantColor, 0.1);
                this.searchList[i].darkColor = this.colors[k].tenantColor;
              }
            }
          }
        }
        else {
          this.searchList = [];
        }
        this.filterSearchResponse();
      },
      (error: HttpErrorResponse) => {
        throw error;
      }
    );
  }
  public filterSearchResponse(): void {
    this.librariesArray = [];
    this.componentsArray = [];
    this.foundationsArray = [];
    this.guidesArray = [];
    this.capabilitiesArray = [];
    if (this.searchList) {
      this.searchList.filter((searchList: SearchInterface) => {
        switch (searchList.artifactCategory) {
          case 'Libraries':
            this.librariesArray.push(searchList);
            break;
          case 'Components':
            this.componentsArray.push(searchList);
            break;
          case 'Capabilities':
            this.capabilitiesArray.push(searchList);
            break;
          case 'Design Foundations':
            this.foundationsArray.push(searchList);
            break;
          case 'Guides':
            this.guidesArray.push(searchList);
            break;
          default:
            break;
        }
      });
    }
  }
  public navigateToViewPage(artifactData): void {
    if (!artifactData.hasOwnProperty('path')) {
      artifactData['hideButton'] = false;
    }
    this.toggle = true;
    setTimeout(() => {
      if (this.toggle) {
        sessionStorage.setItem('tenantName', artifactData.tenantName);
        sessionStorage.setItem('searchData', JSON.stringify(artifactData));
        this.menu.setNavigationIndication(sessionStorage.getItem('tenantName'));
        this.searchService.showSearchView(JSON.parse(sessionStorage.getItem('searchData')));
        switch (artifactData.artifactCategory) {
          case 'Libraries':
            this.libraryService.detailsUser.next(null);
            break;
          case 'Components':
            this.componentService.detailsUser.next(null);
            break;
          case 'Capabilities':
            this.capabilityService.detailsUser.next(null);
            break;
          case 'Design Foundations':
            this.foundationService.detailsUser.next(null);
            break;
          case 'Guides':
            this.foundationService.detailsUser.next(null);
            break;
          default:
            break;
        }
        if (artifactData.artifactCategory !== 'Design Foundations') {
          this.router.navigate([artifactData.artifactCategory]);
        } else {
          this.router.navigate(['DesignFoundations']);
        }
      }
    }, 250);
  }
  public openNewTab(artifactData): void {
    this.toggle = false;
    this.menu.setNavigationIndication(artifactData.tenantName);
    this.searchService.showSearchView(artifactData);
    this.router.navigate([]).then((result) => {
      window.open(artifactData.artifactCategory, '_blank');
    });
  }
  public openModal(template: TemplateRef<any>, artifactData) {
    artifactData['hideButton'] = true;
    this.searchService.showSearchView(artifactData);
    let initialstate;
    this.toggle = false;
    switch (artifactData.artifactCategory) {
      case 'Libraries':
        this.selectedId = artifactData.artifactId;
        this.showFoundation = false;
        this.showCapability = false;
        this.showComponent = false;
        this.showGuide = false;
        this.showLibrary = true;
        this.bsModalRef = this.modalService.show(template);
        break;
      case 'Components':
        this.selectedId = {
          id: artifactData.artifactId,
          type: 'Component'
        };
        this.showFoundation = false;
        this.showFoundation = false;
        this.showCapability = false;
        this.showGuide = false;
        this.showLibrary = false;
        this.showComponent = true;
        this.bsModalRef = this.modalService.show(template);
        break;
      case 'Capabilities':
        this.selectedId = {
          id: artifactData.artifactId,
          type: 'Capability'
        };
        this.showFoundation =
          false;
        this.showComponent = false;
        this.showGuide = false;
        this.showLibrary = false;
        this.showCapability = true;
        this.bsModalRef = this.modalService.show(template);
        break;
      case 'Design Foundations':
        this.selectedId = artifactData.artifactId;
        this.showCapability = false;
        this.showComponent = false;
        this.showGuide = false;
        this.showLibrary = false;
        this.showFoundation = true;
        this.bsModalRef = this.modalService.show(template);
        break;
      case 'Guides':
        this.selectedId = artifactData;
        this.showCapability = false;
        this.showComponent = false;
        this.showFoundation = false;
        this.showLibrary = false;
        this.showGuide = true;
        this.bsModalRef = this.modalService.show(template);
        break;
      default:
        break;
    }
  }
}

