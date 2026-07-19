import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Layout from "../components/Layout.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "",address: "", password: "", confirmPassword: "",  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password != form.confirmPassword){
      setError("Password Does not Match");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setSubmitting(true);
    
    try {
      const {confirmPassword, ...payload} = form;
      await register (payload);
      // await register(form);
      
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }finally{
      setSubmitting(false);
    }
  };

  return (
    <Layout>
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-10 bg-brand-cream">
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-brand mb-1">Become a Member</h1>
        <p className="text-sm text-gray-600 mb-2">
          Earn loyalty points on every order, save your details, and track your history.
        </p>
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <label className="text-xs text-gray-500 -mb-2">Full Name</label>
        <input
          name="name"
          placeholder="e.g. Damaru B. Koirala"
          value={form.name}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
          required
        />

        <label className="text-xs text-gray-500 -mb-2">Email</label>
        <input
          name="email"
          type="email"
          placeholder="you@gmail.com"
          value={form.email}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
          required
        />

        <label className="text-xs text-gray-500 -mb-2">Phone Number</label>
        <input
          name="phone"
          placeholder="+977 98XXXXXXXX"
          value={form.phone}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
          required
        />

        <label className="text-xs text-gray-500 -mb-2">Current Address</label>
        <input
          name="address"
          placeholder="e.g. Jhamsikhel, Lalitpur"
          value={form.address}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
          required
        />

        <label className="text-xs text-gray-500 -mb-2">Password</label>
        <input
          name="password"
          type="password"
          placeholder="At least 6 characters"
          value={form.password}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
          required
        />

        <label className="text-xs text-gray-500 -mb-2">Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Re-enter password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
          required
        />

        <button
          type="submit"
          disabled={submitting}
          className="bg-brand text-white py-2.5 rounded-lg font-semibold mt-2 disabled:opacity-50"
        >
          {submitting ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </div>
    </Layout>
  );
}
