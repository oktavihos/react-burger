import { BurgerTypes } from "../app/types";
import { TCategoriesItem } from "./types";

export const locCategories: TCategoriesItem = {
    [BurgerTypes.BUN.toString()]: 'Булки',
    [BurgerTypes.SAUSES.toString()]: 'Соусы',
    [BurgerTypes.MAIN.toString()]: 'Начинки'
};