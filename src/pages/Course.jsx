// import React from 'react'
// import { courses } from '../data/dummy'

// export default function Course(){
//   return (
//     <main className="max-w-7xl mx-auto px-6 py-12">
//       <h2 className="text-2xl font-semibold">All Courses</h2>
//       <div className="mt-6 grid md:grid-cols-3 gap-6">
//         {courses.map(c=> (
//           <article key={c.id} className="bg-white rounded-2xl shadow p-4">
//             <img src={c.img} alt={c.title} className="w-full h-40 object-cover rounded-lg" />
//             <h3 className="mt-3 font-semibold">{c.title}</h3>
//             <p className="text-sm text-slate-600">{c.duration}</p>
//             <p className="mt-2 text-sm text-slate-600">{c.description}</p>
//             <div className="mt-3 flex justify-between items-center">
//               <button className="px-3 py-1 rounded-md border">Details</button>
//               <button className="px-3 py-1 rounded-md bg-indigo-600 text-white">Apply</button>
//             </div>
//           </article>
//         ))}
//       </div>
//     </main>
//   )
// }





// src/pages/Course.jsx
import React, { useEffect, useState } from "react";
import { getAllCourses } from "../services/AllApi";
import Modal from "../components/Modal";

// fallback if API fails
const FALLBACK_COURSES = [
  { _id: "c1", title: "Intro to Web Dev", duration: "6 months", description: "Build modern websites.", imgurl: "https://picsum.photos/seed/course1/800/500" },
  { _id: "c2", title: "Data Structures", duration: "1 year", description: "Learn algorithms & data structures.", imgurl: "https://picsum.photos/seed/course2/800/500" },
  { _id: "c3", title: "UI/UX Basics", duration: "3 months", description: "Design beautiful user interfaces.", imgurl: "https://picsum.photos/seed/course3/800/500" },
];

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // Apply modal state
  const [appliedOpen, setAppliedOpen] = useState(false);
  const [appliedCourse, setAppliedCourse] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        const res = await getAllCourses();

        const list = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
          ? res
          : [];

        if (mounted) {
          if (list.length > 0) setCourses(list);
          else setCourses(FALLBACK_COURSES);
        }
      } catch (error) {
        console.error("Error loading courses:", error);
        if (mounted) {
          setErr("Failed to load courses. Showing sample data.");
          setCourses(FALLBACK_COURSES);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  // auto close modal
  useEffect(() => {
    if (appliedOpen) {
      const t = setTimeout(() => setAppliedOpen(false), 2000);
      return () => clearTimeout(t);
    }
  }, [appliedOpen]);

  function handleApply(course) {
    setAppliedCourse(course);
    setAppliedOpen(true);
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">All Courses</h2>
        {loading && <span className="text-sm text-slate-500">Loading...</span>}
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-6">
        {courses.map((c) => (
          <article key={c._id ?? c.id} className="bg-white rounded-2xl shadow p-4">
            <img
              src={c.imgurl ?? c.img ?? `https://picsum.photos/seed/course-${c._id}/800/500`}
              alt={c.title ?? c.name}
              className="w-full h-40 object-cover rounded-lg"
            />

            <h3 className="mt-3 font-semibold">{c.title ?? c.name}</h3>
            <p className="text-sm text-slate-600">{c.duration}</p>

            <p className="mt-2 text-sm text-slate-600">{c.description ?? c.desc}</p>

            <div className="mt-3 flex justify-between items-center">
              <button className="px-3 py-1 rounded-md border">Details</button>
              <button
                onClick={() => handleApply(c)}
                className="px-3 py-1 rounded-md bg-indigo-600 text-white"
              >
                Apply
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Error message */}
      {err && <p className="mt-4 text-sm text-red-600">{err}</p>}

      {/* Apply Success Modal */}
      <Modal open={appliedOpen} title="Application submitted" onClose={() => setAppliedOpen(false)}>
        <div className="py-4">
          <p className="text-sm text-slate-700">
            {appliedCourse
              ? `You have successfully applied for "${appliedCourse.title ?? appliedCourse.name}".`
              : "Applied successfully."}
          </p>
          <div className="mt-4 text-right">
            <button onClick={() => setAppliedOpen(false)} className="px-3 py-2 rounded-md border">
              Close
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
