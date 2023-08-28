import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TOrdersInitialState, TResponseOrders } from "../types";

const initialState: TOrdersInitialState = {data: null, open: false, init: false, isLoading: true};

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: initialState,
    reducers: {
        wsInit: (state, action: PayloadAction<string>) => {
            return {...state, init: true};
        },
        wsSendMessage: state => {
            return state;
        },
        onOpen: (state) => {
            return {...state, open: true};
        },
        onClose: (state) => {
            return {...state, open: false, isLoading: false};
        },
        onError: (state) => {
            return {...state, open: false, init: false, isLoading: false}
        },
        onMessage: (state, action: PayloadAction<TResponseOrders>) => {
            return {...state, data: action.payload, isLoading: false}
        }
    }
});

export const {wsInit, wsSendMessage, onOpen, onClose, onError, onMessage} = ordersSlice.actions;

export default ordersSlice.reducer;