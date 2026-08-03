import { useEffect, useState } from "react";
import api from "../../api/axios.js";

const STATUS_FLOW = ["Pending", "Preparing", "Ready", "Delivered"];

export default function TableBlueprint() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableOrders, setTableOrders] = useState([]);

  const loadTables = () => api.get("/tables/status").then((res) => setTables(res.data));

  useEffect(() => {
    loadTables();
    const interval = setInterval(loadTables, 8000);
    return () => clearInterval(interval);
  }, []);

  const openTable = async (tableNumber) => {
    setSelectedTable(tableNumber);
    const { data } = await api.get(`/orders/table/${tableNumber}`);
    setTableOrders(data);
  };

  const updateStatus = async (orderId, status) => {
    await api.patch(`/orders/${orderId}/status`, { status });
    const { data } = await api.get(`/orders/table/${selectedTable}`);
    setTableOrders(data);
    loadTables();
  };

  const occupiedCount = tables.filter((t) => t.occupied).length;

  return (
    <div className="font-body">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display text-2xl text-brand">Café Blueprint</h2>
          <p className="text-xs text-gray-500 mt-1">
            {occupiedCount} of {tables.length} tables occupied
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> Free
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> Occupied
          </span>
        </div>
      </div>

      {/* Floor plan: clean grid, not floating absolute-positioned dots */}
      <div className="bg-white border border-black/10 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {tables.map((t) => (
            <button
              key={t.tableNumber}
              onClick={() => openTable(t.tableNumber)}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 border-2 transition
                ${
                  t.occupied
                    ? "bg-red-50 border-red-400 text-red-700"
                    : "bg-green-50 border-green-400 text-green-700"
                }
                ${selectedTable === t.tableNumber ? "ring-2 ring-gold ring-offset-2" : ""}
                hover:shadow-md`}
            >
              <span className="text-2xl font-display font-bold">{t.tableNumber}</span>
              <span className="text-[10px] uppercase tracking-wide font-semibold">
                {t.occupied ? `${t.activeOrderCount} active` : "Free"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected table detail panel */}
      {selectedTable && (
        <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <p className="font-display text-lg text-brand">Table {selectedTable}</p>
            <button
              onClick={() => setSelectedTable(null)}
              className="text-sm text-gray-400 hover:text-gray-700"
            >
              Close ✕
            </button>
          </div>

          {tableOrders.length === 0 && (
            <p className="text-sm text-gray-500">No active orders on this table.</p>
          )}

          <div className="flex flex-col gap-3">
            {tableOrders.map((order) => (
              <div key={order._id} className="bg-brand-cream/60 rounded-xl p-3 border border-black/5">
                <p className="text-sm font-semibold text-brand mb-1">
                  #{order._id.slice(-6)} · {order.customerInfo.name}
                </p>
                {order.items.map((item, i) => (
                  <p key={i} className="text-xs text-gray-600">
                    {item.quantity}x {item.name} {item.note && `(${item.note})`}
                  </p>
                ))}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs text-gray-500">Status:</span>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="text-xs border border-black/10 rounded-lg px-2 py-1 bg-white"
                  >
                    {STATUS_FLOW.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
