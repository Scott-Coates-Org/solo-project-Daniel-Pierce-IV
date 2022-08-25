export default function Dialog({ onClose, children }) {
  function closeDialog() {
    onClose();
  }

  return (
    <div
      className="backdrop fixed z-10 inset-0 bg-[rgba(255,255,255,0.075)]"
      onClick={closeDialog}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="dialog fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {children}
      </div>
    </div>
  );
}
