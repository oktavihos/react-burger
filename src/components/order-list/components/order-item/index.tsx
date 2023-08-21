import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './style.module.sass';

const OrderItem: React.FC = () => {
    return (
        <div className={`constructor-element mb-4 ${style.item}`}>
            <div className={style.row}>
                <div className='text text_type_digits-default'>#123123123</div>
                <div className='text text_type_main-default text_color_inactive'>Сегодня, 16:20</div>
            </div>
            <p className="text text_type_main-medium mt-6">
                Death Star Starship Main бургер
            </p>
            <div className={`${style.row} mt-6`}>
                <div className={style.imgCircleContainer}>
                    <div className={style.imgCircle}>
                        <img src="https://code.s3.yandex.net/react/code/sauce-02-mobile.png" alt="" />
                    </div>
                    <div className={style.imgCircle}>
                        <img src="https://code.s3.yandex.net/react/code/sauce-02-mobile.png" alt="" />
                    </div>
                    <div className={style.imgCircle}>
                        <img src="https://code.s3.yandex.net/react/code/sauce-02-mobile.png" alt="" />
                    </div>
                    <div className={style.imgCircle}>
                        <img src="https://code.s3.yandex.net/react/code/sauce-02-mobile.png" alt="" />
                    </div>
                    <div className={style.imgCircle}>
                        <img src="https://code.s3.yandex.net/react/code/sauce-02-mobile.png" alt="" />
                    </div>
                    <div className={`${style.imgCircle}`}>
                        <span className='text text_type_digits-default'>+3</span>
                        <img src="https://code.s3.yandex.net/react/code/sauce-02-mobile.png" alt="" />
                    </div>
                </div>
                <div className={`${style.priceContainer} ml-6`}>
                    <CurrencyIcon type="primary" />
                    <span className="ml-2 text text_type_digits-default">300</span>
                </div>
            </div>
        </div>
    );
}

export default OrderItem;