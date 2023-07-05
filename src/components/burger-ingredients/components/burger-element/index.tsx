import { TBurgerElementProps } from "./types";
import elementStyle from './style.module.sass';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useContext } from "react";
import { BurgerConstructorContext } from "../../../../services/burger-constructor-context";
import { ConstructorActionTypes } from "../../../../store/burger-constructor/types";
import { BurgerIngredientsContext } from "../../../../services/burger-ingredients-context";
import { v4 as uuidv4 } from 'uuid';
import { IngredientsActionTypes } from "../../../../store/burger-ingredients/types";

const BurgerElement: React.FC<TBurgerElementProps> = React.memo(({data, selectHandle = () => {}}) => {

    const { constructorDispatch } = useContext(BurgerConstructorContext);
    const { ingredientsDispatch } = useContext(BurgerIngredientsContext);

    const addIngredientdHandle = () => {
        if(constructorDispatch) constructorDispatch({type: ConstructorActionTypes.ADD_INGREDIENT, payload: {...data, guid: uuidv4()}});
        if(ingredientsDispatch){
            ingredientsDispatch({type: IngredientsActionTypes.INCREMENT, payload: data._id})
        }
        selectHandle(data)
    }

    return (
        <>
            <div className={`${elementStyle.card}`} onClick={() => addIngredientdHandle()}>
                {data.count ? <Counter count={data.count} size="default" extraClass="m-1" /> : undefined}
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