import express from "express";
import chatController from "../controllers/chat/chatController";
import { authMiddleware } from "../middlewares/auth";
const router = express.Router();

router.post("/chat/customer/add-customer-friend", chatController.addCustomerFriend);
router.post("/chat/customer/send-message-to-seller", chatController.AddCustomerMessage);
router.get("/chat/seller/get-customers/:sellerId", chatController.getCustomers);
router.get("/chat/seller/get-customer-message/:customerId", authMiddleware, chatController.getCustomersSellerMessage);
router.post("/chat/seller/send-message-to-customer", authMiddleware, chatController.addSellerMessage);

export default router;
