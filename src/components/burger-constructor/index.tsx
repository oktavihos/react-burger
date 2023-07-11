import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useMemo, useState } from "react";
import constructorStyle from './style.module.sass';
import OrderDetails from "../order-details";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { TOrderItems } from "../../services/constructor/constructor-slice/type";
import { addIngredient, deleteIngredient, resetConstructor, sendOrder } from "../../services/constructor/constructor-slice";
import { decrementIngredient, incrementIngredient, resetIngredients } from "../../services/ingredients/ingredients-slice";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import { BurgerTypes, DragTypes } from "../app/types";
import { TIngredient } from "../../services/ingredients/ingredients-slice/types";
import ConstructorDragItem from "./components/drag-item";
import EmptyItem from "./components/empty-item";
import { EmptyItemTypes } from "./components/empty-item/types";

const BurgerConstructor: React.FC = () => {

    const [open, setOpen] = useState(false);
    const { data, bun, order } = useAppSelector(state => state.burgerConstructor);
    const dispatch = useAppDispatch();

    const [total, orderItems] = useMemo<[number, TOrderItems]>(() => {
        let total: number = 0;
        let orderItems: TOrderItems = {ingredients: []};

        data.forEach(item => {
            total += item.price;
            orderItems.ingredients.push(item._id);
        });

        if(bun){
            total += bun.price * 2;
            orderItems.ingredients.push(bun._id, bun._id);
        }

        return [total, orderItems];
    }, [data, bun]);

    const closeModalHandle = useCallback(() => {
        setOpen(false);
        dispatch(resetIngredients());
        dispatch(resetConstructor());
    }, [setOpen, dispatch]);

    const deleteItemHandle = (guid: string) => {
        let deleteItem = data.find(item => item.guid === guid);
        dispatch(deleteIngredient(guid))
        if(deleteItem) dispatch(decrementIngredient(deleteItem._id));
    }

    const submitOrderHandle = () => {
        if(!bun || data.length === 0) return false;
        setOpen(true);
        dispatch(sendOrder(orderItems));
    }

    const [{item, isHover}, dropTarget] = useDrop({
        accept: DragTypes.INGREDIENTS,
        drop(data: TIngredient){
            dispatch(addIngredient({...data, guid: uuidv4()}));
            dispatch(incrementIngredient(data._id));
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
            item: monitor.getItem()
        })
    });

    return (
        <>
            {open && <OrderDetails data={order} closeModalHandle={closeModalHandle} />}
            <div style={{}} ref={dropTarget} className={`${constructorStyle.currentList} mb-25`}>
                {bun ? <ConstructorElement
                    extraClass="ml-7"
                    type="top"
                    isLocked
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                /> : <EmptyItem active={(isHover && item.type === BurgerTypes.BUN)} type={EmptyItemTypes.TOP} text="Добавьте булку" />}
                {data.length > 0 ? (
                    <div className={`${constructorStyle.scrollList} scroll scroll-view`}>
                        {data.map((item, index) => {
                            return (
                                <ConstructorDragItem index={index} key={item.guid} item={item} deleteItemHandle={deleteItemHandle} />
                            );
                        })}
                    </div>
                ) : <EmptyItem active={(isHover && item.type !== BurgerTypes.BUN)} type={EmptyItemTypes.CENTER} text="Добавьте ингредиент" />}
                {bun ? <ConstructorElement
                    extraClass="ml-7"
                    type="bottom"
                    isLocked
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                /> : <EmptyItem active={(isHover && item.type === BurgerTypes.BUN)} type={EmptyItemTypes.BOTTOM} text="Добавьте булку" />}
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