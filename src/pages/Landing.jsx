
// // src/pages/Landing.jsx
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getAllCourses, getAllEvents } from "../services/AllApi";

// // Optional lightweight fallback placeholders (used only if API fails)
// const FALLBACK_COURSES = [
//   { _id: "c1", title: "Intro to Web Dev", duration: "6 months", description: "Build modern websites.", imgurl: "https://picsum.photos/seed/course1/800/500" },
//   { _id: "c2", title: "Data Structures", duration: "1 year", description: "Learn algorithms & data structures.", imgurl: "https://picsum.photos/seed/course2/800/500" },
//   { _id: "c3", title: "UI/UX Basics", duration: "3 months", description: "Design beautiful user interfaces.", imgurl: "https://picsum.photos/seed/course3/800/500" },
// ];

// const FALLBACK_EVENTS = [
//   { _id: "e1", name: "Meet & Greet", date: "2025-12-05", description: "Join the campus community.", img: "https://picsum.photos/seed/event1/900/500" },
//   { _id: "e2", name: "Tech Talk", date: "2025-12-10", description: "Industry experts share insights.", img: "https://picsum.photos/seed/event2/900/500" },
// ];

// export default function Landing() {
//   const [courses, setCourses] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState(null);

//   useEffect(() => {
//     let mounted = true;
//     async function fetchData() {
//       setLoading(true);
//       setErr(null);
//       try {
//         const [cRes, eRes] = await Promise.allSettled([getAllCourses(), getAllEvents()]);

//         const fetchedCourses =
//           cRes.status === "fulfilled" ? (Array.isArray(cRes.value?.data) ? cRes.value.data : (Array.isArray(cRes.value) ? cRes.value : [])) : null;

//         const fetchedEvents =
//           eRes.status === "fulfilled" ? (Array.isArray(eRes.value?.data) ? eRes.value.data : (Array.isArray(eRes.value) ? eRes.value : [])) : null;

//         if (!mounted) return;

//         if (fetchedCourses && fetchedCourses.length > 0) {
//           setCourses(fetchedCourses.slice(0, 3));
//         } else {
//           // fallback
//           setCourses(FALLBACK_COURSES);
//         }

//         if (fetchedEvents && fetchedEvents.length > 0) {
//           setEvents(fetchedEvents.slice(0, 2));
//         } else {
//           setEvents(FALLBACK_EVENTS);
//         }
//       } catch (error) {
//         console.error("Landing fetch error:", error);
//         if (!mounted) return;
//         setErr("Failed to load content. Showing sample data.");
//         setCourses(FALLBACK_COURSES);
//         setEvents(FALLBACK_EVENTS);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }

//     fetchData();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   function formatDate(d) {
//     if (!d) return "";
//     const dt = new Date(d);
//     if (isNaN(dt)) return d;
//     return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
//   }

//   return (
//     <main className="max-w-7xl mx-auto px-6 py-12">
//       <section className="grid md:grid-cols-2 gap-8 items-center">
//         <div>
//           <h2 className="text-4xl font-extrabold leading-tight">
//             Welcome to <span className="text-indigo-600">Raynott College</span>
//           </h2>
//           <p className="mt-4 text-slate-600">A warm place to learn, innovate and grow. Explore programs, events and our alumni network.</p>
//           <div className="mt-6 flex gap-3">
//             <Link to="/courses" className="px-5 py-3 rounded-md bg-indigo-600 text-white">Explore Courses</Link>
//             <Link to="/events" className="px-5 py-3 rounded-md border">Upcoming Events</Link>
//           </div>
//         </div>

//         <div className="rounded-2xl overflow-hidden shadow-lg">
//           <img src="https://picsum.photos/seed/campus/900/600" alt="campus" className="w-full h-full object-cover" />
//         </div>
//       </section>

//       <section className="mt-12">
//         <div className="flex items-center justify-between">
//           <h3 className="text-2xl font-semibold">Popular Courses</h3>
//           {loading ? <div className="text-sm text-slate-400">Loading...</div> : null}
//         </div>

//         <div className="mt-4 grid md:grid-cols-3 gap-6">
//           {courses.map((c) => (
//             <div key={c._id ?? c.id} className="bg-white rounded-2xl shadow p-4">
//               <img src={c.imgurl ?? c.img ?? `https://picsum.photos/seed/course-${c._id ?? c.id}/800/500`} alt={c.title ?? c.name} className="w-full h-40 object-cover rounded-lg" />
//               <h4 className="mt-3 font-semibold">{c.title ?? c.name}</h4>
//               <p className="text-sm text-slate-600">{c.duration ?? c.time ?? ""}</p>
//               <p className="mt-2 text-sm text-slate-600">{c.description ?? c.desc ?? ""}</p>
//               <div className="mt-3 flex justify-between items-center">
//                 <Link to="/courses" className="text-indigo-600 text-sm">View all</Link>
//                 <button className="text-sm px-3 py-1 rounded-md border">Apply</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="mt-12">
//         <div className="flex items-center justify-between">
//           <h3 className="text-2xl font-semibold">Upcoming Events</h3>
//           {loading ? <div className="text-sm text-slate-400">Loading...</div> : null}
//         </div>

//         <div className="mt-4 grid md:grid-cols-2 gap-6">
//           {events.map((ev) => (
//             <div key={ev._id ?? ev.id} className="relative rounded-xl overflow-hidden bg-white shadow">
//               <img src={ev.img ?? ev.imgurl ?? `https://picsum.photos/seed/event-${ev._id ?? ev.id}/900/500`} alt={ev.name ?? ev.title} className="w-full h-48 object-cover" />
//               <div className="p-4">
//                 <h4 className="font-semibold">{ev.name ?? ev.title}</h4>
//                 <p className="text-sm text-slate-600">{formatDate(ev.date)} — {ev.description ?? ev.desc ?? ""}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="mt-12">
//         <h3 className="text-2xl font-semibold">Alumni Spotlight</h3>
//         <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
//           {/* If you have alumni API later, swap this with API data. For now keep small placeholders */}
//           <div className="bg-white rounded-xl p-4 text-center shadow">
//             <img src="https://picsum.photos/seed/alum1/80" className="w-20 h-20 rounded-full mx-auto" alt="alumni" />
//             <h5 className="mt-3 font-medium">A. Ramesh</h5>
//             <p className="text-sm text-slate-600">Batch 2018 — Software Engg</p>
//           </div>

//           <div className="bg-white rounded-xl p-4 text-center shadow">
//             <img src="https://picsum.photos/seed/alum2/80" className="w-20 h-20 rounded-full mx-auto" alt="alumni" />
//             <h5 className="mt-3 font-medium">S. Priya</h5>
//             <p className="text-sm text-slate-600">Batch 2019 — Product</p>
//           </div>

//           <div className="bg-white rounded-xl p-4 text-center shadow">
//             <img src="https://picsum.photos/seed/alum3/80" className="w-20 h-20 rounded-full mx-auto" alt="alumni" />
//             <h5 className="mt-3 font-medium">R. Karthik</h5>
//             <p className="text-sm text-slate-600">Batch 2017 — Data</p>
//           </div>

//           <div className="bg-white rounded-xl p-4 text-center shadow">
//             <img src="https://picsum.photos/seed/alum4/80" className="w-20 h-20 rounded-full mx-auto" alt="alumni" />
//             <h5 className="mt-3 font-medium">L. Anu</h5>
//             <p className="text-sm text-slate-600">Batch 2020 — Design</p>
//           </div>
//         </div>
//       </section>

//       {err && <div className="mt-6 text-sm text-red-600">{err}</div>}
//     </main>
//   );
// }






// src/pages/Landing.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCourses, getAllEvents } from "../services/AllApi";
import Modal from "../components/Modal"; // use existing Modal component

// Optional lightweight fallback placeholders (used only if API fails)
const FALLBACK_COURSES = [
  { _id: "c1", title: "Intro to Web Dev", duration: "6 months", description: "Build modern websites.", imgurl: "https://picsum.photos/seed/course1/800/500" },
  { _id: "c2", title: "Data Structures", duration: "1 year", description: "Learn algorithms & data structures.", imgurl: "https://picsum.photos/seed/course2/800/500" },
  { _id: "c3", title: "UI/UX Basics", duration: "3 months", description: "Design beautiful user interfaces.", imgurl: "https://picsum.photos/seed/course3/800/500" },
];

const FALLBACK_EVENTS = [
  { _id: "e1", name: "Meet & Greet", date: "2025-12-05", description: "Join the campus community.", img: "https://picsum.photos/seed/event1/900/500" },
  { _id: "e2", name: "Tech Talk", date: "2025-12-10", description: "Industry experts share insights.", img: "https://picsum.photos/seed/event2/900/500" },
];

export default function Landing() {
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // Apply modal state
  const [appliedOpen, setAppliedOpen] = useState(false);
  const [appliedCourse, setAppliedCourse] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      setLoading(true);
      setErr(null);
      try {
        const [cRes, eRes] = await Promise.allSettled([getAllCourses(), getAllEvents()]);

        const fetchedCourses =
          cRes.status === "fulfilled" ? (Array.isArray(cRes.value?.data) ? cRes.value.data : (Array.isArray(cRes.value) ? cRes.value : [])) : null;

        const fetchedEvents =
          eRes.status === "fulfilled" ? (Array.isArray(eRes.value?.data) ? eRes.value.data : (Array.isArray(eRes.value) ? eRes.value : [])) : null;

        if (!mounted) return;

        if (fetchedCourses && fetchedCourses.length > 0) {
          setCourses(fetchedCourses.slice(0, 3));
        } else {
          // fallback
          setCourses(FALLBACK_COURSES);
        }

        if (fetchedEvents && fetchedEvents.length > 0) {
          setEvents(fetchedEvents.slice(0, 2));
        } else {
          setEvents(FALLBACK_EVENTS);
        }
      } catch (error) {
        console.error("Landing fetch error:", error);
        if (!mounted) return;
        setErr("Failed to load content. Showing sample data.");
        setCourses(FALLBACK_COURSES);
        setEvents(FALLBACK_EVENTS);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  // Auto-close timer ref
  useEffect(() => {
    let t;
    if (appliedOpen) {
      t = setTimeout(() => setAppliedOpen(false), 2000);
    }
    return () => clearTimeout(t);
  }, [appliedOpen]);

  function formatDate(d) {
    if (!d) return "";
    const dt = new Date(d);
    if (isNaN(dt)) return d;
    return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }

  // Called when user clicks Apply
  function handleApply(course) {
    setAppliedCourse(course);
    setAppliedOpen(true);
    // In real app, call apply API here if needed
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-4xl font-extrabold leading-tight">
            Welcome to <span className="text-indigo-600">Raynott College</span>
          </h2>
          <p className="mt-4 text-slate-600">A warm place to learn, innovate and grow. Explore programs, events and our alumni network.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/courses" className="px-5 py-3 rounded-md bg-indigo-600 text-white">Explore Courses</Link>
            <Link to="/events" className="px-5 py-3 rounded-md border">Upcoming Events</Link>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img src="https://plus.unsplash.com/premium_photo-1684769161409-f6de69d3f274?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5zdGl0dXRlfGVufDB8fDB8fHww" alt="campus" className="w-full h-full object-cover" />
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Popular Courses</h3>
          {loading ? <div className="text-sm text-slate-400">Loading...</div> : null}
        </div>

        <div className="mt-4 grid md:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div key={c._id ?? c.id} className="bg-white rounded-2xl shadow p-4">
              <img src={c.imgurl ?? c.img ?? `https://picsum.photos/seed/course-${c._id ?? c.id}/800/500`} alt={c.title ?? c.name} className="w-full h-40 object-cover rounded-lg" />
              <h4 className="mt-3 font-semibold">{c.title ?? c.name}</h4>
              <p className="text-sm text-slate-600">{c.duration ?? c.time ?? ""}</p>
              <p className="mt-2 text-sm text-slate-600">{c.description ?? c.desc ?? ""}</p>
              <div className="mt-3 flex justify-between items-center">
                <Link to="/courses" className="text-indigo-600 text-sm">View all</Link>
                <button onClick={() => handleApply(c)} className="text-sm px-3 py-1 rounded-md border">Apply</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Upcoming Events</h3>
          {loading ? <div className="text-sm text-slate-400">Loading...</div> : null}
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-6">
          {events.map((ev) => (
            <div key={ev._id ?? ev.id} className="relative rounded-xl overflow-hidden bg-white shadow">
              <img src={ev.img ?? ev.imgurl ?? `https://picsum.photos/seed/event-${ev._id ?? ev.id}/900/500`} alt={ev.name ?? ev.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="font-semibold">{ev.name ?? ev.title}</h4>
                <p className="text-sm text-slate-600">{formatDate(ev.date)} — {ev.description ?? ev.desc ?? ""}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h3 className="text-2xl font-semibold">Alumni Spotlight</h3>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* If you have alumni API later, swap this with API data. For now keep small placeholders */}
          <div className="bg-white rounded-xl p-4 text-center shadow">
            <img src="https://picsum.photos/seed/alum1/80" className="w-20 h-20 rounded-full mx-auto" alt="alumni" />
            <h5 className="mt-3 font-medium">A. Ramesh</h5>
            <p className="text-sm text-slate-600">Batch 2018 — Software Engg</p>
          </div>

          <div className="bg-white rounded-xl p-4 text-center shadow">
            <img src="https://picsum.photos/seed/alum2/80" className="w-20 h-20 rounded-full mx-auto" alt="alumni" />
            <h5 className="mt-3 font-medium">S. Priya</h5>
            <p className="text-sm text-slate-600">Batch 2019 — Product</p>
          </div>

          <div className="bg-white rounded-xl p-4 text-center shadow">
            <img src="https://picsum.photos/seed/alum3/80" className="w-20 h-20 rounded-full mx-auto" alt="alumni" />
            <h5 className="mt-3 font-medium">R. Karthik</h5>
            <p className="text-sm text-slate-600">Batch 2017 — Data</p>
          </div>

          <div className="bg-white rounded-xl p-4 text-center shadow">
            <img src="https://picsum.photos/seed/alum4/80" className="w-20 h-20 rounded-full mx-auto" alt="alumni" />
            <h5 className="mt-3 font-medium">L. Anu</h5>
            <p className="text-sm text-slate-600">Batch 2020 — Design</p>
          </div>
        </div>
      </section>

      {err && <div className="mt-6 text-sm text-red-600">{err}</div>}

      {/* Apply Success Modal */}
      <Modal open={appliedOpen} title="Application submitted" onClose={() => setAppliedOpen(false)}>
        <div className="py-4">
          <p className="text-sm text-slate-700">
            {appliedCourse ? `You have successfully applied for "${appliedCourse.title ?? appliedCourse.name}".` : "Applied successfully."}
          </p>
          <div className="mt-4 text-right">
            <button onClick={() => setAppliedOpen(false)} className="px-3 py-2 rounded-md border">Close</button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
