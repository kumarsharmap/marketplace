import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParentSubscriptionComponent } from 'src/app/core/components/parent-subscription/parent-subscription.component';
import { CommonConstants } from 'src/app/core/constants/common.constants';
import { RegisterModel, TenantUser } from 'src/app/core/models/register.model';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { minimumSelection } from 'src/app/core/services/validation/minimum-selection';
import { RegisterService } from '../../services/regsiter/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent
  extends ParentSubscriptionComponent
  implements OnInit {
  registrationForm: FormGroup;
  applicationList: TenantUser[] = [];
  selectedProject: TenantUser[] = [];

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private toastNotificationService: ToastNotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.createRegistration();
    this.getProjectList();
  }

  public onSelectedProject(
    event: Event,
    projectName: string,
    tenantIndex: number
  ): void {
    if ((event.target as HTMLInputElement).checked) {
      this.selectedProject.push(this.applicationList[tenantIndex]);
    } else {
      const tenantIndex: number = this.selectedProject.findIndex(
        (tenantUser: TenantUser) => tenantUser.tenantName === projectName
      );
      this.selectedProject.splice(tenantIndex, 1);
    }
  }

  public onSubmitRegister(): void {
    const tenantUser: TenantUser[] = this.selectedProject;
    const tenantUsernewData: RegisterModel = {
      ...this.registrationForm.value,
      tenantUser,
    };
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.valid) {
      this.subscriptions.push(
        this.registerService.addRegister(tenantUsernewData).subscribe(
          () => {
            this.toastNotificationService.showSuccess(CommonConstants.REGISTER);
            this.router.navigate(['/registermailsent']);
          },
          (error: HttpErrorResponse) => {
            throw error;
          }
        )
      );
    }
  }

  public onSigninAccount(): void {
    this.router.navigate(['/']);
  }

  get tenantProjectFormArray(): FormArray {
    return this.registrationForm.controls.application as FormArray;
  }

  private addCheckboxes(): void {
    if (this.applicationList) {
      this.applicationList.forEach(() =>
        this.tenantProjectFormArray.push(new FormControl(false))
      );
    }
  }

  private createRegistration(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60), Validators.pattern('^[a-zA-Z0-9_]*$')]),
      application: new FormArray([], [minimumSelection(1)]),
    });
  }

  private getProjectList(): void {
    this.subscriptions.push(
      this.registerService
        .getProjectsList()
        .subscribe((project: TenantUser[]) => {
          this.applicationList = project;
          this.addCheckboxes();
        })
    )
  }
}
