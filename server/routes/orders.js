import express from "express";
import Order from "../models/Order.js";
import MenuItem from "../models/MenuItem.js";
import User from "../models/User.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Create an order - works for both guest (guestId) and member (JWT optional here,
// frontend attaches user id if logged in). Kept public so guests can order without auth.
router.post("/", async (req, res) => {
  try {
    const { userId, guestId, customerInfo, orderType, tableNumber, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Re-price server-side from the DB - never trust client-sent prices/totals.
    let total = 0;
    const resolvedItems = [];
    let pointsEarned = 0;
    for (const line of items) {
      const menuItem = await MenuItem.findById(line.menuItemId);
      if (!menuItem) return res.status(400).json({ message: `Item not found: ${line.menuItemId}` });
      const lineTotal = menuItem.price * line.quantity;
      total += lineTotal;
      pointsEarned += menuItem.points * line.quantity;
      resolvedItems.push({
        menuItem: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: line.quantity,
        note: line.note || "",
      });
    }

    const order = await Order.create({
      user: userId || null,
      guestId: userId ? null : guestId,
      customerInfo,
      orderType,
      tableNumber: orderType === "dine-in" ? tableNumber : null,
      items: resolvedItems,
      total,
    });

    // Only members earn loyalty points.
    if (userId) {
      await User.findByIdAndUpdate(userId, { $inc: { loyaltyPoints: pointsEarned } });
    }

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Order status tracking page polls this - public, keyed by order id.
router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

// A member's order history.
router.get("/user/:userId", requireAuth, async (req, res) => {
  const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
  res.json(orders);
});

// A guest's order history for this browser session.
router.get("/guest/:guestId", async (req, res) => {
  const orders = await Order.find({ guestId: req.params.guestId }).sort({ createdAt: -1 });
  res.json(orders);
});

// Staff (admin or worker) - all orders, e.g. for the dashboard list.
router.get("/", requireAuth, requireRole("admin", "worker"), async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const orders = await Order.find(filter).sort({ createdAt: -1 });
  res.json(orders);
});

// Staff - all currently active (not yet Delivered) orders for a given table.
// Powers the "click a table on the blueprint" view. Supports multiple
// simultaneous orders per table.
router.get("/table/:tableNumber", requireAuth, requireRole("admin", "worker"), async (req, res) => {
  const orders = await Order.find({
    tableNumber: req.params.tableNumber,
    status: { $ne: "Delivered" },
  }).sort({ createdAt: 1 });
  res.json(orders);
});

// Staff - update order status (Pending -> Preparing -> Ready -> Delivered).
// Marking Delivered is effectively what "frees the table" on the blueprint,
// since occupied/free is derived from active order count, not stored.
router.patch("/:id/status", requireAuth, requireRole("admin", "worker"), async (req, res) => {
  const { status } = req.body;
  const allowed = ["Pending", "Preparing", "Ready", "Delivered"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

export default router;
