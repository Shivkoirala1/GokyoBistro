import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios.js";
import BottomNav from "../components/BottomNav.jsx";

const STEPS = ["Pending", "Preparing", "Ready", "Delivered"];

export default function OrderStatus() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = () => api.get(`/orders/${id}`).then((res) => setOrder(res.data));
    fetchOrder();
    // Simple polling - good enough for a café order flow, no need for websockets.
    const interval = setInterval(fetchOrder, 5000);
    return () => clearInterval(interval);
  }, [id]);

  if (!order) return <p className="p-4">Loading order...</p>;

  const currentStep = STEPS.indexOf(order.status);

  return (
    <div className="min-h-screen bg-white p-4 pb-20">
      <h1 className="text-xl font-bold text-coffee mb-1">Order #{order._id.slice(-6)}</h1>
      <p className="text-gray-500 mb-6">
        {order.orderType === "dine-in" ? `Table ${order.tableNumber}` : order.orderType}
      </p>

      <div className="flex justify-between mb-8">
        {STEPS.map((step, idx) => (
          <div key={step} className="flex-1 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                idx <= currentStep ? "bg-coffee text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {idx + 1}
            </div>
            <p className="text-xs mt-1 text-center">{step}</p>
          </div>
        ))}
      </div>

      <div className="border rounded-xl p-3">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm py-1">
            <span>
              {item.quantity}x {item.name}
            </span>
            <span>Rs. {item.price * item.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between font-semibold border-t mt-2 pt-2">
          <span>Total</span>
          <span>Rs. {order.total}</span>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
