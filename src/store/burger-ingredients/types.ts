import { TBurgerData } from "../../components/app/types";

export type TIngredient = TBurgerData & {count?: number};

export type TIngredientsState = {
    ingredients: TIngredient[],
    selectIngredients?: TIngredient 
};

export enum IngredientsActionTypes {
    LOAD_INGREDIENTS = 'LOAD_INGREDIENTS',
    INCREMENT = 'INCREMENT',
    DESCREMENT = 'DESCREMENT',
    SELECT = 'SELECT',
    UNSELECT = 'UNSELECT',
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

interface IngredientsActionSelect extends IngredientsActionBase<
    IngredientsActionTypes.SELECT
> {
    payload: TIngredient
};

interface IngredientsActionOnlyType extends IngredientsActionBase<
    IngredientsActionTypes.RESET | IngredientsActionTypes.UNSELECT
> {};

export type TIngredientsAction = IngredientsActionSelect | IngredientsActionLoad | IngredientsActionCount | IngredientsActionOnlyType;

export type TIngredientsReducer = (state: TIngredientsState, action: TIngredientsAction) => TIngredientsState;