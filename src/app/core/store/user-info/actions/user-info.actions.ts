import { createAction, props } from '@ngrx/store';
import { LoginResponse } from '../../../models/header-menu.model';
import { CreateLoginRequest } from '../../../models/login.model';

export const addUserInfo = createAction(
    '[User] Add User Info',
    props<{ userInfo: CreateLoginRequest }>()
);

export const addUserInfoSuccess = createAction(
    '[User] Add User Info Success',
    props<{ userResponse: LoginResponse[] }>()
);

export const addUserInfoError = createAction(
    '[User] Add User Info Error',
    props<{ error: Error }>()
);

export const addLoggedinUserInfo = createAction(
    '[User] Add Loggedin User Info',
    props<{ LoginInfo: CreateLoginRequest }>()
);

export const UserInfoActions = {
    addUserInfo,
    addUserInfoSuccess,
    addUserInfoError,
    addLoggedinUserInfo,
};
