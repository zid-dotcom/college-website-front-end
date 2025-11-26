// src/components/ConfirmDialog.jsx
import React from "react";
import Modal from "./Modal";

export default function ConfirmDialog({ open, title = "Confirm", message = "", onCancel = () => {}, onConfirm = () => {} }) {
  return (
    <Modal open={open} title={title} onClose={onCancel}>
      <p className="text-sm text-slate-700 mb-4">{message}</p>
      <div className="flex justify-end gap-3">
        <button onClick={onCancel} className="px-3 py-2 rounded-md border">Cancel</button>
        <button onClick={onConfirm} className="px-3 py-2 rounded-md bg-red-600 text-white">Delete</button>
      </div>
    </Modal>
  );
}
