import { TRequestThunk } from "../../global.types";

export type TProfileState = {
    user?: TUser,
    isAuth: boolean,
    requests: TProfileRequests
};

export type TProfileRequests = {
    getUser: TRequestThunk & {isGetUserInfo: boolean},
    updateUser: TRequestThunk
};

export type TUser = {
    name: string,
    email: string
};

export type TProfileResponse = {
    success: boolean,
    user: TUser,
    accessToken: string,
    refreshToken: string
};

export type TUserUpdate = {
    name?: string,
    email?: string,
    password?: string
};

