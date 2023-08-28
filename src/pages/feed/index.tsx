import { useEffect, useMemo } from "react";
import OrderFeed from "../../components/order-feed";
import OrderList from "../../components/order-list";
import { useAppDispatch, useAppSelector } from "../../services/store";
import MainTemplate from "../../templates/main";
import feedStyle from "./style.module.sass";
import { wsInit } from "../../services/feed/feed-slice";
import { EOrderStatuses } from "../../services/orders/types";
import LoaderPage from "../../components/loader-page";
import RoutesList from "../../services/routes";

const FeedPage: React.FC = () => {
    
    const dispatch = useAppDispatch();

    const {
        data = null,
        isLoading
    } = useAppSelector(store => store.feed);

    useEffect(() => {
        dispatch(wsInit("wss://norma.nomoreparties.space/orders/all"));
    }, [dispatch]);

    const [orderWorks, orderSuccess] = useMemo(() => {
        return [
            data?.orders.filter(item => item.status === EOrderStatuses.PENDING).slice(0, 5).map(item => item.number) ?? [],
            data?.orders.filter(item => item.status === EOrderStatuses.DONE).slice(0, 5).map(item => item.number) ?? []
        ];
    }, [data])
    

    return (
        <MainTemplate>
            {isLoading ? (
                <LoaderPage />
            ) : (
                <>
                    <section className={`${feedStyle.section} pr-5`}>
                        <h1 className='text text_type_main-large mb-5'>Лента заказов</h1>
                        <OrderList viewStatus={false} route={RoutesList.DETAIL_FEED} data={data?.orders ?? []} />
                    </section>
                    <section className={`${feedStyle.section} pl-5 pt-15 pb-10`}>
                        <OrderFeed
                            total={data?.total ?? 0}
                            totalDay={data?.totalToday ?? 0}
                            orderWorks={orderWorks}
                            orderSuccess={orderSuccess}
                        />
                    </section>
                </>
            )}
        </MainTemplate>
    );
}

export default FeedPage