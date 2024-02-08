import { ReactNode } from "react";
import "./styles.scss";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
}

interface Children {
  children: ReactNode;
}

export default function Dialog({ open, onClose, children }: DialogProps & Children) {
  const className = `dialog-container ${!open && "close"}`;

  return (
    <dialog open={open} onClose={onClose} className={className}>
      <div autoFocus className="dialog-content">
        {children}
      </div>
    </dialog>
  );
}
