import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form);
      navigate("/menu");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-brand-cream">
      <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-brand mb-2">Become a Member</h1>
        <p className="text-sm text-gray-600 mb-2">
          Earn loyalty points on every order and track your history.
        </p>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
          required
        />
        <button type="submit" className="bg-brand text-white py-2 rounded-lg font-semibold mt-2">
          Create Account
        </button>
      </form>
    </div>
  );
}
