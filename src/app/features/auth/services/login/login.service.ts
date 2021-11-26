import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from 'src/app/core/models/header-menu.model';
import { CreateLoginRequest } from 'src/app/core/models/login.model';
import { UserInfoActions } from 'src/app/core/store/user-info/actions/user-info.actions';
import { HttpClientHelper } from 'src/http-client-helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public isLogIn: boolean;
  public userName: string;
  public userId: number;
  public loginResponse: LoginResponse[];
  public authentication$: BehaviorSubject<LoginResponse[]> = new BehaviorSubject(null);
  public loginEmail: string;
  public isSuperAdmin: boolean;
  public loginPassword: string;

  constructor(private http: HttpClient, private router: Router, private store: Store<any>) { }

  public loginUser(loginData: CreateLoginRequest, isRoting: boolean): void {
    this.loginEmail = loginData.email;
    sessionStorage.setItem('userEmail', loginData.email);
    sessionStorage.setItem('userData', loginData.password);
    this.loginPassword = loginData.password;
    this.http.post( `${HttpClientHelper.LOGIN}`, loginData).subscribe(
    (loginResponse: LoginResponse[]) => {
    sessionStorage.setItem('loginResponse', JSON.stringify(loginResponse));
    const login = JSON.parse(sessionStorage.getItem('loginResponse'));
    console.log(login);
    if (login) {
    this.authentication$.next(login);
    this.store.dispatch(UserInfoActions.addUserInfoSuccess({ userResponse: login }));
    sessionStorage.setItem('userName', login[0].name);
    sessionStorage.setItem('userId', login[0].userId);
    this.userName =login[0].name;
    this.userId = login[0].userId;
    this.loginResponse = login;
    this.isGetlogInUserName();
    if (isRoting) {
    this.router.navigateByUrl('/landing');
     }
     }
    },
     (error: HttpErrorResponse) => {
      throw error;
     }
     );
    }




  public getUserSubject(): Observable<LoginResponse[]> {
    return this.authentication$;
  }

  public hasRoles(roles: any): boolean {
    if (roles.roleName === 'Admin') {
      return true;
    } else {
      return false;
    }
  }

  public isSetlogIn(isLogin): void {
    this.isLogIn = isLogin;
  }

  public isGetlogIn(): boolean {
    return this.isLogIn;
  }

  public isGetlogInUserName(): string {
    return this.userName;
  }

  public setLoginEmail(loginEmail) {
    this.loginEmail = loginEmail;
  }

  public getLoginEmail() {
    return this.loginEmail;
  }

  public setLoginPassword(loginPassword) {
    this.loginPassword = loginPassword;
  }

  public getLoginPassword(): string {
    return this.loginPassword;
  }

  public setSuperAdmin(superAdmin) {
    this.isSuperAdmin = superAdmin;
  }

  public getSuperAdmin(): boolean {
    return this.isSuperAdmin;
  }
  getCapabilitiesLatestUpdates() {
    return this.http.get('capabilitieslatestupdates');
  }
  getComponentLatestUpdates() {
    return this.http.get('componentlatestupdates');
  }
  getDesignerGuidesLatestUpdates() {
    return this.http.get('designerguideslatestupdates');
  }
  getDeveloperGuidesLatestUpdates() {
    return this.http.get('developerguideslatestupdates');
  }
  postRecentViewed(data): Observable<any> {
    return this.http.post('recentlyviewed', data);
  }
  getMostPopularArtifacts() {
    return this.http.get('mostpopular');
  }
  getTrendingGuides() {
    return this.http.get('trendingguides');
  }
  getListofFilesAllowed() {
    return this.http.get('contentType');
  }
}
