import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import ConfirmModal from "./ConfirmModal.jsx";

const links = [
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [homeConfirmOpen, setHomeConfirmOpen] = useState(false);

  // Logged-in users get asked whether they want to stay logged in or log
  // out before landing on the public Home page. Guests just navigate.
  const handleHomeClick = () => {
    setOpen(false);
    if (user) setHomeConfirmOpen(true);
    else navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur text-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <button
          onClick={handleHomeClick}
          className="font-display italic text-xl text-gold"
        >
          Gokyo Bistro
        </button>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-6 font-body text-sm">
          <button
            onClick={handleHomeClick}
            className="text-white/80 hover:text-white"
          >
            Home
          </button>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? "text-gold" : "text-white/80 hover:text-white"
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={() => navigate(user ? "/account" : "/login")}
            className="bg-gold text-black px-4 py-1.5 rounded-lg font-semibold"
          >
            {user ? "Account" : "Login"}
          </button>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="md:hidden flex flex-col gap-1 px-4 pb-4 font-body text-sm">
          <button onClick={handleHomeClick} className="py-2 text-left text-white/80">
            Home
          </button>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `py-2 ${isActive ? "text-gold" : "text-white/80"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              navigate(user ? "/account" : "/login");
            }}
            className="bg-gold text-black py-2 rounded-lg font-semibold mt-2"
          >
            {user ? "Account" : "Login"}
          </button>
        </nav>
      )}

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
    </header>
  );
}
