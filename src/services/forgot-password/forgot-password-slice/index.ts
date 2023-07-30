import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TForgotPasswordData } from "./types";
import { TResponseResultMessage } from "../../../api/types";
import request from "../../../api";
import { TRequestThunk } from "../../../global.types";

export const initialState: TRequestThunk = {isLoading: false, isFailed: false, isSuccess: false};

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
    reducers: {},
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

export default forgotPasswordSlice.reducer;