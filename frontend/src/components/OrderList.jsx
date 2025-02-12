// components/OrderList.jsx
import apiService from "../services/apiService";
import PropTypes from 'prop-types';

export default function OrderList({ orders, refreshOrders }) {
    const handleStatusChange = async (id, status) => {
        await apiService.updateOrder(id, status);
        refreshOrders();
    };

    const handleCompleteOrder = async (id) => {
        await apiService.deleteOrder(id);
        refreshOrders();
    };

    return (
        <ul className="mt-4 w-full" style={{ listStyle: "none", padding: 0 }}>
            {orders.map(order => (
                <li
                    key={order.id}
                    style={{
                        backgroundColor: order.status === "Being Cooked" ? "#ff6b3b1f" : "#8bc34a1f",
                        padding: "10px 20px",
                        marginBottom: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    className="text-sm text-gray-700 border p-2 mb-2 flex justify-between w-full"
                >
                    <span style={{ width: "20%", fontWeight: "bold", textAlign: "center" }}>{order.menuItem}</span>
                    <span className="price-wrapper" style={{ width: "20%", textAlign: "center" }}>
                        <span className="price"
                            style={{
                                backgroundColor: "#ffffff2f",
                                padding: "4px 8px",
                                borderRadius: "20px",
                                fontSize: "12px",
                                border: "1px solid #fff",
                                fontWeight: "bold"
                            }}
                        >
                            ${order.price}
                        </span>
                    </span>
                    <span className="status-wrapper" style={{ padding: "4px", width: "30%" }}>
                        <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className="border p-1 mx-2"
                            style={{ padding: "4px" }}
                        >
                            <option value="Being Cooked">Being Cooked</option>
                            <option value="Waiting for Payment">Waiting for Payment</option>
                        </select>
                    </span>
                    <button
                        onClick={() => handleCompleteOrder(order.id)}
                        className="px-2 py-1 bg-blue-500 text-white rounded"
                        style={{ width: "30%", fontSize: "12px" }}
                    >
                        Mark Completed
                    </button>
                </li>
            ))}
        </ul>
    );
}
OrderList.propTypes = {
    orders: PropTypes.array.isRequired,
    refreshOrders: PropTypes.func.isRequired,
};

// This component displays a list of orders. It uses the apiService to update and delete orders based on user actions.
// This component displays a list of orders. It uses the apiService to update and delete orders based on user actions.