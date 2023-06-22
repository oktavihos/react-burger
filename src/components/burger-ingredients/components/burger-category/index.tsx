import { TBurgerCategoryProps } from "./types";
import categoryStyle from './style.module.sass';

const BurgerCategory: React.FC<TBurgerCategoryProps> = ({title, type, children = undefined, titleRef = () => {}}) => {
    return (
        <>
            <h2 id={type} ref={titleRef} className="text text_type_main-medium">{title}</h2>
            <div className={`${categoryStyle.cardList} pt-6 pb-10 pr-4 pl-4`}>
                {children}
            </div>
        </>
    );
}

export default BurgerCategory;