import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["member", "worker", "admin"],
      default: "member",
    },
    // Only meaningful for members. Workers/admin ignore this.
    loyaltyPoints: { type: Number, default: 0 },
    phone: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
