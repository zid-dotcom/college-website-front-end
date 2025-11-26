// import React from 'react'
// import { events } from '../data/dummy'

// export default function Events(){
//   return (
//     <main className="max-w-7xl mx-auto px-6 py-12">
//       <h2 className="text-2xl font-semibold">Events</h2>
//       <div className="mt-6 grid md:grid-cols-2 gap-6">
//         {events.map(ev=> (
//           <div key={ev.id} className="bg-white rounded-2xl shadow overflow-hidden">
//             <img src={ev.img} alt={ev.title} className="w-full h-48 object-cover" />
//             <div className="p-4">
//               <h3 className="font-semibold">{ev.title}</h3>
//               <p className="text-sm text-slate-600">{ev.date}</p>
//               <p className="mt-2 text-sm text-slate-600">{ev.desc}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </main>
//   )
// }





// src/pages/Events.jsx
import React, { useEffect, useState } from "react";
import { getAllEvents } from "../services/AllApi";

// fallback data if API fails
const FALLBACK_EVENTS = [
  {
    _id: "e1",
    name: "Freshers Meet",
    description: "Welcome event for new students.",
    date: "2025-12-20",
    img: "https://picsum.p",
  },
  {
    _id: "e2",
    name: "Tech Talk",
    description: "Experts sharing insights on new technologies.",
    date: "2025-12-25",
    img: "https://picsum.photos/seed/event2/900/500",
  },
];

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        const res = await getAllEvents();

        const list = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
          ? res
          : [];

        if (mounted) {
          if (list.length > 0) setEvents(list);
          else setEvents(FALLBACK_EVENTS);
        }
      } catch (error) {
        console.error("Events fetch error:", error);
        if (mounted) {
          setErr("Failed to load events. Showing sample data.");
          setEvents(FALLBACK_EVENTS);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();
    return () => (mounted = false);
  }, []);

  function formatDate(d) {
    if (!d) return "";
    const dt = new Date(d);
    if (isNaN(dt)) return d;
    return dt.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Events</h2>
        {loading && <span className="text-sm text-slate-500">Loading...</span>}
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        {events.map((ev) => (
          <div
            key={ev._id ?? ev.id}
            className="bg-white rounded-2xl shadow overflow-hidden"
          >
            <img
              src={
                ev.img ??
                ev.imgurl ??
                `https://picsum.photos/seed/event-${ev._id}/900/500`
              }
              alt={ev.name ?? ev.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold">{ev.name ?? ev.title}</h3>

              <p className="text-sm text-slate-600">{formatDate(ev.date)}</p>

              <p className="mt-2 text-sm text-slate-600">
                {ev.description ?? ev.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {err && <p className="mt-4 text-sm text-red-600">{err}</p>}
    </main>
  );
}
