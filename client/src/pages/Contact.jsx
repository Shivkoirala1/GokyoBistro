import { useState } from "react";
import Layout from "../components/Layout.jsx";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // NOTE: this is not wired to the backend yet - it's a placeholder so the
    // form is usable while building. A real submit would POST to something
    // like /api/contact, which we haven't built. Flag this to Claude if you
    // want that wired up next.
    setSent(true);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
        <div>
          <p className="font-body text-xs tracking-[0.2em] text-gold uppercase mb-2">
            Get in Touch
          </p>
          <h1 className="font-display text-4xl text-brand mb-6">Contact Us</h1>
          <p className="font-body text-gray-700 leading-relaxed mb-6">
            Questions about reservations, private events, or feedback on your
            last visit — we'd love to hear from you.
          </p>

          <div className="font-body text-sm text-gray-700 flex flex-col gap-2">
            <p><span className="font-semibold text-brand">Address:</span> Jhamsikhel, Lalitpur, Nepal</p>
            <p><span className="font-semibold text-brand">Phone:</span> +977 98XXXXXXXX</p>
            <p><span className="font-semibold text-brand">Email:</span> hello@gokyobistro.com.np</p>
            <p><span className="font-semibold text-brand">Hours:</span> 11:00 AM – 10:00 PM, daily</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {sent ? (
            <div className="border border-green-300 bg-green-50 text-green-700 rounded-xl p-4 font-body text-sm">
              Thanks — we've got your message. We'll get back to you soon.
            </div>
          ) : (
            <>
              <input
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 font-body"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 font-body"
                required
              />
              <textarea
                name="message"
                placeholder="Your message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="border rounded-lg px-3 py-2 font-body"
                required
              />
              <button
                type="submit"
                className="bg-gold text-black py-3 rounded-xl font-body font-semibold"
              >
                Send Message
              </button>
            </>
          )}
        </form>
      </div>
    </Layout>
  );
}
