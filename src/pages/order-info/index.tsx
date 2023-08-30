import { useEffect } from "react";
import OrderInfo from "../../components/order-info";
import MainTemplate from "../../templates/main";
import { wsClose, wsInit } from "../../services/orders/orders-slice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import LoaderPage from "../../components/loader-page";
import { ACCESS_TOKEN_FIELD } from "../../config/api";

const OrderInfoPage: React.FC = () => {

    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(store => store.orders.isLoading);
    const token = localStorage.getItem(ACCESS_TOKEN_FIELD);

    useEffect(() => {
        dispatch(wsInit(`wss://norma.nomoreparties.space/orders?token=${token}`));
        return () => { dispatch(wsClose()); }
    }, [dispatch, token]);
    
    return (
        <MainTemplate>
            {isLoading ? (
                <LoaderPage />
            ) : (
                <section className="center-container">
                    <OrderInfo searchStore={'orders'} />
                </section>
            )}
        </MainTemplate>
    );
}

export default OrderInfoPage;