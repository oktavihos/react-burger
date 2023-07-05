import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useMemo, useState, useContext } from "react";
import constructorStyle from './style.module.sass';
import OrderDetails from "../order-details";
import { BurgerConstructorContext } from "../../services/burger-constructor-context";
import { ConstructorActionTypes } from "../../store/burger-constructor/types";
import { BurgerIngredientsContext } from "../../services/burger-ingredients-context";
import { IngredientsActionTypes } from "../../store/burger-ingredients/types";

const BurgerConstructor: React.FC = () => {

    const { constructorState, constructorDispatch } = useContext(BurgerConstructorContext);
    const { ingredientsDispatch } = useContext(BurgerIngredientsContext);

    const total = useMemo<number>(() => {
        let total: number = 0;

        constructorState?.ingredients.forEach(item => {
            total += item.price;
        });

        if(constructorState?.bun) total += constructorState.bun.price * 2;

        return total;
    }, [JSON.stringify(constructorState)]); // eslint-disable-line react-hooks/exhaustive-deps

    const [open, setOpen] = useState(false);

    const closeModalHandle = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const deleteItemHandle = (guid: string) => {
        let data = constructorState?.ingredients.find(item => item.guid === guid);
        if(constructorDispatch) constructorDispatch({type: ConstructorActionTypes.DELETE_INGREDIENT, payload: guid});
        if(ingredientsDispatch && data) ingredientsDispatch({type: IngredientsActionTypes.DESCREMENT, payload: data._id})
    }

    return (
        <>
            {open && <OrderDetails closeModalHandle={closeModalHandle} />}
            <div className={`${constructorStyle.currentList} mb-25`}>
                {constructorState?.bun && <ConstructorElement
                    extraClass="ml-7"
                    type="top"
                    isLocked
                    text={`${constructorState.bun.name} (верх)`}
                    price={constructorState.bun.price}
                    thumbnail={constructorState.bun.image_mobile}
                />}
                <div className={`${constructorStyle.scrollList} scroll scroll-view`}>
                    {constructorState?.ingredients.map(item => {
                        return (
                            <div key={item.guid} className={constructorStyle.dragItem}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    extraClass="ml-1"
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image_mobile}
                                    handleClose={() => deleteItemHandle(item.guid)}
                                />
                            </div>
                        );
                    })}
                </div>
                {constructorState?.bun && <ConstructorElement
                    extraClass="ml-7"
                    type="bottom"
                    isLocked
                    text={`${constructorState.bun.name} (низ)`}
                    price={constructorState.bun.price}
                    thumbnail={constructorState.bun.image_mobile}
                />}
            </div>
            <div className={constructorStyle.total}>
                <span className={`${constructorStyle.price} text text_type_digits-medium`}>{total}</span>
                <CurrencyIcon type="primary" />
                <Button onClick={() => setOpen(true)} extraClass="ml-10" htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </>
    );
}

export default BurgerConstructor;