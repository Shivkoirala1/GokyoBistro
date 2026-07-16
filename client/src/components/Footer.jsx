import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white/70 font-body text-sm">
      <div className="max-w-5xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-display italic text-xl text-gold mb-2">Gokyo Bistro</p>
          <p>Jhamsikhel, Lalitpur, Nepal</p>
          <p>Open daily · 11:00 AM – 10:00 PM</p>
        </div>

        <div>
          <p className="text-white font-semibold mb-2">Quick Links</p>
          <ul className="flex flex-col gap-1">
            <li><Link to="/menu" className="hover:text-white">Menu</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link to="/login" className="hover:text-white">Login / Register</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-white font-semibold mb-2">Get in Touch</p>
          <p>+977 98XXXXXXXX</p>
          <p>hello@gokyobistro.com.np</p>
        </div>
      </div>
      <div className="border-t border-white/10 text-center py-4 text-xs text-white/40">
        © {new Date().getFullYear()} Gokyo Bistro. All rights reserved.
      </div>
    </footer>
  );
}
