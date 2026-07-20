// Simple reusable confirm dialog. Pass `actions` as an array of
// { label, onClick, variant } instead of a fixed yes/no if you need more
// than two choices (used for the "logout vs stay logged in" Home prompt).
export default function ConfirmModal({ open, title, message, children, actions, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-5 font-body">
        {title && <h3 className="font-display text-lg text-brand mb-2">{title}</h3>}
        {message && <p className="text-sm text-gray-600 mb-4">{message}</p>}
        {children}
        <div className="flex flex-col gap-2 mt-4">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              className={
                action.variant === "primary"
                  ? "bg-gold text-black py-2.5 rounded-xl font-semibold"
                  : action.variant === "danger"
                  ? "border border-red-300 text-red-600 py-2.5 rounded-xl font-semibold"
                  : "border border-black/10 text-gray-600 py-2.5 rounded-xl font-semibold"
              }
            >
              {action.label}
            </button>
          ))}
          {onCancel && (
            <button onClick={onCancel} className="text-xs text-gray-400 mt-1">
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
