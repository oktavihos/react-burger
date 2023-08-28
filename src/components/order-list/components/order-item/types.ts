import { TOrder } from "../../../../services/orders/types";

export type TOrderItemProps = {
    data: TOrder;
    route: string;
    viewStatus: boolean;
};