import { BurgerTypes } from "../../components/app/types";
import { IngredientsActionTypes, TIngredientsReducer, TIngredientsState } from "./types";

export const ingredientsInitialState: TIngredientsState = {ingredients: []};

export const ingredientsReducer: TIngredientsReducer = (state, action) => {
    switch(action.type){
        case IngredientsActionTypes.LOAD_INGREDIENTS:
            return {...state, ingredients: action.payload};
        case IngredientsActionTypes.INCREMENT:
        case IngredientsActionTypes.DESCREMENT:
            let indexItem = state.ingredients.findIndex(item => item._id === action.payload);
            let cloneIngredients = [...state.ingredients];
            let item = cloneIngredients[indexItem];
            let isBun = item.type === BurgerTypes.BUN;

            let currentBunIndex = cloneIngredients.findIndex(element => 
                item._id !== element._id
                && element.type === BurgerTypes.BUN
                && element.count && element.count > 0
            );
            
            if(currentBunIndex > -1 && isBun){
                cloneIngredients.splice(currentBunIndex, 1, {...cloneIngredients[currentBunIndex], count: 0});
            }
            let count = 0;
            
            if(action.type === IngredientsActionTypes.INCREMENT) count = 1;
            else count = -1;
            cloneIngredients.splice(indexItem, 1, {...item, count: isBun ? 2 : (item?.count ?? 0) + count});
            
            return {...state, ingredients: cloneIngredients};
        default:
            return state;
    }
}