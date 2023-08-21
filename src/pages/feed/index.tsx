import OrderFeed from "../../components/order-feed";
import OrderInfo from "../../components/order-info";
import OrderList from "../../components/order-list";
import MainTemplate from "../../templates/main";
import feedStyle from "./style.module.sass";

const FeedPage: React.FC = () => {
    return (
        <MainTemplate>
            <section className={`${feedStyle.section} pr-5`}>
                <h1 className='text text_type_main-large mb-5'>Лента заказов</h1>
                <OrderList />
            </section>
            <section className={`${feedStyle.section} pl-5 pt-15 pb-10`}>
                <OrderFeed />
            </section>
            <OrderInfo />
        </MainTemplate>
    );
}

export default FeedPage