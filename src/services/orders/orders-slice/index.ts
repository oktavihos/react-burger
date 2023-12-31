import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TOrdersInitialState, TResponseOrders } from "../types";

export const initialState: TOrdersInitialState = {data: null, open: false, init: false, isLoading: true};

export const ordersSlice = createSlice({
    name: 'orders',
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
        onMessage: (state, action: PayloadAction<TResponseOrders>) => {
            return {...state, data: action.payload, isLoading: false}
        }
    }
});

export const {wsInit, wsClose, onOpen, onClose, onError, onMessage} = ordersSlice.actions;

export type TOrdersActions = typeof ordersSlice.actions;

export default ordersSlice.reducer;