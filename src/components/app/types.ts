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

export type TCategoriesData = {
    items: TBurgerData[],
    type: string,
    title: string
};

export type TCategoriesItem = {
    [key: string]: string
};

export type TBurgerDataConstructor = TBurgerData & { guid: number };

export type TBurgerReducerState = {
    ingredients: TBurgerData[]
    constructor: TBurgerDataConstructor[]
};

export enum BurgerActionTypes {
    CONSTRUCTOR_ADD = 'CONSTRUCTOR_ADD',
    CONSTRUCTOR_DELETE = 'CONSTRUCTOR_DELETE',
    COSTRUCTOR_UPDATE = 'COSTRUCTOR_UPDATE',
    LOAD_INGREDIENTS = 'LOAD_INGREDIENTS'
};

interface TBurgerReducerActionBase<T = BurgerActionTypes>{
    type: T
};

interface TBurgerReducerActionData extends TBurgerReducerActionBase<
    BurgerActionTypes.LOAD_INGREDIENTS
> {
    payload: TBurgerData[]
};
interface TBurgerReducerActionUpdate extends TBurgerReducerActionBase<
    BurgerActionTypes.COSTRUCTOR_UPDATE
> {
    payload: TBurgerDataConstructor[]
};
interface TBurgerReducerActionAdd extends TBurgerReducerActionBase<
    BurgerActionTypes.CONSTRUCTOR_ADD
> {
    payload: TBurgerDataConstructor
};
interface TBurgerReducerActionDelete extends TBurgerReducerActionBase<
    BurgerActionTypes.CONSTRUCTOR_DELETE
> {
    payload: number;
}

export type TBurgerReducerAction = TBurgerReducerActionData | TBurgerReducerActionDelete | TBurgerReducerActionAdd | TBurgerReducerActionUpdate;

export type TBurgerReducer = (state: TBurgerReducerState, action: TBurgerReducerAction) => TBurgerReducerState;