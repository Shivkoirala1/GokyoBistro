import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import BottomNav from "../components/BottomNav.jsx";

export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-4 pb-20">
      <h1 className="text-xl font-bold text-coffee mb-4">Account</h1>

      {user ? (
        <div className="flex flex-col gap-2">
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-gray-500 capitalize">{user.role}</p>
          {user.role === "member" && (
            <p className="text-sm">Loyalty Points: {user.loyaltyPoints}</p>
          )}
          {(user.role === "admin" || user.role === "worker") && (
            <button
              onClick={() => navigate("/admin")}
              className="bg-coffee text-white py-2 rounded-lg mt-2"
            >
              Go to Dashboard
            </button>
          )}
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="border border-coffee text-coffee py-2 rounded-lg mt-2"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-gray-600">You're browsing as a guest.</p>
          <Link to="/register" className="bg-coffee text-white py-2 rounded-lg text-center">
            Become a Member
          </Link>
          <Link to="/login" className="border border-coffee text-coffee py-2 rounded-lg text-center">
            Login
          </Link>
        </div>
      )}
      <BottomNav />
    </div>
  );
}
