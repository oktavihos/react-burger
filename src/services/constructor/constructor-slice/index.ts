import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TConstructorIngredient, TConstructorState, TOrderData, TOrderItems, TSortPayload } from "../type";
import { BurgerTypes } from "../../../global.types";
import securityRequest from "../../../api/security-request";

export const initialState: TConstructorState = {data: [], isLoading: false, isFailed: false};

export const sendOrder = createAsyncThunk(
    "constructor/fetchOrder",
    async (orderItems: TOrderItems) => {
        const result = await securityRequest<TOrderData>('orders', 'POST', orderItems);
        return result;
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
            state.data = state.data.filter(item => item.guid !== action.payload);
            return state;
        },
        resetConstructor: () => initialState,
        sortConstructor: (state, action: PayloadAction<TSortPayload>) => {

            let pushItem = {...state.data[action.payload.dragIndex]};
            state.data.splice(action.payload.dragIndex, 1);
            state.data.splice(action.payload.hoverIndex, 0, pushItem);

            return state;
        }
    },
    extraReducers: builder =>
        builder.addCase(sendOrder.fulfilled, (state, action) => {
            return {...state, isLoading: false, isFailed: false, order: action.payload};
        })
        .addCase(sendOrder.pending, state => ({...state, isLoading: true}))
        .addCase(sendOrder.rejected, (state, action) => ({...state, isLoading: false, isFailed: true, error: action.error.message}))
});



export const {
    addIngredient, 
    deleteIngredient, 
    resetConstructor,
    sortConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;