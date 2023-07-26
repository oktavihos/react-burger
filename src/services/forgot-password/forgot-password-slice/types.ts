import { TRequestThunk } from "../../../global.types";

export type TInitialStateForgotPassword = TRequestThunk & {data: TForgotPasswordData};

export type TForgotPasswordData = {
    email: string
};