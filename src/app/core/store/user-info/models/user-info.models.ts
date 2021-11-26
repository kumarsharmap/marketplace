import { LoginResponse } from 'src/app/core/models/header-menu.model';
import { CreateLoginRequest } from 'src/app/core/models/login.model';

export interface StateUser {
    userResponse: LoginResponse[];
    loginInfo: CreateLoginRequest;
}