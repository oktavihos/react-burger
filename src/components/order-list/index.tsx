import { TOrderListProps } from ".//types";
import OrderItem from "./components/order-item";

const OrderList: React.FC<TOrderListProps> = ({data = [], route, viewStatus}) => {
    return (
        <div className="scroll mb-10 pr-2">
            {data.map(order => {
                return <OrderItem viewStatus={viewStatus} route={route} key={order._id} data={order} />;
            })}
        </div>
    );
}

export default OrderList;