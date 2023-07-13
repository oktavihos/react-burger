export enum EmptyItemTypes {
    TOP = 'top',
    BOTTOM = 'bottom',
    CENTER = 'center'
};

export type TEmptyItemProps = {
    type: EmptyItemTypes,
    text: string,
    active?: boolean
};