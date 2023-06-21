import { TBurgerElementProps } from "./types";
import elementStyle from './style.module.sass';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerElement = ({data}: TBurgerElementProps) => {
    return (
        <div className={`${elementStyle.card}`}>
            <Counter count={1} size="default" extraClass="m-1" />
            <div className="pl-4 pr-4"><img alt={data.name} src={data.image} /></div>
            <div className={`${elementStyle.price} mt-1 mb-1`}>
                <span className="text text_type_digits-default" style={{marginRight: '9px'}}>{data.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <div className={elementStyle.name}>{data.name}</div>
        </div>
    );
}

export default BurgerElement;