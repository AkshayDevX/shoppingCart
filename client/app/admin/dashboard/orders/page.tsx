"use client";
import { useOrdersQuery } from "@/actions/orders/getAllOrders";

const OrdersListAdmin = () => {
  const { data: orders } = useOrdersQuery();

  return (
    <div className="mt-7">
      <h1 className="text-xl font-bold">Orders</h1>
      <div className="overflow-x-auto mt-4">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>User Name</th>
              <th>Total Price</th>
              <th>Products</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {orders &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <div>
                      <div className="font-bold">{order?.username}</div>
                    </div>
                  </td>
                  <td>{order?.totalPrice}</td>
                  <td className="px-4 py-2 text-gray-700">
                    <div className="space-y-2">
                      {order?.products &&
                        order?.products.map((product) => (
                          <div
                            key={product.productId._id}
                            className="bg-gray-100 p-2 rounded-lg shadow-sm"
                          >
                            <p className="font-semibold">
                              {product.productId.name}
                            </p>
                            <p>Price: ${product.productId.price}</p>
                            <p>Quantity: {product.quantity}</p>
                          </div>
                        ))}
                    </div>
                  </td>
                  <td>{new Date(order?.createdAt).toDateString()}</td>
                  <td>
                    {new Date(order?.createdAt).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </td>
                </tr>
              ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>User Name</th>
              <th>Total Price</th>
              <th>Products</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default OrdersListAdmin;
