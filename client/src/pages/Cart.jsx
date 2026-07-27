import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import BottomNav from "../components/BottomNav.jsx";

export default function Cart() {
  const { items, updateQuantity, removeItem, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="p-4">
        <h1 className="text-xl font-bold text-coffee mb-4">Your Cart</h1>

        {items.length === 0 && <p className="text-gray-500">Your cart is empty.</p>}

        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.menuItemId + item.note} className="border rounded-xl p-3">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  {item.note && <p className="text-xs text-gray-500">Note: {item.note}</p>}
                  <p className="text-sm text-gray-600">Rs. {item.price} each</p>
                </div>
                <button
                  onClick={() => removeItem(item.menuItemId, item.note)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => updateQuantity(item.menuItemId, item.note, item.quantity - 1)}
                  className="w-8 h-8 border rounded-full"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.menuItemId, item.note, item.quantity + 1)}
                  className="w-8 h-8 border rounded-full"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>Rs. {total}</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-coffee text-white py-3 rounded-xl font-semibold mt-4"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
