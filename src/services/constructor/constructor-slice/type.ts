import { TBurgerData } from "../../../components/app/types";

export type TConstructorIngredient = TBurgerData & {guid: string};

export type TOrderItems = {
    ingredients: string[]
};

export type TOrderData = {
    name: string,
    order: {number: number}
};

export type TConstructorState = {
    data: TConstructorIngredient[],
    bun?: TBurgerData,
    order?: TOrderData,
    isLoading: boolean,
    isFailed: boolean,
    error?: string
};

export type TSortPayload = {
    dragIndex: number,
    hoverIndex: number
};