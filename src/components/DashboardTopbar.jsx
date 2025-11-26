// src/components/DashboardTopbar.jsx
import React from "react";

export default function DashboardTopbar({ onMenu = () => {} }) {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button onClick={onMenu} className="md:hidden p-2 rounded-md hover:bg-slate-100">Menu</button>
          <div className="text-sm text-slate-600">Admin panel</div>
        </div>

        <div className="flex-1 max-w-2xl">
          <label className="relative block">
            <input className="w-full border rounded-md px-4 py-2 text-sm" placeholder="Search courses, events or faculty..." />
            <span className="absolute right-3 top-2.5 text-slate-400 text-sm">⌘K</span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-3 py-2 rounded-md border text-sm">New</button>
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white grid place-items-center text-sm font-semibold">A</div>
        </div>
      </div>
    </div>
  );
}
