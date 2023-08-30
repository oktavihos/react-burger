import { useEffect } from 'react';
import OrderInfo from "../../components/order-info";
import { useAppDispatch, useAppSelector } from "../../services/store";
import MainTemplate from "../../templates/main";
import { wsClose, wsInit } from '../../services/feed/feed-slice';
import LoaderPage from '../../components/loader-page';

const FeedInfoPage: React.FC = () => {

    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(store => store.feed.isLoading);

    useEffect(() => {
        dispatch(wsInit("wss://norma.nomoreparties.space/orders/all"));
        return () => { dispatch(wsClose()); }
    }, [dispatch]);

    return (
        <MainTemplate>
            {isLoading ? (
                <LoaderPage />
            ) : (
                <section className="center-container">
                    <OrderInfo searchStore={'feed'} />
                </section>
            )}
        </MainTemplate>
    );
}

export default FeedInfoPage;