import { TBurgerData } from "../../global.types";

export type TIngredient = TBurgerData & {count?: number};

export type TIngredientsState = {
    data: TIngredient[],
    select?: TIngredient,
    isLoading: boolean,
    isFailed: boolean,
    error?: string
};