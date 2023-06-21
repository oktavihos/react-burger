import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TBurgerConstructorProps } from "./types";
import { useMemo } from "react";
import { TBurgerData } from "../app/types";
import constructorStyle from './style.module.sass';

const BurgerConstructor = ({data = []}: TBurgerConstructorProps) => {

    const [bun, other, sum] = useMemo<[TBurgerData | null, TBurgerData[], number]>(() => {
        let bun: TBurgerData | null = null;
        let other: TBurgerData[] = [];
        let sum: number = 0;

        data.forEach(item => {
            if(item.type === 'bun') bun = item;
            else other.push(item);
            sum += item.price;
        });

        return [bun, other, sum];
    }, [data]);

    return (
        <>
            <div className="mb-25" style={{ display: 'flex', flexDirection: 'column', gap: '10px', minHeight: 0 }}>
                {bun && <ConstructorElement
                    extraClass="ml-8"
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image_large}
                />}
                <div className="scroll scroll-view" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {other.map((item, index) => {
                        return (
                            <div key={index} className={constructorStyle.dragItem}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image_large}
                                />
                            </div>
                        );
                    })}
                </div>
                {bun && <ConstructorElement
                    extraClass="ml-8"
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image_large}
                />}
            </div>
            <div className={constructorStyle.total}>
                    <span className={`${constructorStyle.price} text text_type_digits-medium`}>{sum}</span>
                    <CurrencyIcon type="primary" />
                    <Button extraClass="ml-10" htmlType="button" type="primary" size="medium">
                        Оформить заказ
                    </Button>
            </div>
        </>
    );
}

export default BurgerConstructor;