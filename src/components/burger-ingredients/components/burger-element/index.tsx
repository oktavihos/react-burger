import React from "react";
import { TBurgerElementProps } from "./types";
import elementStyle from './style.module.sass';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch } from "../../../../services/store";
import { selectIngredient } from "../../../../services/ingredients/ingredients-slice";
import { useDrag } from "react-dnd";
import { DragTypes } from "../../../../global.types";

const BurgerElement: React.FC<TBurgerElementProps> = React.memo(({data}) => {

    const dispatch = useAppDispatch();

    const selectIngredientHandle = () => {
        dispatch(selectIngredient(data));
    }

    const [{ opacity }, dragRef] = useDrag(
        () => ({
            type: DragTypes.INGREDIENTS,
            item: data,
            collect: monitor => ({
                opacity: monitor.isDragging() ? 0.5 : 1
            })
        }), []
    );

    return (
        <>
            <div style={{opacity}} draggable ref={dragRef} className={`${elementStyle.card}`} onClick={() => selectIngredientHandle()}>
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