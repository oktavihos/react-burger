import { BurgerTypes, TCategoriesItem } from "../app/types";

export const locCategories: TCategoriesItem = {
    [BurgerTypes.BUN.toString()]: 'Булки',
    [BurgerTypes.SAUSES.toString()]: 'Соусы',
    [BurgerTypes.MAIN.toString()]: 'Начинки'
};