import Loader from "../../components/loader";
import OrderList from "../../components/order-list"
import { wsInit } from "../../services/orders/orders-slice";
import RoutesList from "../../services/routes";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { useEffect } from 'react';
import pageStyle from './style.module.sass';

const OrdersPage: React.FC = () => {
    
    const dispatch = useAppDispatch();

    const {
        data = null,
        isLoading
    } = useAppSelector(store => store.orders);

    useEffect(() => {
        dispatch(wsInit("wss://norma.nomoreparties.space/orders"));
    }, [dispatch]);

    return isLoading ? (
        <div className={pageStyle.loader}><Loader /></div>
    ) : (
        <OrderList viewStatus={true} route={RoutesList.DETAIL_PROFILE_ORDERS} data={data?.orders ?? []} />
    );
}

export default OrdersPage;