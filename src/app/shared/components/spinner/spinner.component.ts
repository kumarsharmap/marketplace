import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerService } from "src/app/core/services/spinner/spinner.service";


@Component({
  selector: "app-spinner",
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.css"]
})
export class SpinnerComponent implements OnInit {
  /**
   * @var active
   * @return boolean
   */
  public active: boolean;
  public enableAPISpinner: boolean;
  public enableBrowseSpinner: boolean;

  /**
   * @method constructor
   * @param spinner
   */
  constructor(spinner: SpinnerService, private ngxSpinner: NgxSpinnerService) {
    spinner.status.subscribe((st: boolean) => {
      this.active = st;
      if (this.active == true) {

        this.showSpinner();
      }
    });
    spinner.apiStatus.subscribe((st: boolean) => {
      this.enableAPISpinner = st;
      if (this.enableAPISpinner === true) {

        this.showSpinner();
      }
    });
    spinner.browserStatus.subscribe((st: boolean) => {
      this.enableBrowseSpinner = st;
      if (this.enableBrowseSpinner === true) {

        this.showBrowseSpinner();
      }
    });

  }

  ngOnInit() {

  }
  public showSpinner() {
    this.ngxSpinner.show(undefined, { fullScreen: true });
    setTimeout(() => {
      this.ngxSpinner.hide();
    }, 50000);
  }
  public showBrowseSpinner() {
    this.ngxSpinner.show(undefined, { fullScreen: true });
    setTimeout(() => {
      this.ngxSpinner.hide();
    }, 4000);
  }
}

