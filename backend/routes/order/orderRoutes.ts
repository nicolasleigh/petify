import express from "express";
import orderController from "../../controllers/order/orderController";
const router = express.Router();

// Customer
router.post("/home/order/place-order", orderController.placeOrder);
router.get("/home/customer/get-dashboard-data/:userId", orderController.getCustomerDashboardData);
router.get("/home/customer/get-orders/:customerId/:status", orderController.getOrders);
router.get("/home/customer/get-order-details/:orderId", orderController.getOrderDetails);

// Admin
router.get("/admin/orders", orderController.getAdminOrders);

// Seller

export default router;
