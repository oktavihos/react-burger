import { TConstructorIngredient } from "../../../../services/constructor/constructor-slice/type"

export type TConstructorDragItemProps = {
    item: TConstructorIngredient,
    deleteItemHandle: (guid: string) => void,
    index: number
}

export type TConstructorDragItem = {
    index: number
}