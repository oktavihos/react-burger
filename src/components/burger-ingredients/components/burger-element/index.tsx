import React from "react";
import { TBurgerElementProps } from "./types";
import elementStyle from './style.module.sass';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { DragTypes } from "../../../../global.types";
import { useLocation, useNavigate } from "react-router";

const BurgerElement: React.FC<TBurgerElementProps> = React.memo(({data}) => {

    const navigate = useNavigate();
    const location = useLocation();

    const selectIngredientHandle = () => {
        navigate(`/ingredients/${data._id}`, {state: {backgroundLocation: location}})
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
            <div data-area="drag" style={{opacity}} draggable ref={dragRef} className={`${elementStyle.card}`} onClick={() => selectIngredientHandle()}>
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