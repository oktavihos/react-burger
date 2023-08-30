import { TOrder } from "../orders/types";

export type TFeedInitialState = {
    data: TResponseFeed | null,
    open: boolean,
    init: boolean,
    isLoading: boolean,
    error?: string
};

export type TResponseFeed = {
    orders: TOrder[],
    total: number,
    totalToday: number,
    timestamp: number
};