import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axios.js";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user, guestId } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // If the customer scanned a table QR code (?table=7), it's pre-filled and locked.
  const qrTable = searchParams.get("table");

  const [orderType, setOrderType] = useState(qrTable ? "dine-in" : "pickup");
  const [tableNumber, setTableNumber] = useState(qrTable || "");
  const [tables, setTables] = useState([]);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Only needed for the manual fallback picker.
    if (!qrTable) {
      api.get("/tables/layout").then((res) => setTables(res.data));
    }
  }, [qrTable]);

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");
    if (orderType === "dine-in" && !tableNumber) {
      setError("Please select your table number.");
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await api.post("/orders", {
        userId: user?.id,
        guestId: user ? null : guestId,
        customerInfo: { name, phone },
        orderType,
        tableNumber: orderType === "dine-in" ? Number(tableNumber) : null,
        items,
      });
      clearCart();
      navigate(`/order-status/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Could not place order");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-xl font-bold text-coffee mb-4">Checkout</h1>

      <form onSubmit={handleConfirm} className="flex flex-col gap-3 max-w-sm">
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-lg px-3 py-2"
          required
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border rounded-lg px-3 py-2"
          required
        />

        <div className="flex gap-2">
          {["dine-in", "pickup", "delivery"].map((type) => (
            <button
              type="button"
              key={type}
              disabled={Boolean(qrTable) && type !== "dine-in"}
              onClick={() => setOrderType(type)}
              className={`flex-1 py-2 rounded-lg text-sm capitalize ${
                orderType === type ? "bg-coffee text-white" : "bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {orderType === "dine-in" && (
          <div>
            <p className="text-sm text-gray-600 mb-1">Table Number</p>
            {qrTable ? (
              <p className="font-semibold">Table {qrTable} (scanned)</p>
            ) : (
              <select
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="border rounded-lg px-3 py-2 w-full"
              >
                <option value="">Select table</option>
                {tables.map((t) => (
                  <option key={t.tableNumber} value={t.tableNumber}>
                    Table {t.tableNumber}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        <div className="flex justify-between font-semibold border-t pt-3 mt-2">
          <span>Total</span>
          <span>Rs. {total}</span>
        </div>

        <button
          type="submit"
          disabled={submitting || items.length === 0}
          className="bg-coffee text-white py-3 rounded-xl font-semibold mt-2 disabled:opacity-50"
        >
          {submitting ? "Placing order..." : "Confirm Order"}
        </button>
      </form>
    </div>
  );
}
