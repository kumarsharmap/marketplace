import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentSubscriptionComponent } from 'src/app/core/components/parent-subscription/parent-subscription.component';
import { CommonConstants } from 'src/app/core/constants/common.constants';
import { TenantUser } from 'src/app/core/models/register.model';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { minimumSelection } from 'src/app/core/services/validation/minimum-selection';
import { RegisterService } from 'src/app/features/auth/services/regsiter/register.service';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.css'],
})
export class CreateNewUserComponent
  extends ParentSubscriptionComponent
  implements OnInit {
  @ViewChildren('checkboxref') public checkboxRef: QueryList<ElementRef>;
  public registrationForm: FormGroup;
  public applicationList: TenantUser[] = [];
  public selectedProject: TenantUser[] = [];

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private toastNotificationService: ToastNotificationService,
    private route: ActivatedRoute, 
private render: Renderer2,
private el: ElementRef

  ) {
    super();
  }

  ngOnInit(): void {
    this.createRegistration();
    this.getProjectList();
  }

  public onSelectedProject(event: Event, projectName: string, i: number): void {
    const test: ElementRef[] = this.checkboxRef.toArray();
    if ((event.target as HTMLInputElement).checked) {
      this.render.addClass(test[i].nativeElement, 'w--redirected-checked');
      this.selectedProject.push(this.applicationList[i]);
 
    } else {
      this.render.removeClass(test[i].nativeElement, 'w--redirected-checked');
      const index = this.selectedProject.findIndex(
        (x: TenantUser) => x.tenantName === projectName
      );
      this.selectedProject.splice(index, 1);
    }
  }

  public onUserManagement(): void {
    const tenantUser = this.selectedProject;
    const newData = { ...this.registrationForm.value, tenantUser };
    this.subscriptions.push(
      this.registerService.addRegister(newData).subscribe(
        () => {
          this.toastNotificationService.showSuccess(CommonConstants.REGISTER);
          this.router.navigate(['../user'], { relativeTo: this.route } );
        },
        (error: HttpErrorResponse) => {
          throw error;
        }
      )
    );
  }

  public onSigninAccount(): void {
    this.router.navigate(['/']);
  }

  public navigateToUser(): void {
    this.router.navigate(['../user'], { relativeTo: this.route });
    }
    

  get projectFormArray(): FormArray {
    return this.registrationForm.controls.application as FormArray;
  }

  private addCheckboxes(): void {
    if (this.applicationList) {
      this.applicationList.forEach(() =>
        this.projectFormArray.push(new FormControl(false))
      );
    }
  }

  private createRegistration(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.email,Validators.required]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.pattern('^[a-zA-Z0-9_ ]*$')
        ]),
        createUser: new FormArray([], [minimumSelection(1)])
        });
        
  }

  private getProjectList(): void {
    this.registerService
      .getProjectsList()
      .subscribe((project: TenantUser[]) => {
        this.applicationList = project;
        this.addCheckboxes();
      });
  }
}
