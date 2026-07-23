import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useCart } from "../context/CartContext.jsx";
import BottomNav from "../components/BottomNav.jsx";

const CATEGORIES = ["Coffee", "Tea", "Snacks", "Combos"];

export default function Menu() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("Coffee");
  const [loading, setLoading] = useState(true);
  const [noteDrafts, setNoteDrafts] = useState({}); // { [itemId]: "note text" }
  const { addItem } = useCart();

  useEffect(() => {
    api
      .get("/menu")
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  const visibleItems = items.filter((i) => i.category === category);

  const handleAdd = (item) => {
    addItem(item, 1, noteDrafts[item._id] || "");
    setNoteDrafts((prev) => ({ ...prev, [item._id]: "" }));
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="p-4">
        <h1 className="text-xl font-bold text-coffee mb-3">Menu</h1>

        <div className="flex gap-2 overflow-x-auto mb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${
                category === cat ? "bg-coffee text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading && <p className="text-gray-500">Loading menu...</p>}
        {!loading && visibleItems.length === 0 && (
          <p className="text-gray-500">No items in this category yet.</p>
        )}

        <div className="flex flex-col gap-4">
          {visibleItems.map((item) => (
            <div key={item._id} className="border rounded-xl p-3 flex gap-3">
              {item.imageURL && (
                <img
                  src={item.imageURL}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="text-sm mt-1">
                  Rs. {item.price} · {item.points} pts
                </p>
                <input
                  placeholder="Add note (e.g. less sugar)"
                  value={noteDrafts[item._id] || ""}
                  onChange={(e) =>
                    setNoteDrafts((prev) => ({ ...prev, [item._id]: e.target.value }))
                  }
                  className="border rounded-lg px-2 py-1 text-sm mt-2 w-full"
                />
                <button
                  onClick={() => handleAdd(item)}
                  className="mt-2 bg-coffee text-white text-sm px-3 py-1.5 rounded-lg"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
