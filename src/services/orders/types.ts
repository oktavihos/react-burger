export enum EOrderStatuses {
    DONE = 'done',
    CREATED = 'created',
    PENDING = 'pending'
}

export type TOrder = {
    createdAt: string,
    ingredients: string[],
    name: string,
    number: number,
    status: EOrderStatuses,
    updatedAt: string,
    _id: string
}

export type TOrdersInitialState = {
    data: TResponseOrders | null,
    open: boolean,
    init: boolean,
    isLoading: boolean,
    error?: string
};

export type TResponseOrders = {
    orders: TOrder[],
    total: number,
    totalToday: number,
    timestamp: number
};