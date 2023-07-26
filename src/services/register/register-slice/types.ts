import { TRequestThunk } from "../../../global.types";

export type TRegisterData = {
    name?: string,
    email: string,
    password: string
};

export type TInitialStateRegister = TRequestThunk & {data: TRegisterData}