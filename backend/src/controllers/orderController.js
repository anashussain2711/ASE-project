const OrderModel = require("../models/orderModel");

const createOrder = (req, res) => {
  OrderModel.create(req.body, (err, order) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(order);
  });
};

const getOrders = (req, res) => {
  OrderModel.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

const updateOrderStatus = (req, res) => {
  OrderModel.updateStatus(req.params.id, req.body.status, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

const deleteOrder = (req, res) => {
  OrderModel.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

module.exports = { createOrder, getOrders, updateOrderStatus, deleteOrder };
// The orderController module exports functions to create, read, update, and delete orders. These functions interact with the OrderModel class to perform CRUD operations on orders.