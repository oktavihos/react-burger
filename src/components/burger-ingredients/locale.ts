import { BurgerTypes, ObjectKeyString } from "../../global.types";

export const locCategories: ObjectKeyString<string> = {
    [BurgerTypes.BUN.toString()]: 'Булки',
    [BurgerTypes.SAUSES.toString()]: 'Соусы',
    [BurgerTypes.MAIN.toString()]: 'Начинки'
};