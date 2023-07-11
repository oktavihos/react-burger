import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { TIngredientsState, TIngredient } from "./types";
import request from "../../../components/api";
import { BurgerTypes, TBurgerData } from "../../../components/app/types";
import { TResponseResult } from "../../../components/api/types";

export const initialState: TIngredientsState = {data: [], isLoading: false, isFailed: false, errors: []};

export const getIngredients = createAsyncThunk(
    "ingredients/fetchIngredients",
    async () => {
        let result = await request<TResponseResult<TBurgerData[]>>('ingredients');
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
                let isCurrentElement = item._id === action.payload;
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
        },
        selectIngredient: (state, action: PayloadAction<TIngredient>) => {
            state.select = action.payload;
            return state;
        },
        unselectIngredient: state => {
            state.select = undefined;
            return state;
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getIngredients.fulfilled, (state, action) => ({...state, data: action.payload, isLoading: false}))
        .addCase(getIngredients.pending, state => ({...state, isLoading: true}))
        .addCase(getIngredients.rejected, (state) => ({...state, isLoading: false, isFailed: true}))
    }
});

export const {
    incrementIngredient, 
    decrementIngredient, 
    resetIngredients, 
    selectIngredient, 
    unselectIngredient
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;