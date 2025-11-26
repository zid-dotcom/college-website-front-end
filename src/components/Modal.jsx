// src/components/Modal.jsx
import React from "react";

export default function Modal({ open, title = "", onClose = () => {}, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative max-w-2xl w-full bg-white rounded-2xl shadow p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-slate-100">Close</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
