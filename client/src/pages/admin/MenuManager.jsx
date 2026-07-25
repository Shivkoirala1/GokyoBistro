import { useEffect, useState } from "react";
import api from "../../api/axios.js";

const EMPTY_FORM = { name: "", category: "Coffee", description: "", price: "", imageURL: "", points: "" };

export default function MenuManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);

  const loadItems = () => api.get("/menu").then((res) => setItems(res.data));

  useEffect(() => {
    loadItems();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price), points: Number(form.points) || 0 };
    if (editingId) {
      await api.put(`/menu/${editingId}`, payload);
    } else {
      await api.post("/menu", payload);
    }
    setForm(EMPTY_FORM);
    setEditingId(null);
    loadItems();
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name,
      category: item.category,
      description: item.description,
      price: item.price,
      imageURL: item.imageURL,
      points: item.points,
    });
  };

  const handleDelete = async (id) => {
    await api.delete(`/menu/${id}`);
    loadItems();
  };

  return (
    <div>
      <h2 className="font-bold text-coffee mb-3">Manage Menu</h2>

      <form onSubmit={handleSubmit} className="border rounded-xl p-3 flex flex-col gap-2 mb-6 max-w-sm">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border rounded-lg px-2 py-1" required />
        <select name="category" value={form.category} onChange={handleChange} className="border rounded-lg px-2 py-1">
          {["Coffee", "Tea", "Snacks", "Combos"].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border rounded-lg px-2 py-1" />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="border rounded-lg px-2 py-1" required />
        <input name="imageURL" placeholder="Image URL" value={form.imageURL} onChange={handleChange} className="border rounded-lg px-2 py-1" />
        <input name="points" type="number" placeholder="Loyalty points" value={form.points} onChange={handleChange} className="border rounded-lg px-2 py-1" />
        <button type="submit" className="bg-coffee text-white py-2 rounded-lg font-semibold">
          {editingId ? "Update Item" : "Add Item"}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setForm(EMPTY_FORM); setEditingId(null); }} className="text-sm text-gray-500">
            Cancel edit
          </button>
        )}
      </form>

      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div key={item._id} className="border rounded-lg p-2 flex justify-between items-center">
            <div>
              <p className="font-semibold text-sm">{item.name} <span className="text-gray-400 font-normal">· {item.category}</span></p>
              <p className="text-xs text-gray-500">Rs. {item.price} · {item.points} pts</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(item)} className="text-xs text-blue-600">Edit</button>
              <button onClick={() => handleDelete(item._id)} className="text-xs text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
