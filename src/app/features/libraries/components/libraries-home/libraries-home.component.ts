import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-libraries-home',
  templateUrl: './libraries-home.component.html',
  styleUrls: ['./libraries-home.component.css']
})
export class LibrariesHomeComponent implements OnChanges {
  @Output() public showApproved = new EventEmitter();
  @Input('data') public inputDetails;
  @Input('tenantId') public tenantId;
  public librariesList = [];
  public selectedLibraryId = {};
  public showView = false;
  constructor(private libraryService: LibraryService) { }

  public ngOnChanges(): void {
    if (this.inputDetails === false || this.inputDetails === true) {
      this.librariesList = [];
      this.getLibrariesList();
    }
  }
  public showApprovedLib(tab): void {
    this.selectedLibraryId = tab;
    this.showView = true;
    this.showApproved.emit(this.selectedLibraryId);
  }
  public getLibrariesList(): void {
    this.librariesList = [];
    this.libraryService.getLibraryByStatus(this.tenantId, 'Approved').subscribe(
      (res) => {
        if (res != null) {
          this.librariesList = res;
        } else {
          this.librariesList = [];
        }
      },
      (error: HttpErrorResponse) => {
        throw error;
      }
    );
  }
}
