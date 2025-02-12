import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/orders"; // Change this after deploying backend

const menuItems = [
  { name: "Burger", price: 5 },
  { name: "Pizza", price: 8 },
  { name: "Fries", price: 3 },
  { name: "Soda", price: 2 },
];

export default function App() {
  const [orders, setOrders] = useState([]);
  const [selectedItem, setSelectedItem] = useState(menuItems[0]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get(API_URL);
    setOrders(res.data);
  };

  const handleAddOrder = async () => {
    const newOrder = {
      menuItem: selectedItem.name,
      price: selectedItem.price,
      status: "Being Cooked",
    };
    await axios.post(API_URL, newOrder);
    fetchOrders();
  };

  const handleStatusChange = async (id, status) => {
    await axios.put(`${API_URL}/${id}`, { status });
    fetchOrders();
  };

  const handleCompleteOrder = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchOrders();
  };

  return (
    <div className="p-5" style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2 className="text-lg font-bold mb-2">Fast Food Order Management</h2>
      <div className="mb-4" style={{ display: "flex", gap: "10px" }}>
        <select
          value={selectedItem.name}
          style={{ width: "100%" }}
          onChange={(e) => setSelectedItem(menuItems.find(item => item.name === e.target.value))}
          className="border p-2 mr-2"
        >
          {menuItems.map(item => (
            <option key={item.name} value={item.name}>
              {item.name} - ${item.price}
            </option>
          ))}
        </select>
        <button style={{ width: "200px" }} onClick={handleAddOrder} className="px-4 py-2 bg-green-500 text-white rounded">
          Add Order
        </button>
      </div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "10px 0",
        backgroundColor: "#333",
        fontWeight: "bold",
        padding: "10px 20px",
      }}>
        <span className="font-bold" style={{ width: "20%" , textAlign:"center" }}>Item</span>
        <span className="font-bold" style={{ width: "20%" , textAlign:"center" }}>Price</span>
        <span className="font-bold" style={{ width: "30%" , textAlign:"center" }}>Status</span>
        <span className="font-bold" style={{ width: "30%" , textAlign:"center" }}>Actions</span>
      </div>
      <ul className="mt-4 w-full" style={{ listStyle: "none", padding: 0 }}>
        {orders.map(order => (
          <li
            style={{
              backgroundColor: order.status === "Being Cooked" ? "#ff6b3b1f" : "#8bc34a1f",
              padding: "10px 20px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            key={order.id} className="text-sm text-gray-700 border p-2 mb-2 flex justify-between w-full">
            <span style={{ width: "20%", fontWeight:'bold', textAlign:"center" }}>{order.menuItem}</span>
            <span className="price-wrapper" style={{ display: "flex", justifyContent: "center", width: "20%" }}>
              <span className="price"
                style={{
                  backgroundColor: "#ffffff2f",
                  padding: "4px 8px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  border: "1px solid #fff",
                  fontWeight:'bold',
                  textAlign:"center"
                }} >
                ${order.price}
              </span>
            </span>
            <span className="status-wrapper" style={{ padding: "4px", width: "30%" }}>
              <select value={order.status} onChange={(e) => handleStatusChange(order.id, e.target.value)} className="border p-1 mx-2" style={{ padding: "4px" }}>
                <option value="Being Cooked" style={{ backgroundColor: "#ff6b3b" }}>Being Cooked</option>
                <option value="Waiting for Payment" style={{ backgroundColor: "#8bc34a" }}>Waiting for Payment</option>
              </select>
            </span>
            <button onClick={() => handleCompleteOrder(order.id)} className="px-2 py-1 bg-blue-500 text-white rounded" style={{ width: "30%", fontSize: "12px" }}>
              Mark Completed
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
