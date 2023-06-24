export type TModalProps = {
    children?: React.ReactElement | React.ReactElement[],
    open?: boolean,
    title?: string,
    openHandle?: () => void,
    extraClass?: string
};