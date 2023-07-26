import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { TIngredientsState } from "./types";
import request from "../../../api";
import { TResponseResult } from "../../../api/types";
import { BurgerTypes, TBurgerData } from "../../../global.types";

export const initialState: TIngredientsState = {data: [], isLoading: false, isFailed: false};

export const getIngredients = createAsyncThunk(
    "ingredients/fetchIngredients",
    async () => {
        const result = await request<TResponseResult<TBurgerData[]>>('ingredients');
        return result.data;
    }
);

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers: {
        incrementIngredient: (state, action: PayloadAction<string>) => {
            let hasBun = false;
            state.data = state.data.map(item => {
                const isCurrentElement = item._id === action.payload;
                if(isCurrentElement && item.type === BurgerTypes.BUN && !hasBun) hasBun = true;

                return isCurrentElement 
                    ? {...item, count: (hasBun ? 0 : item.count ?? 0) + (hasBun ? 2 : 1)} 
                    : item
            });
            
            if(hasBun) state.data = state.data.map(item => {
                return item._id !== action.payload && item.type === BurgerTypes.BUN && item.count && item.count > 0
                    ? {...item, count: 0} 
                    : item
                }
            );

            return state;
        },
        decrementIngredient: (state, action: PayloadAction<string>) => {
            state.data = state.data.map(item => item._id === action.payload  && item.count && item.count > 0
                ? {...item, count: item.count - (item.type === BurgerTypes.BUN ? 2 : 1)} 
                : item
            );

            return state;
        },
        resetIngredients: state => {
            state.data = state.data.map(item => item.count && item.count > 0 
                ? {...item, count: 0} 
                : item
            );

            return state;
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getIngredients.fulfilled, (state, action) => ({...state, data: action.payload, isLoading: false}))
        .addCase(getIngredients.pending, state => ({...state, isLoading: true}))
        .addCase(getIngredients.rejected, (state, action) => ({...state, isLoading: false, isFailed: true, error: action.error.message}))
    }
});

export const {
    incrementIngredient, 
    decrementIngredient, 
    resetIngredients, 
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;