import { TOrder } from "../../services/orders/types";

export type TOrderListProps = {
    data: TOrder[];
    route: string;
    viewStatus: boolean;
};