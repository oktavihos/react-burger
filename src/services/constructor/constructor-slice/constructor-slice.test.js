import  { configureStore } from '@reduxjs/toolkit';
import { mockIngredients, mockResponseOrderData, mockRequestOrderData } from '../../../utils/mock-data';

import constructorReducer, { 
    initialState as constructorInitialState,
    sendOrder,
    addIngredient,
    deleteIngredient,
    resetConstructor,
    sortConstructor
} from './index';
import { ACCESS_TOKEN_FIELD } from '../../../config/api';

const store = configureStore({
    reducer: constructorReducer,
    preloadedState: constructorInitialState
});

const mockBun = {...mockIngredients[0], guid: "sdfsdfsdf-sdfsdfsdf-sdfsdf"};
const mockIngredient = {...mockIngredients[1], guid: "sdfsdfsdf-sdfsdfsdf-22222"};
const mockIngredientOther = {...mockIngredients[2], guid: "sdfsdfsdf-sdfsdfsdf-33333"};
const modifyInitialState = {...constructorInitialState};

describe('Constructor slice test', () => {

    afterEach(() => {
        jest.spyOn(global, "fetch").mockClear();
    });

    it('Should be return initial state constructor', () => {
        expect(store.getState()).toEqual(constructorInitialState);
    });

    it("Should be add bun", () => {
        store.dispatch(addIngredient(mockBun));
        modifyInitialState.bun = mockBun;
        expect(store.getState()).toEqual(modifyInitialState);
    });

    it("Should be add ingredient", () => {
        store.dispatch(addIngredient(mockIngredient));
        store.dispatch(addIngredient(mockIngredientOther));
        modifyInitialState.data = [mockIngredient, mockIngredientOther];
        expect(store.getState()).toEqual(modifyInitialState);
    });

    it("Should be delete ingredient", () => {
        modifyInitialState.data = [mockIngredient];
        store.dispatch(deleteIngredient(mockIngredientOther.guid));
        expect(store.getState()).toEqual(modifyInitialState);
    });

    it("Should be reset constructor", () => {
        store.dispatch(resetConstructor());
        expect(store.getState()).toEqual(constructorInitialState);
    });

    it("Should be sort constructor", () => {
        store.dispatch(addIngredient(mockBun));
        store.dispatch(addIngredient(mockIngredient));
        store.dispatch(addIngredient(mockIngredientOther));
        modifyInitialState.data = [mockIngredientOther, mockIngredient];
        store.dispatch(sortConstructor({dragIndex: 1, hoverIndex: 0}));
        expect(store.getState()).toEqual(modifyInitialState);
    });

    it("Should be send order", async () => {

        jest.spyOn(global, "fetch").mockImplementation(
            jest.fn(() => {
                return Promise.resolve({
                    json: () => mockResponseOrderData,
                    ok: true,
                });
            })
        );

        localStorage.setItem(ACCESS_TOKEN_FIELD, 'test');

        await store.dispatch(sendOrder(mockRequestOrderData));
        expect(fetch).toBeCalledTimes(1);
        expect(store.getState()).toEqual({
            ...modifyInitialState,
            order: mockResponseOrderData
        });
    });
});