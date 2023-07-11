import { TConstructorIngredient } from "../../../../services/constructor/constructor-slice/type"

export type TCOnstructorDragItemProps = {
    item: TConstructorIngredient,
    deleteItemHandle: (guid: string) => void,
    index: number
}

export type TCOnstructorDragItem = {
    index: number
}