import { TBurgerData } from "../../../components/app/types";

export type TIngredient = TBurgerData & {count?: number};

export type TIngredientsState = {
    data: TIngredient[],
    select?: TIngredient,
    isLoading: boolean,
    isFailed: boolean,
    errors: string[]
};