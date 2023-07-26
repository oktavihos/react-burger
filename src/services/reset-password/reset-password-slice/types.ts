import { TRequestThunk } from "../../../global.types";

export type TResetPasswordData = {
    password: string,
    token: string
};

export type TInitialStateResetPassword = TRequestThunk & {data: TResetPasswordData}