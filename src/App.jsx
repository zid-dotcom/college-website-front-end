

// import React from 'react'
// import { Routes, Route } from 'react-router-dom'
// import Header from './components/Header'
// import Footer from './components/Footer'
// import Landing from './pages/Landing'
// import Auth from './pages/Auth'
// import Course from './pages/Course'
// import Events from './pages/Events'
// import Faculty from './pages/Faculty'
// import About from './pages/About'
// import Dashboard from './pages/Dashboard'
// import RequireAuth from './components/RequireAuth'

// export default function App(){
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <div className="flex-1">
//         <Routes>
//           <Route path="/" element={<Landing/>} />
//           <Route path="/auth" element={<Auth/>} />
//           <Route path="/courses" element={<Course/>} />
//           <Route path="/events" element={<Events/>} />
//           <Route path="/faculty" element={<Faculty/>} />
//           <Route path="/about" element={<About/>} />

//           {/* 🔒 Protected Route */}
//           <Route 
//             path="/dashboard" 
//             element={
//               <RequireAuth>
//                 <Dashboard />
//               </RequireAuth>
//             } 
//           />
//         </Routes>
//       </div>
//       <Footer />
//     </div>
//   )
// }





import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Course from './pages/Course'
import Events from './pages/Events'
import Faculty from './pages/Faculty'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import RequireAuth from './components/RequireAuth'

export default function App(){
  const location = useLocation();

  // Hide header + footer ONLY on dashboard pages
  const hideLayout = location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen flex flex-col">

      {/* Header hidden on Dashboard */}
      {!hideLayout && <Header />}

      <div className="flex-1">
        <Routes>

          <Route path="/" element={<Landing/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/courses" element={<Course/>} />
          <Route path="/events" element={<Events/>} />
          <Route path="/faculty" element={<Faculty/>} />
          <Route path="/about" element={<About/>} />

          {/* Dashboard (protected) */}
          <Route 
            path="/dashboard" 
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } 
          />

        </Routes>
      </div>

      {/* Footer hidden on Dashboard */}
      {!hideLayout && <Footer />}

    </div>
  )
}


