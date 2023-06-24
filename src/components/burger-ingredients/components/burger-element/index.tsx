import { TBurgerElementProps } from "./types";
import elementStyle from './style.module.sass';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useState } from "react";
import IngredientsDetail from "../ingredients-detail";

const BurgerElement: React.FC<TBurgerElementProps> = ({data}) => {

    const [open, setOpen] = useState<boolean>(false);
    const openHandle = useCallback(() => {
        setOpen(!open)
    }, [setOpen, open]);

    return (
        <>
            <IngredientsDetail data={data} open={open} openHandle={openHandle} />
            <div className={`${elementStyle.card}`} onClick={() => openHandle()}>
                <Counter count={1} size="default" extraClass="m-1" />
                <div className="pl-4 pr-4"><img alt={data.name} src={data.image} /></div>
                <div className={`${elementStyle.price} mt-1 mb-1`}>
                    <span className="text text_type_digits-default">{data.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={elementStyle.name}>{data.name}</div>
            </div>
        </>
    );
}

export default BurgerElement;