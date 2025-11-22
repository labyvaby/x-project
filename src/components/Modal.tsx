import { type ReactNode, useEffect } from 'react';

type ModalProps = {
  open: boolean;
  title?: string;
  onClose?: () => void;
  children?: ReactNode;
  actions?: ReactNode;
};

export function Modal({ open, title, onClose, children, actions }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        {title ? <h3>{title}</h3> : null}
        {children ? <div>{children}</div> : null}
        {actions ? <div className="modal-actions">{actions}</div> : null}
      </div>
    </div>
  );
}
