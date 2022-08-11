export default function Dialog({ onClose, children }) {
  function closeDialog() {
    onClose();
  }

  return (
    <div
      className="backdrop fixed inset-0 bg-[rgba(0,0,0,0.15)]"
      onClick={closeDialog}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="dialog fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-500"
      >
        {children}
      </div>
    </div>
  );
}
