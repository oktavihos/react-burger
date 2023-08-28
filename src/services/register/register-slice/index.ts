import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TRegisterData } from "../types";
import request from "../../../api";
import { TProfileResponse } from "../../profile/types";
import { setData } from "../../profile/profile-slice";
import { ACCESS_TOKEN_FIELD, REFRESH_TOKEN_FIELD } from "../../../config/api";
import { TRequestThunk } from "../../../global.types";

export const initialState: TRequestThunk = {isLoading: false, isFailed: false, isSuccess: false};

export const registerFetch = createAsyncThunk(
    "register/registerFetch",
    async (data: TRegisterData, { dispatch }) => {
        const result = await request<TProfileResponse>('auth/register', 'POST', data);
        
        const accessToken = result.accessToken.split('Bearer ')[1];
        const refreshToken = result.refreshToken;

        localStorage.setItem(ACCESS_TOKEN_FIELD, accessToken);
        localStorage.setItem(REFRESH_TOKEN_FIELD, refreshToken);
        dispatch(setData(result.user));
        return result.user;
    }
);

const registerSlice = createSlice({
    name: 'register',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(registerFetch.fulfilled, () => ({
            ...initialState, isSuccess: true
        }))
        .addCase(registerFetch.pending, state => ({...state, isLoading: true}))
        .addCase(registerFetch.rejected, (state, action) => ({
            ...state, isLoading: false, isSuccess: false, isFailed: true, error: action.error.message
        }))
    }
});

export default registerSlice.reducer;