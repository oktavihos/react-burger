export type TResponseResult<T> = {
    success: boolean,
    data: T
};

export type TResponseResultMessage = {
    success: boolean,
    message: string
}