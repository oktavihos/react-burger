import { TBurgerData } from "../../components/app/types";

export type TConstructorIngredient = TBurgerData & {guid: string};

export type TConstructorState = {
    ingredients: TConstructorIngredient[],
    bun?: TBurgerData
};

export enum ConstructorActionTypes {
    ADD_INGREDIENT = 'ADD_INGREDIENT',
    DELETE_INGREDIENT = 'DELETE_INGREDIENT',
    SORT_INGREDIENTS = 'SORT_INGREDIENTS',
    RESET = 'RESET',
};

interface ConstructorActionBase<T = ConstructorActionTypes>{
    type: T
};

interface ConstructorActionAdd extends ConstructorActionBase<
    ConstructorActionTypes.ADD_INGREDIENT
> {
    payload: TConstructorIngredient
};

type TPayloadConstructorSort = {
    guid: string,
    index: number
}

interface ConstructorActionSort extends ConstructorActionBase<
    ConstructorActionTypes.SORT_INGREDIENTS
> {
    payload: TPayloadConstructorSort
};

interface ConstructorActionDelete extends ConstructorActionBase<
    ConstructorActionTypes.DELETE_INGREDIENT
> {
    payload: string
};

interface ConstructorActionOneType extends ConstructorActionBase<
    ConstructorActionTypes.RESET
> {};

export type TConstructorAction = ConstructorActionAdd | ConstructorActionSort | ConstructorActionDelete | ConstructorActionOneType;

export type TConstructorReducer = (state: TConstructorState, action: TConstructorAction) => TConstructorState;