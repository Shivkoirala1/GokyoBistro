import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Menu from "./pages/Menu.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderStatus from "./pages/OrderStatus.jsx";
import History from "./pages/History.jsx";
import Account from "./pages/Account.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path = "/about" element={<About/>}></Route>
      <Route path="/contact" element={<Contact />}></Route>
      <Route path="/register" element={<Register />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-status/:id" element={<OrderStatus />} />
      <Route path="/history" element={<History />} />
      <Route path="/account" element={<Account />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin", "worker"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
