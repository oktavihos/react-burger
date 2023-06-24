import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TBurgerConstructorProps } from "./types";
import { useCallback, useMemo, useState } from "react";
import { BurgerTypes, TBurgerData } from "../app/types";
import constructorStyle from './style.module.sass';
import OrderDetails from "../order-details";

const BurgerConstructor: React.FC<TBurgerConstructorProps> = ({data = []}) => {

    const [bun, other, sum] = useMemo<[TBurgerData | null, TBurgerData[], number]>(() => {
        let bun: TBurgerData | null = null;
        let other: TBurgerData[] = [];
        let sum: number = 0;

        data.forEach(item => {
            if(item.type === BurgerTypes.BUN) bun = item;
            else other.push(item);
            sum += item.price;
        });

        return [bun, other, sum];
    }, [JSON.stringify(data)]); // eslint-disable-line react-hooks/exhaustive-deps

    const [open, setOpen] = useState(false);

    const openHandle = useCallback(() => {
        setOpen(!open);
    }, [open, setOpen]);

    return (
        <>
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
                            <div key={index} className={constructorStyle.dragItem}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    extraClass="ml-1"
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image_mobile}
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
                <OrderDetails open={open} openHandle={openHandle} />
                <span className={`${constructorStyle.price} text text_type_digits-medium`}>{sum}</span>
                <CurrencyIcon type="primary" />
                <Button onClick={openHandle} extraClass="ml-10" htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
        </>
    );
}

export default BurgerConstructor;