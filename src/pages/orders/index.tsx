// src/pages/orders/index.tsx
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const OrdersPage = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);

  return (
    <div>
      <h1>Orders</h1>
      <div>
        <Link href="/orders/add">+ Add New Order</Link>
      </div>
      <div>
        <h2>Order List</h2>
        {orders.length === 0 ? (
          <p>No orders available</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                <Link href={`/orders/edit/${order.id}`}>{order.consumerName}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
