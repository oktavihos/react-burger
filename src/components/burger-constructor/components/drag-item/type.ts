import { TConstructorIngredient } from "../../../../services/constructor/type"

export type TConstructorDragItem = {
    index: number
}

export type TConstructorDragItemProps = {
    item: TConstructorIngredient,
    deleteItemHandle: (guid: string) => void
} & TConstructorDragItem;