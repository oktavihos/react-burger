import { BurgerTypes } from "../../components/app/types";
import { IngredientsActionTypes, TIngredientsReducer, TIngredientsState } from "./types";

export const ingredientsInitialState: TIngredientsState = {ingredients: [], selectIngredients: undefined};

export const ingredientsReducer: TIngredientsReducer = (state, action) => {
    switch(action.type){
        case IngredientsActionTypes.SELECT: {
            return {...state, selectIngredients: action.payload};
        }
        case IngredientsActionTypes.UNSELECT: {
            return {...state, selectIngredients: undefined};
        }
        case IngredientsActionTypes.LOAD_INGREDIENTS: {
            return {...state, ingredients: action.payload};
        }
        case IngredientsActionTypes.INCREMENT: {
            let hasBun = false, incrementState = {...state, ingredients: [...state.ingredients].map(item => {
                    if(item.type === BurgerTypes.BUN && item._id === action.payload) hasBun = true;

                    return item._id === action.payload 
                    ? {...item, count: (item.count ? item.count : 0) + (item.type === BurgerTypes.BUN ? 2 : 1)}
                    : item;
                }
            )};
            if(hasBun) incrementState.ingredients = incrementState.ingredients.map(
                item => item.type === BurgerTypes.BUN && item._id !== action.payload 
                ? {...item, count: 0} 
                : item
            );
            return incrementState;
        }
        case IngredientsActionTypes.DESCREMENT: {
            return {...state, ingredients: [...state.ingredients].map(
                item => item._id === action.payload && item.count && item.count > 0
                ? {...item, count: item.count - (item.type === BurgerTypes.BUN ? 2 : 1)}
                : item
            )};
        }
        case IngredientsActionTypes.RESET: {
            return {...state, ingredients: [...state.ingredients].map(
                item => item.count && item.count > 0 
                ? {...item, count: 0} 
                : item
            )};
        }
        default:
            return state;
    }
}