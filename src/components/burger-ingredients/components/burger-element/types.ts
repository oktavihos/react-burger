import { TBurgerData } from "../../../app/types";

export type TBurgerElementProps = {
    data: TBurgerData,
    selectHandle: (data: TBurgerData) => void
};