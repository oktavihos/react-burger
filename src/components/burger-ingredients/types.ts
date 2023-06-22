import { TBurgerData } from "../app/types";

export type TBurgerIngridientsProps = {
    data?: TBurgerData[],
    categories?: TCategoriesItem[]
};

export type TCategoriesData = {
    items: TBurgerData[]
} & TCategoriesItem;

export type TCategoriesItem = {
    title: string,
    type: string
};