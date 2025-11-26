// import React from 'react'
// import { faculties } from '../data/dummy'

// export default function Faculty(){
//   return (
//     <main className="max-w-7xl mx-auto px-6 py-12">
//       <h2 className="text-2xl font-semibold">Faculty</h2>
//       <div className="mt-6 grid md:grid-cols-3 gap-6">
//         {faculties.map(f=> (
//           <div key={f.id} className="bg-white rounded-2xl shadow p-4 text-center">
//             <img src={f.img} alt={f.name} className="w-28 h-28 rounded-full mx-auto" />
//             <h4 className="mt-3 font-medium">{f.name}</h4>
//             <p className="text-sm text-slate-600">{f.dept}</p>
//             <p className="mt-2 text-sm text-slate-600">{f.bio}</p>
//           </div>
//         ))}
//       </div>
//     </main>
//   )
// }




// src/pages/Faculty.jsx
import React, { useEffect, useState } from "react";
import { getAllFaculty } from "../services/AllApi";

// fallback data if API fails
const FALLBACK_FACULTY = [
  {
    _id: "f1",
    name: "Dr. Ramesh Kumar",
    department: "Computer Science",
    imgURl: "https://picsum.photos/seed/faculty1/200",
    bio: "Expert in machine learning and AI research."
  },
  {
    _id: "f2",
    name: "Prof. Priya Sharma",
    department: "Electronics",
    imgURl: "https://picsum.photos/seed/faculty2/200",
    bio: "10+ years experience in embedded systems."
  },
  {
    _id: "f3",
    name: "Dr. John Mathew",
    department: "Physics",
    imgURl: "https://picsum.photos/seed/faculty3/200",
    bio: "Researcher in quantum materials."
  }
];

export default function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        const res = await getAllFaculty();

        const list = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
          ? res
          : [];

        if (mounted) {
          if (list.length > 0) setFaculty(list);
          else setFaculty(FALLBACK_FACULTY);
        }
      } catch (error) {
        console.error("Faculty fetch error:", error);
        if (mounted) {
          setErr("Failed to load faculty. Showing sample data.");
          setFaculty(FALLBACK_FACULTY);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();
    return () => (mounted = false);
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Faculty</h2>
        {loading && <span className="text-sm text-slate-500">Loading...</span>}
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-6">
        {faculty.map((f) => (
          <div
            key={f._id ?? f.id}
            className="bg-white rounded-2xl shadow p-6 text-center"
          >
            <img
              src={
                f.imgURl ??
                f.img ??
                `https://picsum.photos/seed/faculty-${f._id ?? f.id}/200`
              }
              alt={f.name}
              className="w-28 h-28 rounded-full mx-auto object-cover"
            />

            <h4 className="mt-4 font-medium text-lg">{f.name}</h4>

            <p className="text-sm text-indigo-600 font-medium">
              {f.department}
            </p>

            <p className="mt-2 text-sm text-slate-600">
              {f.bio ?? "—"}
            </p>
          </div>
        ))}
      </div>

      {err && <p className="mt-4 text-sm text-red-600">{err}</p>}
    </main>
  );
}
