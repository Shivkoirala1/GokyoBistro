import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import BottomNav from "../components/BottomNav.jsx";

export default function History() {
  const { user, guestId } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const url = user ? `/orders/user/${user.id}` : `/orders/guest/${guestId}`;
    api.get(url).then((res) => setOrders(res.data));
  }, [user, guestId]);

  return (
    <div className="min-h-screen bg-white p-4 pb-20">
      <h1 className="text-xl font-bold text-coffee mb-4">Order History</h1>
      {orders.length === 0 && <p className="text-gray-500">No past orders yet.</p>}
      <div className="flex flex-col gap-3">
        {orders.map((order) => (
          <Link
            key={order._id}
            to={`/order-status/${order._id}`}
            className="border rounded-xl p-3 flex justify-between"
          >
            <div>
              <p className="font-semibold">#{order._id.slice(-6)}</p>
              <p className="text-sm text-gray-500">{order.status}</p>
            </div>
            <p className="font-semibold">Rs. {order.total}</p>
          </Link>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
