import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["Coffee", "Tea", "Snacks", "Combos"],
      required: true,
    },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    imageURL: { type: String, default: "" },
    points: { type: Number, default: 0 }, // loyalty points earned, members only
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", menuItemSchema);
