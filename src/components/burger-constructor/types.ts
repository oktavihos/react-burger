export type TBurgerConstructorProps = {
    data?: TBurgerData[],
    categories?: TCategoriesItem[]
};

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
    __v: number
};

export type TCategoriesData = {
    items: TBurgerData[]
} & TCategoriesItem;

export type TCategoriesItem = {
    title: string,
    type: string
};