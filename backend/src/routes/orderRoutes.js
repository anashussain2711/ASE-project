const express = require("express");
const router = express.Router();
const { createOrder, getOrders, updateOrderStatus, deleteOrder } = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/", getOrders);
router.put("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

module.exports = router;
// The orderRoutes module exports a router that defines routes for creating, reading, updating, and deleting orders. The routes are handled by the orderController functions.
// API endpoints