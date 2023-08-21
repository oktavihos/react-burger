import style from './style.module.sass';

const OrderFeed: React.FC = () => {
    return (
        <div className='scroll pr-2'>
            <div className={`${style.statusesContainer} mb-15`}>
                <div className={`${style.statusesWrapper} mr-9`}>
                    <div className='text text_type_main-medium mb-6'>Готовы:</div>
                    <p className={`text text_type_main-medium ${style.successItem}`}>12333333</p>
                    <p className={`text text_type_main-medium ${style.successItem}`}>12333333</p>
                    <p className={`text text_type_main-medium ${style.successItem}`}>12333333</p>
                    <p className={`text text_type_main-medium ${style.successItem}`}>12333333</p>
                    <p className={`text text_type_main-medium ${style.successItem}`}>12333333</p>
                </div>
                <div className={style.statusesWrapper}>
                    <div className='text text_type_main-medium mb-6'>В работе:</div>
                    <p className='text text_type_main-medium'>12333333</p>
                    <p className='text text_type_main-medium'>12333333</p>
                    <p className='text text_type_main-medium'>12333333</p>
                    <p className='text text_type_main-medium'>12333333</p>
                </div>
            </div>
            <div className='mb-15'>
                <div className='text text_type_main-medium mr-9'>Выполнено за все время:</div>
                <p className="text text_type_digits-large">12345</p>
            </div>
            <div className='mb-15'>
                <div className='text text_type_main-medium mr-9'>Выполнено за сегодня:</div>
                <p className="text text_type_digits-large">135</p>
            </div>
        </div>
    );
}

export default OrderFeed;