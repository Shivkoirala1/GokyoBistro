import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import ConfirmModal from "./ConfirmModal.jsx";

const tabs = [
  { to: "/menu", label: "Menu" },
  { to: "/history", label: "History" },
  { to: "/cart", label: "Cart" },
  { to: "/account", label: "Account" },
];

export default function BottomNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [homeConfirmOpen, setHomeConfirmOpen] = useState(false);

  const handleHomeClick = () => {
    if (user) setHomeConfirmOpen(true);
    else navigate("/");
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-black/10 flex justify-around py-2.5 z-50 font-body shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            `text-xs px-3 py-1.5 rounded-full transition ${
              isActive ? "text-brand font-semibold bg-brand-cream" : "text-gray-400"
            }`
          }
        >
          Menu
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            `text-xs px-3 py-1.5 rounded-full transition ${
              isActive ? "text-brand font-semibold bg-brand-cream" : "text-gray-400"
            }`
          }
        >
          History
        </NavLink>
        <button onClick={handleHomeClick} className="text-xs px-3 py-1.5 rounded-full text-gray-400">
          Home
        </button>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `text-xs px-3 py-1.5 rounded-full transition ${
              isActive ? "text-brand font-semibold bg-brand-cream" : "text-gray-400"
            }`
          }
        >
          Cart
        </NavLink>
        <NavLink
          to="/account"
          className={({ isActive }) =>
            `text-xs px-3 py-1.5 rounded-full transition ${
              isActive ? "text-brand font-semibold bg-brand-cream" : "text-gray-400"
            }`
          }
        >
          Account
        </NavLink>
      </nav>

      <ConfirmModal
        open={homeConfirmOpen}
        title="Go to Home page?"
        message={`You're currently logged in as ${user?.name || "a member"}. What would you like to do?`}
        onCancel={() => setHomeConfirmOpen(false)}
        actions={[
          {
            label: "Stay logged in & go Home",
            variant: "primary",
            onClick: () => {
              setHomeConfirmOpen(false);
              navigate("/");
            },
          },
          {
            label: "Log out & go Home",
            variant: "danger",
            onClick: () => {
              setHomeConfirmOpen(false);
              logout();
              navigate("/");
            },
          },
        ]}
      />
    </>
  );
}
