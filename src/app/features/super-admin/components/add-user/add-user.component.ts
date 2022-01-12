import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  BsModalService,
  BsModalRef,
  ModalDirective,
} from 'ngx-bootstrap/modal';
import { ParentSubscriptionComponent } from 'src/app/core/components/parent-subscription/parent-subscription.component';
import { CommonConstants } from 'src/app/core/constants/common.constants';
import { RoleModel } from 'src/app/core/models/roles.model';
import { CreateTenantAddUserModel } from 'src/app/core/models/tenant.model';
import { ToastNotificationService } from 'src/app/core/services/toast-notification/toast-notification.service';
import { RegisterService } from 'src/app/features/auth/services/regsiter/register.service';
import { AddUserService } from '../../services/add-user/add-user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent
  extends ParentSubscriptionComponent
  implements OnInit {
  @ViewChild('template') public templateref: TemplateRef<any>;
  @ViewChild('parentModal') parentClose: ModalDirective;
  @ViewChild('childModal') childModal: ModalDirective;

  @Output() public addUserEvent: EventEmitter<any> = new EventEmitter();
  @Input() public roles: RoleModel[];

  public addUserForm: FormGroup;
  public registrationForm: FormGroup;
  public modalRef: BsModalRef;
  public rolesValue: RoleModel;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private addUserService: AddUserService,
    private registerService: RegisterService,
    private toastNotificationService: ToastNotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.createAddUserForm();
    this.createRegistration();
  }

  public openModal(): void {
    this.modalRef = this.modalService.show(this.templateref);
  }

  public onSelectedRole(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.rolesValue = this.roles.find((data) => data.roleName === value);
  }

  public onClose(): void {
    this.parentClose.hide();
    this.resetForm();
  }
  public onCloseRegisterUser() {
    this.childModal.hide();
    this.registrationForm.reset();
  }
  public onSaveAddUser(): void {
    const roleId = { roleId: this.rolesValue.roleId };
    const addUserValue = this.addUserForm.value;
    const newData = Object.assign({}, addUserValue, roleId);
    this.addUserService.addUser(newData).subscribe(
      (addUser: CreateTenantAddUserModel) => {
        if (addUser) {
          newData.userId = addUser.userId;
          newData.name = addUser.name;
          this.toastNotificationService.showSuccess(CommonConstants.ADDUSER);
          this.onClose();
          this.addUserEvent.emit(newData);
        }
      },
      (error: HttpErrorResponse) => {
        throw error;
      }
    );
  }

  public onChildPopupClose(): void {
    this.childModal.hide();
    this.resetForm();
  }

  public onAddUser() {
    this.subscriptions.push(
      this.registerService.addRegister(this.registrationForm.value).subscribe(
        () => {
          this.onChildPopupClose();
        },

        (error: HttpErrorResponse) => {
          throw error;
        }
      )
    );
  }

  private resetForm(): void {
    this.addUserForm.reset({
      roleName: '',
    })
    this.registrationForm.reset();
  }

  private createAddUserForm(): void {
    this.addUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      roleName: ['', Validators.required],
    });

  }

  private createRegistration(): void {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9][a-zA-Z0-9 ]+[a-zA-Z0-9]$')]],
    });
  }
}
