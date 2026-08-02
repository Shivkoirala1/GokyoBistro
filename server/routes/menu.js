import express from "express";
import MenuItem from "../models/MenuItem.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Public - anyone browsing the menu (guest or member)
router.get("/", async (req, res) => {
  const items = await MenuItem.find({ available: true }).sort({ category: 1, name: 1 });
  res.json(items);
});

// Admin only - menu CRUD. Workers do NOT get access to these.
router.post("/", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", requireAuth, requireRole("admin"), async (req, res) => {
  const item = await MenuItem.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json({ message: "Item deleted" });
});

export default router;
