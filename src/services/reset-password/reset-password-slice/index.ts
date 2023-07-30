import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TResetPasswordData } from "./types";
import request from "../../../api";
import { TResponseResultMessage } from "../../../api/types";
import { TRequestThunk } from "../../../global.types";

export const initialState: TRequestThunk = {isLoading: false, isFailed: false, isSuccess: false};

export const resetPasswordFetch = createAsyncThunk(
    "resetPassword/resetPasswordFetch",
    async (data: TResetPasswordData) => {
        const result = await request<TResponseResultMessage>('password-reset/reset', 'POST', data);
        return result;
    }
);

const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(resetPasswordFetch.fulfilled, () => ({
            ...initialState, isSuccess: true
        }))
        .addCase(resetPasswordFetch.pending, state => ({...state, isLoading: true}))
        .addCase(resetPasswordFetch.rejected, (state, action) => ({
            ...state, isLoading: false, isFailed: true, isSuccess: false, error: action.error.message
        }))
    }
});

export default resetPasswordSlice.reducer;