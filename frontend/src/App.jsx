// App.jsx
import { useState, useEffect } from "react";
import apiService from "./services/apiService";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";

export default function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const data = await apiService.getOrders();
    setOrders(data);
  };

  return (
    <div className="p-5" style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2 className="text-lg font-bold mb-2">Fast Food Order Management</h2>
      <OrderForm refreshOrders={fetchOrders} />
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "10px 0",
        backgroundColor: "#333",
        fontWeight: "bold",
        padding: "10px 20px",
      }}>
        <span style={{ width: "20%", textAlign: "center" }}>Item</span>
        <span style={{ width: "20%", textAlign: "center" }}>Price</span>
        <span style={{ width: "30%", textAlign: "center" }}>Status</span>
        <span style={{ width: "30%", textAlign: "center" }}>Actions</span>
      </div>
      <OrderList orders={orders} refreshOrders={fetchOrders} />
    </div>
  );
}
// This is the main App component that fetches orders from the backend and displays the OrderForm and OrderList components. It uses the apiService to interact with the backend API.