import Icon from '../../images/success.svg';
import Modal from "../modal";
import { TOrderDetailsProps } from "./types";
import orderDetailsStyle from './style.module.sass';
import React from 'react';
import Loader from '../loader';

const OrderDetails: React.FC<TOrderDetailsProps> = React.memo(({error = undefined, data = undefined, closeModalHandle = () => {}}) => {
    return (
        <Modal extraClass={orderDetailsStyle.modal} closeModalHandle={closeModalHandle}>
            {!data ? (
                <>
                    {error ? <div className={orderDetailsStyle.error}>{error}</div> : <Loader />}
                </>
            ) : (
                <>
                    <div className={`mt-20 mb-8 text text_type_digits-large`}>{data.order.number}</div>
                    <div className={`text text_type_main-medium`}>идентификатор заказа</div>
                    <div className={`${orderDetailsStyle.success} mb-15 mt-15`}><img src={Icon} alt="" /></div>
                    <div className={`mb-2 text text_type_main-default`}>Ваш заказ начали готовить</div>
                    <div className={`mb-15 text text_type_main-default ${orderDetailsStyle.description}`}>Дождитесь готовности на орбитальной станции</div>
                </>
            )}
        </Modal>
    )
});

export default OrderDetails;