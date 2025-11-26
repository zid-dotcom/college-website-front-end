
// export default function DataTable({ title, columns = [], rows = [], onEdit, onDelete }) {
//   return (
//     <div className="w-full overflow-x-auto">
//       {title && <div className="mb-4 flex items-center justify-between">
//         <h3 className="text-lg font-semibold">{title}</h3>
//         <div className="text-sm text-slate-500">{rows.length} items</div>
//       </div>}

//       <table className="min-w-full bg-white rounded-2xl overflow-hidden shadow-sm">
//         <thead className="bg-slate-50">
//           <tr>
//             {columns.map((col) => (
//               <th key={col.key} className="px-4 py-3 text-left text-sm text-slate-600">{col.label}</th>
//             ))}
//             {/* Actions header */}
//             {(onEdit || onDelete) && <th className="px-4 py-3 text-right text-sm text-slate-600">Actions</th>}
//           </tr>
//         </thead>

//         <tbody>
//           {rows.length === 0 ? (
//             <tr>
//               <td colSpan={columns.length + ((onEdit || onDelete) ? 1 : 0)} className="px-4 py-6 text-center text-sm text-slate-500">
//                 No items found.
//               </td>
//             </tr>
//           ) : (
//             rows.map((row) => {
//               const rowKey = row._id ?? row.id ?? JSON.stringify(row);
//               return (
//                 <tr key={rowKey} className="border-t last:border-b">
//                   {columns.map((col) => {
//                     const value = row[col.key];

//                     // If column appears to be an image url, render it
//                     if (col.key === "imgURl" || col.key.toLowerCase().includes("img") || (typeof value === "string" && value.startsWith("http"))) {
//                       return (
//                         <td key={col.key} className="px-4 py-3 align-top">
//                           {value ? (
//                             <img src={value} alt={row.name ?? row.title ?? col.key} className="w-14 h-14 rounded-md object-cover border" />
//                           ) : (
//                             <div className="w-14 h-14 rounded-md bg-slate-100 flex items-center justify-center text-xs text-slate-400">No image</div>
//                           )}
//                         </td>
//                       );
//                     }

//                     // Date formatting for date-like columns
//                     if (col.key.toLowerCase().includes("date") && value) {
//                       const dt = new Date(value);
//                       const txt = isNaN(dt) ? String(value) : dt.toLocaleDateString();
//                       return <td key={col.key} className="px-4 py-3 text-sm text-slate-700">{txt}</td>;
//                     }

//                     // Default text cell (truncate long text)
//                     return (
//                       <td key={col.key} className="px-4 py-3 text-sm text-slate-700">
//                         <div className="max-w-xs truncate">{value ?? "-"}</div>
//                       </td>
//                     );
//                   })}

//                   {/* Actions */}
//                   {(onEdit || onDelete) && (
//                     <td className="px-4 py-3 text-right">
//                       <div className="inline-flex items-center gap-2">
//                         {onEdit && (
//                           <button
//                             onClick={() => onEdit(row)}
//                             className="px-3 py-1 rounded-md border text-sm bg-white hover:bg-slate-50"
//                           >
//                             Edit
//                           </button>
//                         )}
//                         {onDelete && (
//                           <button
//                             onClick={() => onDelete(row)}
//                             className="px-3 py-1 rounded-md border text-sm text-red-600 hover:bg-red-50"
//                           >
//                             Delete
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   )}
//                 </tr>
//               );
//             })
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }



// src/components/DataTable.jsx
import React from "react";

/**
 * Props:
 *  - title: optional string
 *  - columns: [{ key: 'name', label: 'Name' }, ...]
 *  - rows: array of objects
 *  - onEdit: function(row) optional
 *  - onDelete: function(row) optional
 */
export default function DataTable({ title, columns = [], rows = [], onEdit, onDelete }) {
  // Defensive: ensure rows is an array (avoid runtime crashes)
  const safeRows = Array.isArray(rows) ? rows : (rows && Array.isArray(rows.data) ? rows.data : []);
  if (!Array.isArray(rows)) {
    // only log when shape is unexpected to avoid noise
    console.warn("DataTable: received non-array 'rows' prop. Using fallback array. rows=", rows);
  }

  // Defensive: ensure columns is an array of objects with key+label
  const safeCols = Array.isArray(columns) ? columns : [];
  if (!Array.isArray(columns)) {
    console.warn("DataTable: received non-array 'columns' prop. columns=", columns);
  }

  const actionsExist = typeof onEdit === "function" || typeof onDelete === "function";

  return (
    <div className="w-full overflow-x-auto">
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="text-sm text-slate-500">{safeRows.length} items</div>
        </div>
      )}

      <table className="min-w-full bg-white rounded-2xl overflow-hidden shadow-sm">
        <thead className="bg-slate-50">
          <tr>
            {safeCols.map((col, idx) => (
              <th key={col?.key ?? `col-${idx}`} className="px-4 py-3 text-left text-sm text-slate-600">
                {col?.label ?? (col?.key ?? `Column ${idx + 1}`)}
              </th>
            ))}

            {actionsExist && (
              <th className="px-4 py-3 text-right text-sm text-slate-600">Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {safeRows.length === 0 ? (
            <tr>
              <td
                colSpan={safeCols.length + (actionsExist ? 1 : 0)}
                className="px-4 py-6 text-center text-sm text-slate-500"
              >
                No items found.
              </td>
            </tr>
          ) : (
            safeRows.map((row, rowIndex) => {
              const rowKey = row?._id ?? row?.id ?? `row-${rowIndex}`;
              return (
                <tr key={rowKey} className="border-t last:border-b">
                  {safeCols.map((col, colIndex) => {
                    const key = col?.key ?? `col-${colIndex}`;
                    const value = row ? row[key] : undefined;

                    // Image heuristics
                    const looksLikeImage =
                      key === "imgURl" || (key && key.toLowerCase().includes("img")) ||
                      (typeof value === "string" && (value.startsWith("http") || value.startsWith("data:")));

                    if (looksLikeImage) {
                      return (
                        <td key={key} className="px-4 py-3 align-top">
                          {value ? (
                            <img
                              src={value}
                              alt={row?.name ?? row?.title ?? key}
                              className="w-14 h-14 rounded-md object-cover border"
                              onError={(e) => { e.currentTarget.style.display = "none"; }}
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-md bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                              No image
                            </div>
                          )}
                        </td>
                      );
                    }

                    // Date formatting guard
                    if (key && key.toLowerCase().includes("date") && value) {
                      const dt = new Date(value);
                      const txt = isNaN(dt) ? String(value) : dt.toLocaleDateString();
                      return (
                        <td key={key} className="px-4 py-3 text-sm text-slate-700">
                          {txt}
                        </td>
                      );
                    }

                    // Default cell
                    return (
                      <td key={key} className="px-4 py-3 text-sm text-slate-700">
                        <div className="max-w-xs truncate">{value ?? "-"}</div>
                      </td>
                    );
                  })}

                  {actionsExist && (
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        {typeof onEdit === "function" && (
                          <button
                            onClick={() => onEdit(row)}
                            className="px-3 py-1 rounded-md border text-sm bg-white hover:bg-slate-50"
                          >
                            Edit
                          </button>
                        )}
                        {typeof onDelete === "function" && (
                          <button
                            onClick={() => onDelete(row)}
                            className="px-3 py-1 rounded-md border text-sm text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
