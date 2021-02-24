import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import {
  addOrderItems,
  getOrderById,
  getUserOrders,
  updateOrderToPaid,
} from "../controllers/orderController.js"

const router = express.Router()

router.route("/").post(protect, addOrderItems)
router.route("/myorders").get(protect, getUserOrders)
router.route("/:id").get(protect, getOrderById)
router.route("/:id/pay").put(protect, updateOrderToPaid)

export default router
