import { AuthenticationError } from './errorTypes';
import { InvalidOptionsError } from '../errors';
export declare type AuthType = 'code' | 'accessToken';
export declare type TokenOauthOptions = {
    authType: AuthType;
    clientId: string;
    clientSecret: string;
    authUrl?: string;
    tokenUrl?: string;
    profileUrl?: string;
};
export declare type OauthOptionsValidationResult = {
    err?: InvalidOptionsError;
};
export declare type UserProfileData = {
    [x: string]: string | number | {} | [];
};
export declare type UserProfile = {
    id: string;
    name?: string;
    email?: string;
    _rawProfileData: UserProfileData;
};
export declare type AuthenticationResult = {
    err?: AuthenticationError;
    userProfile?: UserProfile;
};
export declare type AccessTokenGetResult = {
    err?: AuthenticationError;
    accessToken: string;
};
export declare type UserProfileGetResult = {
    err?: AuthenticationError;
    userProfile?: UserProfile;
};
export declare type JsonObject = {
    [x: string]: any;
    [x: number]: any;
};
