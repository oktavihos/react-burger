import OrderInfo from "../../components/order-info";
import { TOrderInfoProps } from "../../components/order-info/types";
import MainTemplate from "../../templates/main";

const OrderInfoPage: React.FC<TOrderInfoProps> = ({searchStore}) => {
    return (
        <MainTemplate>
            <section className="center-container">
                <OrderInfo searchStore={searchStore} />
            </section>
        </MainTemplate>
    );
}

export default OrderInfoPage;