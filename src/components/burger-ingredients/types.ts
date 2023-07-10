import { TBurgerData } from "../app/types";


export type TCategoriesData = {
    items: TBurgerData[],
    type: string,
    title: string
};

export type TCategoriesItem = {
    [key: string]: string
};