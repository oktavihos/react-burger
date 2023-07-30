import { TRequestThunk } from "../../../global.types";

export type TUserData = {
    email: string,
    password: string
};

export type TInitialStateLogin = {
    login: TRequestThunk,
    logout: TRequestThunk
};