import { EOrderStatuses } from "../orders/types";

export const StatusesLocale = {
    [EOrderStatuses.CREATED]: 'Создан',
    [EOrderStatuses.DONE]: 'Выполнен',
    [EOrderStatuses.PENDING]: 'Готовится'
};