import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";

const FEATURED = [
  {
    name: "Grilled Mountain Lamb",
    desc: "Slow-cooked, Himalayan herbs",
    price: "NPR 1,250",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Truffle Mushroom Pasta",
    desc: "Black truffle, parmesan, cream",
    price: "NPR 880",
    img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Himalayan Garden Salad",
    desc: "Yak cheese, greens, honey mustard",
    price: "NPR 450",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout showBack={false}>
      {/* Hero */}
      <div className="relative min-h-[93vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-bottom "
          //  className="fixed inset-0 h-screen w-screen bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-xs w-full">
          <p className="font-body text-xs tracking-[0.2em] text-gold uppercase">
            Fine Dining · Jhamsikhel
          </p>

          <h1 className="font-display italic text-5xl text-white leading-tight">
            Welcome back.
          </h1>

          <p className="font-body text-white text-sm">
            Enjoy your meal, with us.
          </p>

          <div className="w-full flex flex-col gap-3 mt-4">
            <button
              onClick={() => navigate("/menu")}
              className="w-full bg-gold text-black py-3 rounded-xl font-body font-semibold tracking-wide"
            >
              Order Now
            </button>
            <button
              onClick={() => navigate("/login")}
              className="w-full border border-white/60 text-white py-3 rounded-xl font-body font-semibold tracking-wide bg-black/20"
            >
              Login / Register
            </button>
          </div>
        </div>
      </div>

      {/* Featured dishes */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <p className="font-body text-xs tracking-[0.2em] text-brand uppercase mb-2">
          From the kitchen
        </p>
        <h2 className="font-display text-3xl text-brand mb-8">Featured Dishes</h2>

        <div className="grid gap-6 sm:grid-cols-3">
          {FEATURED.map((dish) => (
            <button
              key={dish.name}
              onClick={() => navigate("/menu")}
              className="text-left border border-black/10 rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <img src={dish.img} alt={dish.name} className="w-full h-40 object-cover" />
              <div className="p-3">
                <p className="font-body font-semibold text-brand">{dish.name}</p>
                <p className="font-body text-xs text-gray-500">{dish.desc}</p>
                <p className="font-body text-sm text-gold font-semibold mt-1">{dish.price}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </Layout>
  );
}
