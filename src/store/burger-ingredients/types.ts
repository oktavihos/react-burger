import { TBurgerData } from "../../components/app/types";

export type TIngredient = TBurgerData & {count?: number};

export type TIngredientsState = {
    ingredients: TIngredient[]
};

export enum IngredientsActionTypes {
    LOAD_INGREDIENTS = 'LOAD_INGREDIENTS',
    INCREMENT = 'INCREMENT',
    DESCREMENT = 'DESCREMENT',
    RESET = 'RESET',
};

interface IngredientsActionBase<T = IngredientsActionTypes>{
    type: T
};

interface IngredientsActionLoad extends IngredientsActionBase<
    IngredientsActionTypes.LOAD_INGREDIENTS
> {
    payload: TIngredient[]
};

interface IngredientsActionCount extends IngredientsActionBase<
    IngredientsActionTypes.INCREMENT | IngredientsActionTypes.DESCREMENT
> {
    payload: string
};

interface IngredientsActionOnlyType extends IngredientsActionBase<
    IngredientsActionTypes.RESET
> {};

export type TIngredientsAction = IngredientsActionLoad | IngredientsActionCount | IngredientsActionOnlyType;

export type TIngredientsReducer = (state: TIngredientsState, action: TIngredientsAction) => TIngredientsState;