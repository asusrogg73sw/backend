// backend/routes/orderRoutes.ts
import { Router } from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  getOrders,
  updateOrderToDelivered,
  deleteOrder,
  toggleOrderLock, // imported controller flag function handler
} from "../controllers/orderController";
import { protect, admin } from "../middlewares/authMiddleware";
import validate from "../middlewares/validateMiddleware";
import { createOrderSchema } from "../validations/orderValidation";

const router = Router();

router.route("/").post(protect, validate(createOrderSchema), addOrderItems);
router.route("/").get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);

// 🔒 REFACTOR EXPRESS INJECTED DYNAMIC ID SEGMENTS CHAINING
router
  .route("/:id")
  .get(protect, getOrderById)
  .delete(protect, deleteOrder);

// 🔒 ROUTE ASSIGNMENT FOR THE LOCK SWITCH ENGINE
router.route("/:id/toggle-lock").put(protect, toggleOrderLock);

router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;