// // src/components/DashboardSidebar.jsx
// import React from "react";
// import { NavLink } from "react-router-dom";

// export default function DashboardSidebar({ open = false, onClose = () => {}, onNav = () => {}, active }) {
//   // We'll render as a visible sidebar on md+ and a sliding panel on mobile (open prop)
//   return (
//     <>
//       {/* Desktop sidebar */}
//       <aside className="hidden md:block w-64 bg-white border-r h-screen sticky top-0">
//         <div className="p-6">
//           <h3 className="text-lg font-semibold">Admin</h3>
//           <p className="text-sm text-slate-500 mt-1">Raynott College</p>

//           <nav className="mt-6 space-y-2">
//             <button onClick={() => onNav("overview")} className={`w-full text-left px-3 py-2 rounded-md ${active === "overview" ? "bg-indigo-50 text-indigo-600" : "text-slate-700 hover:bg-slate-50"}`}>Overview</button>
//             <button onClick={() => onNav("courses")} className={`w-full text-left px-3 py-2 rounded-md ${active === "courses" ? "bg-indigo-50 text-indigo-600" : "text-slate-700 hover:bg-slate-50"}`}>Courses</button>
//             <button onClick={() => onNav("events")} className={`w-full text-left px-3 py-2 rounded-md ${active === "events" ? "bg-indigo-50 text-indigo-600" : "text-slate-700 hover:bg-slate-50"}`}>Events</button>
//             <button onClick={() => onNav("faculty")} className={`w-full text-left px-3 py-2 rounded-md ${active === "faculty" ? "bg-indigo-50 text-indigo-600" : "text-slate-700 hover:bg-slate-50"}`}>Faculty</button>

//             <NavLink to="/" className="block mt-4 text-sm text-slate-600 hover:text-indigo-600">View Website →</NavLink>
//           </nav>
//         </div>
//       </aside>

//       {/* Mobile slide-over */}
//       <div className={`md:hidden fixed inset-0 z-50 transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}>
//         <div className="w-72 bg-white h-full border-r p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-lg font-semibold">Admin</h3>
//               <p className="text-sm text-slate-500 mt-1">Raynott College</p>
//             </div>
//             <button onClick={onClose} className="p-2 rounded-md hover:bg-slate-100">Close</button>
//           </div>

//           <nav className="mt-6 space-y-2">
//             <button onClick={() => { onNav("overview"); onClose(); }} className="w-full text-left px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50">Overview</button>
//             <button onClick={() => { onNav("courses"); onClose(); }} className="w-full text-left px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50">Courses</button>
//             <button onClick={() => { onNav("events"); onClose(); }} className="w-full text-left px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50">Events</button>
//             <button onClick={() => { onNav("faculty"); onClose(); }} className="w-full text-left px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50">Faculty</button>
//           </nav>
//         </div>

//         {/* backdrop */}
//         <div onClick={onClose} className="flex-1 bg-black/30"></div>
//       </div>
//     </>
//   );
// }



// src/components/DashboardSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ active, label, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition 
      ${active ? "bg-indigo-50 text-indigo-600" : "text-slate-700 hover:bg-slate-50"}`}
  >
    <span className="w-5 h-5 flex-shrink-0" aria-hidden>
      {icon}
    </span>
    <span className="text-sm">{label}</span>
  </button>
);

export default function DashboardSidebar({ open = false, onClose = () => {}, onNav = () => {}, active }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white border-r h-screen sticky top-0">
        <div className="p-6 flex-1 flex flex-col">
          <div>
            <h3 className="text-lg font-semibold">Admin</h3>
            <p className="text-sm text-slate-500 mt-1">Raynott College</p>
          </div>

          <nav className="mt-6 flex-1 space-y-2">
            <NavItem
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 12h18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 6h18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              label="Overview"
              active={active === "overview"}
              onClick={() => onNav("overview")}
            />

            <NavItem
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 6h16v12H4z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              label="Courses"
              active={active === "courses"}
              onClick={() => onNav("courses")}
            />

            <NavItem
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2v20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 7h14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              label="Events"
              active={active === "events"}
              onClick={() => onNav("events")}
            />

            <NavItem
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="8" r="3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 20c0-3 3-5 6-5s6 2 6 5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              label="Faculty"
              active={active === "faculty"}
              onClick={() => onNav("faculty")}
            />
          </nav>

          {/* View Website at bottom */}
          <div className="mt-6 pt-4 border-t">
            <NavLink
              to="/"
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600"
            >
              <span className="text-xs">←</span>
              <span>View Website</span>
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Mobile slide-over */}
      <div
        aria-hidden={!open}
        className={`md:hidden fixed inset-0 z-50 pointer-events-none transition-opacity ${open ? "pointer-events-auto" : ""}`}
      >
        {/* Backdrop */}
        <div
          onClick={onClose}
          className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        />

        {/* Panel */}
        <aside
          role="dialog"
          aria-modal="true"
          className={`absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl transform transition-transform
            ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="p-4 flex items-center justify-between border-b">
            <div>
              <h3 className="text-lg font-semibold">Admin</h3>
              <p className="text-sm text-slate-500">Raynott College</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 rounded-md text-slate-600 hover:bg-slate-100"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <nav className="p-4 space-y-2">
            <button onClick={() => { onNav("overview"); onClose(); }} className="w-full text-left px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50 flex items-center gap-3">
              <span className="w-5 h-5" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12h18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <span className="text-sm">Overview</span>
            </button>

            <button onClick={() => { onNav("courses"); onClose(); }} className="w-full text-left px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50 flex items-center gap-3">
              <span className="w-5 h-5" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 6h16v12H4z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <span className="text-sm">Courses</span>
            </button>

            <button onClick={() => { onNav("events"); onClose(); }} className="w-full text-left px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50 flex items-center gap-3">
              <span className="w-5 h-5" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2v20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <span className="text-sm">Events</span>
            </button>

            <button onClick={() => { onNav("faculty"); onClose(); }} className="w-full text-left px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50 flex items-center gap-3">
              <span className="w-5 h-5" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 20c0-3 3-5 6-5s6 2 6 5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <span className="text-sm">Faculty</span>
            </button>
          </nav>

          {/* Bottom action - view website */}
          <div className="absolute left-0 right-0 bottom-0 p-4 border-t bg-white">
            <NavLink to="/" onClick={onClose} className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600">
              <span className="text-xs">←</span>
              <span>View Website</span>
            </NavLink>
          </div>
        </aside>
      </div>
    </>
  );
}


