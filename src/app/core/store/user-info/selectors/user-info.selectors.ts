import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginResponse } from '../../../models/header-menu.model';
import { CreateLoginRequest } from '../../../models/login.model';
import { StateUser } from '../models/user-info.models';
import { UserInfoFeatureKey } from '../reducers/user-info.reducers';

export const fSelector = createFeatureSelector(UserInfoFeatureKey);

export const getUserInfo = createSelector(fSelector, (state: StateUser): LoginResponse[] => state.userResponse);

export const getLoggedinInfo = createSelector(fSelector, (state: StateUser): CreateLoginRequest => state.loginInfo);

export const UserInfoSelectors = {
getUserInfo,
getLoggedinInfo
};
