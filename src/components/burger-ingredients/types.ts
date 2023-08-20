import { TIngredient } from "../../services/ingredients/ingredients-slice/types";

export type TCategoriesData = {
    items: TIngredient[],
    type: string,
    title: string
};