import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpClientHelper } from '../../../../../http-client-helper';
import { LoginResponse } from '../../../models/header-menu.model';
import { UserInfoActions } from '../actions/user-info.actions';

@Injectable()
export class UserInfoEffects {
    constructor(
        private action$: Actions,
        private http: HttpClient,
        private router: Router,
        private store: Store<any>) { }
        
    public addUserInfos: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(UserInfoActions.addUserInfo),
        switchMap((action) => {
            return this.http.post(`${HttpClientHelper.LOGIN}`, action.userInfo).pipe(
                map((result: LoginResponse[]) => {
                    this.router.navigateByUrl('/landing');
                    return UserInfoActions.addUserInfoSuccess({ userResponse: result });
                }),
                catchError((e: any) => of(UserInfoActions.addUserInfoError({ error: e })))
            );
        })
    ));
}
