import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderIngredient from "./components/order-ingredient";
import style from './style.module.sass';
import { useParams } from "react-router-dom";
import { TOrderInfoProps } from "./types";
import { useAppSelector } from "../../services/store";
import { StatusesLocale } from "../../services/orders/locale";
import { getTimeToString } from "../../utils/datetime";
import { useMemo } from "react";
import { TIngredient } from "../../services/ingredients/types";
import Loader from "../loader";

const OrderInfo: React.FC<TOrderInfoProps> = ({searchStore}) => {

    const { id } = useParams();
    const order = useAppSelector(store => store[searchStore].data?.orders.find(item => item._id === id));
    const isLoading = useAppSelector(store => store[searchStore].isLoading);
    const storeIngredients = useAppSelector(store => store.ingredients.data);

    const [total, uniqueIngredients] = useMemo(() => {

        let uniqueIngredients: TIngredient[] = [];
        let total: number = 0;

        order?.ingredients.forEach((ingredientId) => {
            let ingredient = storeIngredients.find(ingredient => ingredient._id === ingredientId);
            if(ingredient){
                total += ingredient.price;
                let hasIngredient = uniqueIngredients.findIndex(ingredient => ingredient._id === ingredientId);
                if(hasIngredient < 0) uniqueIngredients.push({...ingredient, count: 1});
                else{
                    let currentItem = uniqueIngredients[hasIngredient];
                    uniqueIngredients[hasIngredient] = {...currentItem, count: (currentItem.count ?? 0) + 1};
                }
            }
        });

        return [total, uniqueIngredients];
    }, [order?.ingredients, storeIngredients]);

    return isLoading ? <div className={style.loader}><Loader /></div> : (!order ? (
            <p className={`text text_type_digits-default text-center`}>Заказ не найден</p>
        ) : (
        <div className={style.container}>
            <p className={`${style.orderTitle} text text_type_digits-default text-center`}>#{order.number}</p>
            <p className="text text_type_main-medium mt-10">{order.name}</p>
            <p className="text text_type_main-small mt-3">{StatusesLocale[order.status]}</p>
            <p className="text text_type_main-medium mt-15">Состав:</p>

            <div className={`scroll mt-6 pr-6 ${style.itemsContainer}`}>
                {uniqueIngredients.map((item, index) => <OrderIngredient key={index} data={item} />)}
            </div>
            
            <div className={`${style.orderFoot} mt-10`}>
                <p className="text text_type_main-default text_color_inactive">{getTimeToString(order.createdAt)}</p>
                <div className={`${style.priceContainer} ml-6`}>
                    <span className="mr-2 text text_type_digits-default">{total}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    ));
}

export default OrderInfo;