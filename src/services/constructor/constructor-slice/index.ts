import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TConstructorIngredient, TConstructorState, TOrderData, TOrderItems } from "./type";
import { BurgerTypes } from "../../../components/app/types";
import request from "../../../components/api";
import { TResponseResult } from "../../../components/api/types";

export const initialState: TConstructorState = {data: [], isLoading: false, isFailed: false};

export const sendOrder = createAsyncThunk(
    "constructor/fetchOrder",
    async (orderItems: TOrderItems) => {
        let result = await request<TResponseResult<TOrderData>>('orders', 'POST', orderItems);
        if(!result.success) Promise.reject('Произошла ошибка при отправке данных');
        return result.data;
    }
);

const constructorSlice = createSlice({
    name: 'constructor',
    initialState: initialState,
    reducers: {
        addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
            if(action.payload.type === BurgerTypes.BUN) state.bun = action.payload;
            else state.data.push(action.payload);

            return state;
        },
        deleteIngredient: (state, action: PayloadAction<string>) => {
            return {...state, data: state.data.filter(item => item.guid !== action.payload)};
        },
        resetConstructor: () => initialState
    },
    extraReducers: builder =>
        builder.addCase(sendOrder.fulfilled, (state, action) => {
            return {...state, isLoading: false, isFailed: false, order: action.payload};
        })
        .addCase(sendOrder.pending, state => ({...state, isLoading: true}))
        .addCase(sendOrder.rejected, state => ({...state, isLoading: false, isFailed: true}))
});



export const {
    addIngredient, 
    deleteIngredient, 
    resetConstructor 
} = constructorSlice.actions;

export default constructorSlice.reducer;