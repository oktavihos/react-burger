import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.sass';
import { useLocation, useNavigate } from 'react-router-dom';
import { TOrderItemProps } from './types';
import { useAppSelector } from '../../../../services/store';
import { useMemo } from 'react';
import { StatusesLocale } from '../../../../services/orders/locale';
import { getTimeToString } from '../../../../utils/datetime';
import { TIngredient } from '../../../../services/ingredients/types';

const OrderItem: React.FC<TOrderItemProps> = ({data, route, viewStatus = true}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const storeIngredients = useAppSelector(store => store.ingredients.data);

    const [total, ingredients, countIngredients] = useMemo(() => {
        let total = 0;
        let ingredients: TIngredient[] = [];
        let count = 0;

        data.ingredients.forEach(ingredientId => {
            let ingredient = storeIngredients.find(ingredient => ingredient._id === ingredientId);
            if(ingredient){
                total += ingredient.price; count++;
                if(count <= 5) ingredients.push(ingredient);
            }
        });

        count -= 5;

        return [total, ingredients, count];
    }, [data.ingredients, storeIngredients]);


    const selectIngredientHandle = () => {
        navigate(route.replace(':id', data._id), {state: {backgroundLocation: location}})
    }

    return (
        <div className={`constructor-element mb-4 ${style.item}`} onClick={selectIngredientHandle}>
            <div className={style.row}>
                <div className='text text_type_digits-default'>#{data.number}</div>
                <div className='text text_type_main-default text_color_inactive'>{getTimeToString(data.createdAt)}</div>
            </div>
            <p className="text text_type_main-medium mt-6">
                {data.name}
            </p>
            {viewStatus && <p className={`text text_type_main-small mt-2 ${style[data.status]}`}>
                {StatusesLocale[data.status]}
            </p>}
            <div className={`${style.row} mt-6`}>
                <div className={style.imgCircleContainer}>
                    {ingredients.map((item, index) => {
                        return (
                            <div key={index} className={style.imgCircle}>
                                {index === 4 && countIngredients > 0 && (
                                    <span className='text text_type_digits-default'>+{countIngredients}</span>
                                )}
                                <img src={item.image_large} alt="" />
                            </div>
                        );
                    })}
                </div>
                <div className={`${style.priceContainer} ml-6`}>
                    <span className="mr-2 text text_type_digits-default">{total}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
}

export default OrderItem;