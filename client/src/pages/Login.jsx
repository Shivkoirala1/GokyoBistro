import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleMemberLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await login({ email, password });
      // Staff go straight to their dashboard, members go to the menu.
      if (user.role === "admin" || user.role === "worker") navigate("/admin");
      else navigate("/menu");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-6 bg-brand-cream">
      <h1 className="text-2xl font-bold text-brand">Welcome to Gokyo Bistro</h1>

      <button
        onClick={() => navigate("/menu")}
        className="w-full max-w-xs bg-white border border-brand text-brand py-3 rounded-xl font-semibold"
      >
        Continue as Guest
      </button>

      <div className="w-full max-w-xs border-t pt-6">
        <form onSubmit={handleMemberLogin} className="flex flex-col gap-3">
          <p className="font-semibold text-brand">Member Login</p>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-3 py-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg px-3 py-2"
            required
          />
          <button type="submit" className="bg-brand text-white py-2 rounded-lg font-semibold">
            Login
          </button>
        </form>
      </div>

      <p className="text-sm text-gray-600">
        Not a member yet?{" "}
        <Link to="/register" className="text-brand font-semibold underline">
          Become a member
        </Link>
      </p>
    </div>
  );
}
