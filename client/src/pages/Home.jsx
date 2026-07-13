import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen fontstyle-italic flex flex-col items-center justify-center bg- px-6 text-center gap-6">
      <h1 className="text-4xl font-bold text-coffe">Gokyo Bistro</h1>
      <p className="text-gray-600 font-bold">Enjoy Your Meal, with us.</p>

      <button
        onClick={() => navigate("/login")}
        className="w-full max-w-xs bg-coffee text-white py-3 rounded-xl font-bold"
      >
        Order Now
      </button>

      <button
        onClick={() => navigate("/login")}
        className="w-full max-w-xs bg-coffee text-white py-3 rounded-xl font-bold"
      >
        Login / Register
      </button>
    </div>
  );
}
