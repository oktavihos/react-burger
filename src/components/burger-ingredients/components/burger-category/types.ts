export type TBurgerCategoryProps = {
    title: string,
    type: string,
    children?: JSX.Element[],
    titleRef?: React.LegacyRef<HTMLHeadingElement>
};