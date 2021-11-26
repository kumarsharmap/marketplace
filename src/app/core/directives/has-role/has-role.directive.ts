import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { LoginService } from 'src/app/features/auth/services/login/login.service';

@Directive({
  selector: '[appHasRole]',
})
export class HasRoleDirective implements OnInit {
  @Input('appHasRole') roles: any;

  constructor(
    private loginService: LoginService,
    private eleRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  public ngOnInit(): void {
    if (this.loginService.hasRoles(this.roles)) {
      this.viewContainer.createEmbeddedView(this.eleRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
