import { Action, createReducer, on } from '@ngrx/store';
import { UserInfoActions } from '../actions/user-info.actions';
import { StateUser } from '../models/user-info.models';

export const UserInfoFeatureKey = 'user';

export const initialStateUserInfo: StateUser = {
    userResponse: [],
    loginInfo: null
};

function addUserInfoSuccess(state: StateUser, action) {
    return {
        ...state,
        userResponse: action.userResponse
    };
}
function addLoggedinUserInfo(state: StateUser, action) {
    return {
        ...state,
        loginInfo: action.LoginInfo
    };
}
const userReducer = createReducer(
    initialStateUserInfo,
    on(UserInfoActions.addUserInfoSuccess, addUserInfoSuccess),
    on(UserInfoActions.addLoggedinUserInfo, addLoggedinUserInfo),
);
export function reducer(state: StateUser | undefined, action: Action) {
    return userReducer(state, action);
}
