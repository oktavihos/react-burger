import Icon from '../../images/success.svg';
import Modal from "../modal";
import { TOrderDetailsProps } from "./types";
import orderDetailsStyle from './style.module.sass';

const OrderDetails: React.FC<TOrderDetailsProps> = ({open = false, openHandle = () => {}}) => {
    return (
        <Modal extraClass={orderDetailsStyle.modal} open={open} openHandle={openHandle}>
            <div className={`mt-20 mb-8 text text_type_digits-large`}>034536</div>
            <div className={`text text_type_main-medium`}>идентификатор заказа</div>
            <div className={`${orderDetailsStyle.success} mb-15 mt-15`}><img src={Icon} alt="" /></div>
            <div className={`mb-2 text text_type_main-default`}>Ваш заказ начали готовить</div>
            <div className={`mb-15 text text_type_main-default ${orderDetailsStyle.description}`}>Дождитесь готовности на орбитальной станции</div>
        </Modal>
    );
}

export default OrderDetails;