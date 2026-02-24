import * as React from "react";

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => onOpenChange(false)}
    >
      {children}
    </div>
  );
};

export const DialogContent = ({ children, className }) => (
  <div
    className={`bg-white p-6 rounded-lg shadow-lg ${className}`}
    onClick={(e) => e.stopPropagation()}
  >
    {children}
  </div>
);

export const DialogHeader = ({ children }) => (
  <div className="mb-4">{children}</div>
);

export const DialogTitle = ({ children }) => (
  <h2 className="text-xl font-bold">{children}</h2>
);

export const DialogFooter = ({ children, className = "" }) => {
    return (
        <div className={`flex justify-end gap-2 mt-4 ${className}`}>
            {children}
        </div>
    );
};