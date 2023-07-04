import { TBurgerElementProps } from "./types";
import elementStyle from './style.module.sass';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useContext } from "react";
import { BurgerActionTypes } from "../../../app/types";
import { BurgerContext } from "../../../services/app-context";

const BurgerElement: React.FC<TBurgerElementProps> = React.memo(({data, selectHandle = () => {}}) => {

    const { burgerDispatch } = useContext(BurgerContext);

    const addIngredientdHandle = () => {
        if(burgerDispatch) burgerDispatch({type: BurgerActionTypes.CONSTRUCTOR_ADD, payload: {...data, guid: Date.now() + Math.random()}});
        selectHandle(data)
    }

    return (
        <>
            <div className={`${elementStyle.card}`} onClick={() => addIngredientdHandle()}>
                {data.count && <Counter count={data.count} size="default" extraClass="m-1" />}
                <div className="pl-4 pr-4"><img alt={data.name} src={data.image} /></div>
                <div className={`${elementStyle.price} mt-1 mb-1`}>
                    <span className="text text_type_digits-default">{data.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={elementStyle.name}>{data.name}</div>
            </div>
        </>
    );
});

export default BurgerElement;