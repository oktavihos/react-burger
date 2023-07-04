import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useMemo, useState, useContext } from "react";
import { BurgerActionTypes, BurgerTypes, TBurgerDataConstructor } from "../app/types";
import constructorStyle from './style.module.sass';
import OrderDetails from "../order-details";
import { BurgerContext } from "../services/app-context";

const BurgerConstructor: React.FC = () => {

    const { burgerState, burgerDispatch } = useContext(BurgerContext);

    const [bun, other, sum] = useMemo<[TBurgerDataConstructor | null, TBurgerDataConstructor[], number]>(() => {
        let bun: TBurgerDataConstructor | null = null;
        let other: TBurgerDataConstructor[] = [];
        let sum: number = 0;

        burgerState?.constructor.forEach(item => {
            if(item.type === BurgerTypes.BUN) bun = item;
            else other.push(item);
            sum += item.price;
        });

        return [bun, other, sum];
    }, [JSON.stringify(burgerState)]); // eslint-disable-line react-hooks/exhaustive-deps

    const [open, setOpen] = useState(false);

    const closeModalHandle = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const deleteItemHandle = (guid: number) => {
        let removeIndex = burgerState?.constructor.findIndex(item => item.guid === guid);
        if(burgerDispatch && removeIndex && removeIndex > -1) burgerDispatch({type: BurgerActionTypes.CONSTRUCTOR_DELETE, payload: removeIndex})
    }

    return (
        <>
            {open && <OrderDetails closeModalHandle={closeModalHandle} />}
            <div className={`${constructorStyle.currentList} mb-25`}>
                {bun && <ConstructorElement
                    extraClass="ml-7"
                    type="top"
                    isLocked
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                />}
                <div className={`${constructorStyle.scrollList} scroll scroll-view`}>
                    {other.map((item, index) => {
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
                {bun && <ConstructorElement
                    extraClass="ml-7"
                    type="bottom"
                    isLocked
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                />}
            </div>
            <div className={constructorStyle.total}>
                <span className={`${constructorStyle.price} text text_type_digits-medium`}>{sum}</span>
                <CurrencyIcon type="primary" />
                <Button onClick={() => setOpen(true)} extraClass="ml-10" htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </>
    );
}

export default BurgerConstructor;