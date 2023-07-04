import { BurgerActionTypes, BurgerTypes, TBurgerData, TBurgerDataConstructor, TBurgerReducer, TBurgerReducerState } from "./types";

const recalculateIngridients = (data: TBurgerDataConstructor, id: string, count: number) => {
    
}

const burgerReducer: TBurgerReducer = (state, action) => {
    switch(action.type){
        case BurgerActionTypes.CONSTRUCTOR_ADD:
            let item = action.payload;
            let cloneConstructorAdd: TBurgerDataConstructor[] = [];

            let indexIngredient = state.ingredients.findIndex(item => item._id === action.payload._id);
            let ingredient = state.ingredients[indexIngredient];
            let count = action.payload.type === BurgerTypes.BUN ? 2 : 1;
            let cloneItem = {...ingredient, count: ingredient.count ? ingredient.count + count : count};
            let cloneIngredients = [...state.ingredients];
            cloneIngredients.splice(indexIngredient, 1, cloneItem);

            if(item.type === BurgerTypes.BUN){
                cloneConstructorAdd = state.constructor.filter(item => item.type !== BurgerTypes.BUN);
                cloneConstructorAdd.push(action.payload, action.payload);
            } else cloneConstructorAdd = [...state.constructor, action.payload];
            
            return {constructor: cloneConstructorAdd, ingredients: cloneIngredients};
        case BurgerActionTypes.CONSTRUCTOR_DELETE:
            
            let itemConstructor = state.constructor[action.payload];
            let indexIngredientDelete = state.ingredients.findIndex(item => item._id === itemConstructor._id);
            let ingredientDelete = state.ingredients[indexIngredientDelete];
            let countDelete = itemConstructor.type === BurgerTypes.BUN ? 2 : 1;
            let cloneItemDelete = {...ingredientDelete, count: ingredientDelete.count ? ingredientDelete.count - countDelete : 0};
            let cloneIngredientsDelete = [...state.ingredients];
            cloneIngredientsDelete.splice(indexIngredientDelete, 1, cloneItemDelete);

            let cloneConstructorDelete = [...state.constructor];
            cloneConstructorDelete.splice(action.payload, 1);

            return {constructor: cloneConstructorDelete, ingredients: cloneIngredientsDelete};
        case BurgerActionTypes.LOAD_INGREDIENTS:
            return {...state, ingredients: action.payload};
        case BurgerActionTypes.COSTRUCTOR_UPDATE:
            return {...state, constructor: action.payload};
        default:
            return state;
    }
}

export default burgerReducer;