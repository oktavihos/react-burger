import style from './style.module.sass';
import { TFeedProps } from './types';

const OrderFeed: React.FC<TFeedProps> = ({total, totalDay, orderSuccess, orderWorks}) => {
    return (
        <div className='scroll pr-2'>
            <div className={`${style.statusesBlock} mb-15`}>
                <div className={`${style.statusesWrapper} mr-9`}>
                    <div className='text text_type_main-medium mb-6'>Готовы:</div>
                    <div className={style.statusesContainer}>
                        {orderSuccess.map(item => (
                            <p key={item} className={`text text_type_main-medium ${style.successItem}`}>{item}</p>
                        ))}
                    </div>
                </div>
                <div className={style.statusesWrapper}>
                    <div className='text text_type_main-medium mb-6'>В работе:</div>
                    <div className={style.statusesContainer}>
                        {orderWorks.map(item => (
                            <p key={item} className='text text_type_main-medium'>{item}</p>
                        ))}
                    </div>
                </div>
            </div>
            <div className='mb-15'>
                <div className='text text_type_main-medium mr-9'>Выполнено за все время:</div>
                <p className="text text_type_digits-large">{total}</p>
            </div>
            <div className='mb-15'>
                <div className='text text_type_main-medium mr-9'>Выполнено за сегодня:</div>
                <p className="text text_type_digits-large">{totalDay}</p>
            </div>
        </div>
    );
}

export default OrderFeed;