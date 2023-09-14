import  { configureStore } from '@reduxjs/toolkit';

import ingredientsReducer, {
    initialState as ingredientsInitialState,
    incrementIngredient,
    decrementIngredient,
    resetIngredients,
    getIngredients
} from './index';

import { mockIngredients } from '../../../utils/mock-data';
const modifyMockIngredients = [...mockIngredients];

const store = configureStore({
    reducer: ingredientsReducer,
    preloadedState: ingredientsInitialState
});

describe('Ingredient slice test', () => {

    afterEach(() => {
        jest.spyOn(global, "fetch").mockClear();
    });

    it('Should be return initial state ingredients', () => {
        expect(store.getState()).toEqual(ingredientsInitialState);
    });

    it("Should be fetch ingredients", async () => {

        jest.spyOn(global, "fetch").mockImplementation(
            jest.fn(() => {
                return Promise.resolve({
                    json: () => ({ data: mockIngredients, success: true }),
                    ok: true,
                });
            })
        );

        await store.dispatch(getIngredients());

        expect(fetch).toBeCalledTimes(1);

        expect(store.getState()).toEqual({
            data: mockIngredients,
            isLoading: false,
            isFailed: false,
            error: undefined
        });
    });

    it('Should be increment bun count', () => {
        modifyMockIngredients[0] = {...modifyMockIngredients[0], count: 2};
        store.dispatch(incrementIngredient(modifyMockIngredients[0]._id));
        expect(store.getState()).toEqual({
            ...ingredientsInitialState,
            data: modifyMockIngredients
        })
    });

    it('Should be decrement bun count', () => {
        modifyMockIngredients[0] = {...modifyMockIngredients[0], count: 0};
        store.dispatch(decrementIngredient(modifyMockIngredients[0]._id));
        expect(store.getState()).toEqual({
            ...ingredientsInitialState,
            data: modifyMockIngredients
        })
    });

    it('Should be increment ingredient count', () => {
        modifyMockIngredients[1] = {...modifyMockIngredients[1], count: 1};
        store.dispatch(incrementIngredient(modifyMockIngredients[1]._id));
        expect(store.getState()).toEqual({
            ...ingredientsInitialState,
            data: modifyMockIngredients
        })
    });

    it('Should be decrement ingredient count', () => {
        modifyMockIngredients[1] = {...modifyMockIngredients[1], count: 0};
        store.dispatch(decrementIngredient(modifyMockIngredients[1]._id));
        expect(store.getState()).toEqual({
            ...ingredientsInitialState,
            data: modifyMockIngredients
        })
    });

    it('Should be reset count', () => {
        store.dispatch(incrementIngredient(modifyMockIngredients[1]._id));
        store.dispatch(resetIngredients());
        expect(store.getState()).toEqual({
            ...ingredientsInitialState,
            data: modifyMockIngredients
        });
    });
});