export type TOrderData = {
    name: string,
    order: {number: number}
};

export type TOrderDetailsProps = {
    closeModalHandle?: () => void,
    data?: TOrderData,
    errors?: string[]
};