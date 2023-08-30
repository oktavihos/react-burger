import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.sass';
import { TOrderIngredientProps } from './types';

const OrderIngredient: React.FC<TOrderIngredientProps> = ({data}) => {
    return (
        <div className={`${style.item} mb-4`}>
            <div className="imgCircle">
                <img src={data.image_large} alt="" />
            </div>
            <p className={`text text_type_main-small ml-4 ${style.name}`}>{data.name}</p>
            <div className={`${style.priceContainer} ml-6`}>
                <span className="mr-2 text text_type_digits-default">{data.count ?? 1} x {data.price}</span>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    );
}

export default OrderIngredient;