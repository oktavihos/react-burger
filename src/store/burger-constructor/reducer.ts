import { BurgerTypes } from "../../components/app/types";
import { ConstructorActionTypes, TConstructorReducer, TConstructorState } from "./types";

export const constructorInitialState: TConstructorState = {bun: undefined, ingredients: []};

export const constructorReducer: TConstructorReducer = (state, action) => {
    switch(action.type){
        case ConstructorActionTypes.ADD_INGREDIENT:
            if(action.payload.type === BurgerTypes.BUN) return {...state, bun: action.payload};
            else return {...state, ingredients: [...state.ingredients, action.payload]};
        case ConstructorActionTypes.DELETE_INGREDIENT:
            let cloneIngredients = [...state.ingredients];
            let deleteIndex = cloneIngredients.findIndex(item => item.guid === action.payload);
            cloneIngredients.splice(deleteIndex, 1);
            return {...state, ingredients: cloneIngredients};
        case ConstructorActionTypes.SORT_INGREDIENTS:
            return {...state};
        case ConstructorActionTypes.RESET:
            return constructorInitialState;
        default:
            return state;
    }
}