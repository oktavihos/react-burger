import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TFeedInitialState, TResponseFeed } from "../types";

export const initialState: TFeedInitialState = {data: null, open: false, init: false, isLoading: true};

export const feedSlice = createSlice({
    name: 'feed',
    initialState: initialState,
    reducers: {
        wsInit: (state, action: PayloadAction<string>) => {
            return {...state, init: true};
        },
        wsClose: () => {
            return initialState;
        },
        onOpen: (state) => {
            return {...state, open: true};
        },
        onClose: () => {
            return initialState;
        },
        onError: (state, action: PayloadAction<string>) => {
            return {...state, open: false, data: null, init: false, isLoading: false, error: action.payload}
        },
        onMessage: (state, action: PayloadAction<TResponseFeed>) => {
            return {...state, data: action.payload, isLoading: false}
        }
    }
});

export const {wsInit, wsClose, onOpen, onClose, onError, onMessage} = feedSlice.actions;

export type TFeedActions = typeof feedSlice.actions;

export default feedSlice.reducer;