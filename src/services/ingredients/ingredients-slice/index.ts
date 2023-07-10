import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { TIngredientsState, TIngredient } from "./types";
import request from "../../../components/api";
import { BurgerTypes, TBurgerData } from "../../../components/app/types";

const initialState: TIngredientsState = {data: [], isLoading: false, isFailed: false};

export const getIngredients = createAsyncThunk(
    "ingredients/fetchIngredients",
    async () => request<TBurgerData[]>('ingredients')
);

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers: {
        incrementIngredient: (state, action: PayloadAction<string>) => {
            let hasBun = false;
            let result: TIngredientsState = {...state, data: state.data.filter(item => {
                let isCurrentElement = item._id === action.payload;
                if(isCurrentElement && item.type === BurgerTypes.BUN && !hasBun) hasBun = true;

                return isCurrentElement 
                    ? {...item, count: item.count ?? 0 + (hasBun ? 2 : 1)} 
                    : item
            })};
            
            if(hasBun) result.data = result.data.filter(item => {
                return item._id !== action.payload && BurgerTypes.BUN && item.count && item.count > 0
                    ? {...item, count: 0} 
                    : item
                }
            );

            return result;
        },
        decrementIngredient: (state, action: PayloadAction<string>) => {
            return {...state, data: state.data.filter(item => item._id === action.payload  && item.count && item.count > 0
                ? {...item, count: item.count - (item.type === BurgerTypes.BUN ? -2 : -1)} 
                : item
            )};
        },
        resetIngredients: state => {
            return {...state, data: state.data.filter(item => item.count && item.count > 0 
                ? {...item, count: 0} 
                : item
            )}
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
        .addCase(getIngredients.rejected, state => ({...state, isLoading: false, isFailed: true}))
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