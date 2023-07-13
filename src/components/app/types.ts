export type TBurgerData = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    count?: number,
    __v: number
};

export enum BurgerTypes {
    BUN = 'bun',
    MAIN = 'main',
    SAUSES = 'sauce'
};

export enum DragTypes {
    INGREDIENTS = 'ingredients',
    SORT_CONSTRUCTOR = 'constructor'
};