import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClientHelper } from 'src/http-client-helper';
import { LoginResponse } from '../../models/header-menu.model';

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  private menu$: BehaviorSubject<LoginResponse> = new BehaviorSubject(null);
  private navigationIndication$: BehaviorSubject<string> = new BehaviorSubject(null);
  private navigationHighlight$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private http: HttpClient) { }

  public setMenuItems(menu): void {
    this.menu$.next(menu);
  }

  public getMenuItems(): Observable<LoginResponse> {
    return this.menu$.asObservable();
  }

  public setNavigationIndication(tenantName: string): void {
    this.navigationIndication$.next(tenantName);
  }

  public getNavigationIndication(): Observable<string> {
    return this.navigationIndication$.asObservable();
  }

  public getAllColors(): Observable<any> {
    return this.http.get(HttpClientHelper.TENANTCOLORS);
  }
}
