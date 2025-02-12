// components/OrderForm.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import OrderFactory from "../services/OrderFactory";
import apiService from "../services/apiService";

const menuItems = [
    { name: "Burger", price: 5 },
    { name: "Pizza", price: 8 },
    { name: "Fries", price: 3 },
    { name: "Soda", price: 2 },
];

export default function OrderForm({ refreshOrders }) {
    const [selectedItem, setSelectedItem] = useState(menuItems[0]);

    const handleAddOrder = async () => {
        const newOrder = OrderFactory.createOrder(selectedItem);
        await apiService.addOrder(newOrder);
        refreshOrders();
    };

    return (
        <div className="mb-4" style={{ display: "flex", gap: "10px" }}>
            <select
                value={selectedItem.name}
                onChange={(e) => setSelectedItem(menuItems.find(item => item.name === e.target.value))}
                className="border p-2"
                style={{ width: "100%" }}
            >
                {menuItems.map(item => (
                    <option key={item.name} value={item.name}>
                        {item.name} - ${item.price}
                    </option>
                ))}
            </select>
            <button
                onClick={handleAddOrder}
                className="px-4 py-2 bg-green-500 text-white rounded"
                style={{ width: "200px" }}
            >
                Add Order
            </button>
        </div>
    );
}

OrderForm.propTypes = {
    refreshOrders: PropTypes.func.isRequired,
};

// This component displays a form to add an order. It uses the OrderFactory to create an order object and the apiService to add the order to the backend.
// This component displays a form to add an order. It uses the OrderFactory to create an order object and the apiService to add the order to the backend.