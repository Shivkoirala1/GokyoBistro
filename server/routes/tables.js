import express from "express";
import Order from "../models/Order.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import TABLES from "../utils/tables.js";

const router = express.Router();

// Public - checkout page uses this to render the manual table picker fallback.
router.get("/layout", (req, res) => {
  res.json(TABLES);
});

// Staff - blueprint view. Returns every table with its occupied/free status,
// derived from whether it has any active (non-Delivered) orders right now.
router.get("/status", requireAuth, requireRole("admin", "worker"), async (req, res) => {
  const activeOrders = await Order.find({
    orderType: "dine-in",
    status: { $ne: "Delivered" },
  });

  const occupiedCounts = {};
  for (const order of activeOrders) {
    occupiedCounts[order.tableNumber] = (occupiedCounts[order.tableNumber] || 0) + 1;
  }

  const tablesWithStatus = TABLES.map((t) => ({
    ...t,
    occupied: Boolean(occupiedCounts[t.tableNumber]),
    activeOrderCount: occupiedCounts[t.tableNumber] || 0,
  }));

  res.json(tablesWithStatus);
});

export default router;
