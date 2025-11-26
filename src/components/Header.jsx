

// import React, { useEffect, useState } from 'react'
// import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { logoutLocal } from '../services/AllApi'

// export default function Header(){
//   const navigate = useNavigate()
//   const [user, setUser] = useState(null)

//   useEffect(() => {
//     const storedUser = localStorage.getItem('raynott_user')
//     if (storedUser) {
//       setUser(JSON.parse(storedUser))
//     }
//   }, [])

//   const isAuthed = !!localStorage.getItem('raynott_token')

//   const handleLogout = () => {
//     logoutLocal()
//     setUser(null)
//     navigate('/auth')
//   }

//   return (
//     <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-3">
//           <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold">
//             R
//           </div>
//           <div>
//             <h1 className="text-lg font-semibold">Raynott College</h1>
//             <p className="text-xs text-slate-500 -mt-1">Learn. Lead. Launch.</p>
//           </div>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center gap-6">
//           <NavLink to="/courses">Courses</NavLink>
//           <NavLink to="/events">Events</NavLink>
//           <NavLink to="/faculty">Faculty</NavLink>
//           <NavLink to="/about">About</NavLink>
//         </nav>

//         {/* Right authentication area */}
//         <div className="flex items-center gap-4">
//           {isAuthed ? (
//             <>
//               <span className="text-sm text-slate-700">
//                 Hi, <strong>{user?.name ?? "Student"}</strong>
//               </span>
//               <button
//                 onClick={handleLogout}
//                 className="px-3 py-1 rounded-md border"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <Link
//               to="/auth"
//               className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm"
//             >
//               Login / Register
//             </Link>
//           )}
//         </div>

//       </div>
//     </header>
//   )
// }



import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-indigo-600 font-medium"
      : "text-slate-700 hover:text-indigo-600";

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold">
              R
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold leading-none">Raynott College</h1>
              <p className="text-xs text-slate-500 -mt-1">Learn. Lead. Launch.</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink className={navLinkClass} to="/">Home</NavLink>
            <NavLink className={navLinkClass} to="/courses">Courses</NavLink>
            <NavLink className={navLinkClass} to="/events">Events</NavLink>
            <NavLink className={navLinkClass} to="/faculty">Faculty</NavLink>
            <NavLink className={navLinkClass} to="/about">About</NavLink>
            <NavLink
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm"
              to="/auth"
            >
              Login
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden inline-flex items-center justify-center p-2 
                   rounded-md text-slate-700 hover:bg-slate-200"
          >
            {open ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <nav className="px-4 py-4 space-y-3 flex flex-col">

            <NavLink onClick={() => setOpen(false)} className={navLinkClass} to="/">
              Home
            </NavLink>

            <NavLink onClick={() => setOpen(false)} className={navLinkClass} to="/courses">
              Courses
            </NavLink>

            <NavLink onClick={() => setOpen(false)} className={navLinkClass} to="/events">
              Events
            </NavLink>

            <NavLink onClick={() => setOpen(false)} className={navLinkClass} to="/faculty">
              Faculty
            </NavLink>

            <NavLink onClick={() => setOpen(false)} className={navLinkClass} to="/about">
              About
            </NavLink>

            <NavLink
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-center text-sm"
              to="/auth"
            >
              Login
            </NavLink>

          </nav>
        </div>
      )}
    </header>
  );
}
