import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { TInitialStateForgotPassword, TForgotPasswordData } from "./types";
import { TResponseResultMessage } from "../../../api/types";
import request from "../../../api";

export const initialState: TInitialStateForgotPassword = {data: {email: ''}, isLoading: false, isFailed: false, isSuccess: false};

export const forgotPasswordFetch = createAsyncThunk(
    "forgotPassword/forgotPasswordFetch",
    async (data: TForgotPasswordData) => {
        const result = await request<TResponseResultMessage>('password-reset', 'POST', data);
        return result;
    }
);

const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState: initialState,
    reducers: {
        setFields: (state, action: PayloadAction<{key: string, value: string}>) => {
            return {...state, data: {...state.data, [action.payload.key]: action.payload.value}}
        }
    },
    extraReducers: builder => {
        builder
        .addCase(forgotPasswordFetch.fulfilled, () => ({
            ...initialState, isSuccess: true
        }))
        .addCase(forgotPasswordFetch.pending, state => ({...state, isLoading: true}))
        .addCase(forgotPasswordFetch.rejected, (state, action) => ({
            ...state, isLoading: false, isSuccess: false, isFailed: true, error: action.error.message
        }))
    }
});

export const { setFields } = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;