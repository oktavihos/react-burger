import OrderItem from "./components/order-item";

const OrderList: React.FC = () => {
    return (
        <div className="scroll mb-10 pr-2">
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
        </div>
    );
}

export default OrderList;