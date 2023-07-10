import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useMemo, useState, useContext } from "react";
import constructorStyle from './style.module.sass';
import OrderDetails from "../order-details";
import { BurgerConstructorContext } from "../../services/burger-constructor-context";
import { ConstructorActionTypes } from "../../services/reducers/burger-constructor/types";
import { BurgerIngredientsContext } from "../../services/burger-ingredients-context";
import { IngredientsActionTypes } from "../../services/reducers/burger-ingredients/types";
import useRequest from "../../hooks/use-request";
import { TOrderItems } from "./types";
import { TOrderData } from "../order-details/types";

const BurgerConstructor: React.FC = () => {

    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState<TOrderData|undefined>(undefined);
    const [errors, setErrors] = useState<string[]>([]);
    const { constructorState, constructorDispatch } = useContext(BurgerConstructorContext);
    const { ingredientsDispatch } = useContext(BurgerIngredientsContext);

    const [total, orderItems] = useMemo<[number, TOrderItems]>(() => {
        let total: number = 0;
        let orderItems: TOrderItems = {ingredients: []};

        constructorState?.ingredients.forEach(item => {
            total += item.price;
            orderItems.ingredients.push(item._id);
        });

        if(constructorState?.bun){
            total += constructorState.bun.price * 2;
            orderItems.ingredients.push(constructorState.bun._id, constructorState.bun._id);
        }

        return [total, orderItems];
    }, [constructorState]); // eslint-disable-line react-hooks/exhaustive-deps

    const sendOrder = useRequest('orders', 'POST', orderItems);

    const closeModalHandle = useCallback(() => {
        setOpen(false);
        setOrder(undefined);
        if(constructorDispatch) constructorDispatch({type: ConstructorActionTypes.RESET});
        if(ingredientsDispatch) ingredientsDispatch({type: IngredientsActionTypes.RESET});
    }, [setOpen, setOrder, constructorDispatch, ingredientsDispatch]);

    const deleteItemHandle = (guid: string) => {
        let data = constructorState?.ingredients.find(item => item.guid === guid);
        if(constructorDispatch) constructorDispatch({type: ConstructorActionTypes.DELETE_INGREDIENT, payload: guid});
        if(ingredientsDispatch && data) ingredientsDispatch({type: IngredientsActionTypes.DESCREMENT, payload: data._id})
    }

    const submitOrderHandle = () => {
        if(!constructorState?.bun || constructorState?.ingredients.length === 0) return false;
        setOpen(true);
        sendOrder().then(result => setOrder(result)).catch(error => setErrors([error]));
    }

    return (
        <>
            {open && <OrderDetails data={order} errors={errors} closeModalHandle={closeModalHandle} />}
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
                <Button onClick={submitOrderHandle} extraClass="ml-10" htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </>
    );
}

export default BurgerConstructor;