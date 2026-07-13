import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
    name: { type: String, required: true }, // snapshot, in case menu changes later
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    note: { type: String, default: "" },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    // Guests have no User account - identified by a client-generated guestId.
    // Members are linked via `user`.
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    guestId: { type: String, default: null },

    customerInfo: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
    },

    orderType: {
      type: String,
      enum: ["dine-in", "pickup", "delivery"],
      required: true,
    },
    // Set via QR scan (preferred) or manual fallback at checkout.
    // Null for pickup/delivery orders.
    tableNumber: { type: Number, default: null },

    items: { type: [orderItemSchema], required: true },
    total: { type: Number, required: true },

    status: {
      type: String,
      enum: ["Pending", "Preparing", "Ready", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
