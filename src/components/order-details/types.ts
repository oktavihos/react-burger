import { TOrderData } from "../../services/constructor/constructor-slice/type";

export type TOrderDetailsProps = {
    closeModalHandle?: () => void,
    data?: TOrderData,
    error?: string
};