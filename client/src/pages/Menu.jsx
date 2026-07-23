import { useEffect, useMemo, useState } from "react";
import api from "../api/axios.js";
import { useCart } from "../context/CartContext.jsx";
import BottomNav from "../components/BottomNav.jsx";
import Layout from "../components/Layout.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";

const CATEGORIES = ["All", "Coffee", "Tea", "Snacks", "Combos"];
const SORT_OPTIONS = [
  { value: "default", label: "Sort: Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

export default function Menu() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [noteDrafts, setNoteDrafts] = useState({}); // { [itemId]: "note text" }
  const { addItem } = useCart();

  // Add-to-cart modal state: which item is being confirmed, and the
  // quantity the customer wants (starts at 1, adjustable before confirming).
  const [pendingItem, setPendingItem] = useState(null);
  const [pendingQty, setPendingQty] = useState(1);

  useEffect(() => {
    api
      .get("/menu")
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  const visibleItems = useMemo(() => {
    let result = items;

    if (category !== "All") {
      result = result.filter((i) => i.category === category);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      );
    }

    const sorted = [...result];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "name-asc") sorted.sort((a, b) => a.name.localeCompare(b.name));

    return sorted;
  }, [items, category, search, sort]);

  const openAddModal = (item) => {
    setPendingItem(item);
    setPendingQty(1);
  };

  const confirmAdd = () => {
    addItem(pendingItem, pendingQty, noteDrafts[pendingItem._id] || "");
    setNoteDrafts((prev) => ({ ...prev, [pendingItem._id]: "" }));
    setPendingItem(null);
  };

  return (
    <Layout showFooter={false}>
    <div className="pb-20">
      <div className="p-4">
        <h1 className="text-xl font-bold text-brand mb-3">Menu</h1>

        {/* Search + sort */}
        <div className="flex gap-2 mb-3">
          <input
            placeholder="Search dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 text-sm"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-lg px-2 py-2 text-sm bg-white"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Category filters, including "All" */}
        <div className="flex gap-2 overflow-x-auto mb-4 pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${
                category === cat ? "bg-brand text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading && <p className="text-gray-500">Loading menu...</p>}
        {!loading && visibleItems.length === 0 && (
          <p className="text-gray-500">No dishes match your search.</p>
        )}

        {/* Two-column grid - items flow left, right, left, right */}
        <div className="grid grid-cols-2 gap-3">
          {visibleItems.map((item) => (
            <div key={item._id} className="border rounded-xl overflow-hidden flex flex-col bg-white">
              {item.imageURL && (
                <img
                  src={item.imageURL}
                  alt={item.name}
                  className="w-full h-24 object-cover"
                />
              )}
              <div className="p-2.5 flex flex-col flex-1">
                <p className="font-semibold text-sm leading-tight">{item.name}</p>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{item.description}</p>
                <p className="text-xs mt-1.5 font-semibold text-brand">
                  Rs. {item.price} <span className="font-normal text-gray-400">· {item.points} pts</span>
                </p>
                <input
                  placeholder="Add note"
                  value={noteDrafts[item._id] || ""}
                  onChange={(e) =>
                    setNoteDrafts((prev) => ({ ...prev, [item._id]: e.target.value }))
                  }
                  className="border rounded-lg px-2 py-1 text-xs mt-2 w-full"
                />
                <button
                  onClick={() => openAddModal(item)}
                  className="mt-2 bg-brand text-white text-xs font-semibold py-1.5 rounded-lg"
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

    {/* Quantity + confirm modal for adding an item to the cart */}
    <ConfirmModal
      open={Boolean(pendingItem)}
      title={pendingItem ? `Add ${pendingItem.name}?` : ""}
      onCancel={() => setPendingItem(null)}
      actions={[
        {
          label: `Add ${pendingQty} to Cart · Rs. ${pendingItem ? pendingItem.price * pendingQty : 0}`,
          variant: "primary",
          onClick: confirmAdd,
        },
      ]}
    >
      {pendingItem && (
        <div className="flex items-center justify-between bg-brand-cream rounded-xl px-4 py-3 mb-2">
          <span className="text-sm text-gray-600">Quantity</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPendingQty((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-full border border-black/10 bg-white font-semibold"
            >
              −
            </button>
            <span className="font-semibold w-5 text-center">{pendingQty}</span>
            <button
              onClick={() => setPendingQty((q) => q + 1)}
              className="w-8 h-8 rounded-full border border-black/10 bg-white font-semibold"
            >
              +
            </button>
          </div>
        </div>
      )}
    </ConfirmModal>
    </Layout>
  );
}
