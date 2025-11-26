// src/components/StatCard.jsx
import React from "react";

export default function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="bg-indigo-50 rounded-full w-12 h-12 grid place-items-center text-indigo-600 font-bold">
          {String(value).slice(0, 2)}
        </div>
      </div>
    </div>
  );
}
