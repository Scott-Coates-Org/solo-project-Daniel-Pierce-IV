import { useState } from 'react';
import Dialog from './Dialog';

export default function ButtonDialog({ className, children, content }) {
  const [isOpen, setisOpen] = useState(false);

  function openDialog() {
    setisOpen(true);
  }

  function closeDialog() {
    setisOpen(false);
  }

  return (
    <div>
      <button type="button" className={className} onClick={openDialog}>
        {content}
      </button>

      {isOpen && <Dialog onClose={closeDialog}>{children}</Dialog>}
    </div>
  );
}
