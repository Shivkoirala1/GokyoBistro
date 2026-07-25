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
    // Refresh both the order list for this table and the overall blueprint,
    // since marking "Delivered" is what frees the table.
    const { data } = await api.get(`/orders/table/${selectedTable}`);
    setTableOrders(data);
    loadTables();
  };

  return (
    <div>
      <h2 className="font-bold text-coffee mb-3">Café Blueprint</h2>

      <div className="relative bg-white border rounded-xl w-full aspect-[4/3] mb-6">
        {tables.map((t) => (
          <button
            key={t.tableNumber}
            onClick={() => openTable(t.tableNumber)}
            style={{ left: `${t.x}%`, top: `${t.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold text-white ${
              t.occupied ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {t.tableNumber}
          </button>
        ))}
      </div>

      {selectedTable && (
        <div className="border rounded-xl p-3">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">Table {selectedTable}</p>
            <button onClick={() => setSelectedTable(null)} className="text-sm text-gray-500">
              Close
            </button>
          </div>

          {tableOrders.length === 0 && (
            <p className="text-sm text-gray-500">No active orders on this table.</p>
          )}

          <div className="flex flex-col gap-3">
            {tableOrders.map((order) => (
              <div key={order._id} className="bg-gray-50 rounded-lg p-2">
                <p className="text-sm font-semibold">
                  #{order._id.slice(-6)} · {order.customerInfo.name}
                </p>
                {order.items.map((item, i) => (
                  <p key={i} className="text-xs text-gray-600">
                    {item.quantity}x {item.name} {item.note && `(${item.note})`}
                  </p>
                ))}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs">Status:</span>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="text-xs border rounded px-2 py-1"
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
