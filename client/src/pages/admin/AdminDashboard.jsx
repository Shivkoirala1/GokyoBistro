import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import TableBlueprint from "./TableBlueprint.jsx";
import MenuManager from "./MenuManager.jsx";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState("blueprint");
  const isAdmin = user.role === "admin";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand text-white p-4 flex justify-between items-center">
        <div>
          <p className="font-bold">Gokyo Bistro Dashboard</p>
          <p className="text-xs opacity-80 capitalize">{user.name} · {user.role}</p>
        </div>
        <button onClick={logout} className="text-sm underline">
          Log out
        </button>
      </div>

      <div className="flex gap-2 p-3 bg-white border-b">
        <button
          onClick={() => setTab("blueprint")}
          className={`px-3 py-1.5 rounded-lg text-sm ${tab === "blueprint" ? "bg-brand text-white" : "bg-gray-100"}`}
        >
          Café Blueprint
        </button>
        {/* Menu management is admin-only - workers don't get this tab at all. */}
        {isAdmin && (
          <button
            onClick={() => setTab("menu")}
            className={`px-3 py-1.5 rounded-lg text-sm ${tab === "menu" ? "bg-brand text-white" : "bg-gray-100"}`}
          >
            Manage Menu
          </button>
        )}
      </div>

      <div className="p-4">
        {tab === "blueprint" && <TableBlueprint />}
        {tab === "menu" && isAdmin && <MenuManager />}
      </div>
    </div>
  );
}
