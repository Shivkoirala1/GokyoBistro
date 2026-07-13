import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

// Members self-register from the "Become a Member" flow.
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHash,
      phone,
      role: "member",
    });
    const token = signToken(user);
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, role: user.role, loyaltyPoints: user.loyaltyPoints },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Shared login for members, workers, and admin - role comes from the DB record.
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user);
    res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role, loyaltyPoints: user.loyaltyPoints },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
