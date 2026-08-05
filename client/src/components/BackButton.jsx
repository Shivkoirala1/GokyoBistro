import { useNavigate } from "react-router-dom";

// Goes back one step in browser history. Falls back to Home if there's
// nowhere to go back to (e.g. user landed directly on this page via URL).
export default function BackButton({ className = "" }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  return (
    <button
      onClick={handleBack}
      aria-label="Go back"
      className={`inline-flex items-center gap-1.5 text-sm font-body font-medium text-brand bg-white border border-black/10 rounded-full pl-2.5 pr-4 py-1.5 shadow-sm hover:bg-brand-cream hover:border-black/20 transition ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Back
    </button>
  );
}
