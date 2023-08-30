import Loader from "../../components/loader";
import OrderList from "../../components/order-list"
import { wsClose, wsInit } from "../../services/orders/orders-slice";
import RoutesList from "../../services/routes";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { useEffect } from 'react';
import pageStyle from './style.module.sass';
import { ACCESS_TOKEN_FIELD } from "../../config/api";

const OrdersPage: React.FC = () => {
    
    const dispatch = useAppDispatch();
    const token = localStorage.getItem(ACCESS_TOKEN_FIELD);

    const {
        data = null,
        isLoading
    } = useAppSelector(store => store.orders);

    useEffect(() => {
        dispatch(wsInit(`wss://norma.nomoreparties.space/orders?token=${token}`));
        return () => { dispatch(wsClose()); }
    }, [dispatch, token]);

    return isLoading ? (
        <div className={pageStyle.loader}><Loader /></div>
    ) : (
        <OrderList viewStatus={true} route={RoutesList.DETAIL_PROFILE_ORDERS} data={data?.orders ?? []} />
    );
}

export default OrdersPage;