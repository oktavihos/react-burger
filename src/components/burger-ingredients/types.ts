import { TIngredient } from "../../services/ingredients/types";

export type TCategoriesData = {
    items: TIngredient[],
    type: string,
    title: string
};