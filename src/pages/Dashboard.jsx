






// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardTopbar from "../components/DashboardTopbar";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";

import {
  getAllCourses, addCourse, editCourse, deleteCourse,
  getAllEvents, addEvent, editEvent, deleteEvent,
  getAllFaculty, addFaculty, editFaculty, deleteFaculty
} from "../services/AllApi";

export default function Dashboard() {
  const [active, setActive] = useState("overview"); // overview | courses | events | faculty
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // add | edit
  const [modalType, setModalType] = useState("course"); // course | event | faculty
  const [modalData, setModalData] = useState({}); // editing object

  // confirm dialog
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { type, item }

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    try {
      const [cRes, eRes, fRes] = await Promise.allSettled([getAllCourses(), getAllEvents(), getAllFaculty()]);
      setCourses(cRes.status === "fulfilled" ? (cRes.value?.data ?? cRes.value ?? []) : []);
      setEvents(eRes.status === "fulfilled" ? (eRes.value?.data ?? eRes.value ?? []) : []);
      setFaculties(fRes.status === "fulfilled" ? (fRes.value?.data ?? fRes.value ?? []) : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const stats = [
    { id: "st1", title: "Courses", value: courses.length },
    { id: "st2", title: "Events", value: events.length },
    { id: "st3", title: "Faculty", value: faculties.length },
  ];

  // Open add / edit / delete flows
  function openAdd(type) {
    setModalType(type);
    setModalMode("add");
    setModalData({});
    setModalOpen(true);
  }

  function openEdit(type, item) {
    setModalType(type);
    setModalMode("edit");
    setModalData(item);
    setModalOpen(true);
  }

  function openDelete(type, item) {
    setDeleteTarget({ type, item });
    setConfirmOpen(true);
  }

  // Submit handlers for add/edit
  async function handleModalSubmit(payload) {
    try {
      if (modalMode === "add") {
        if (modalType === "course") {
          await addCourse(payload); // expects: { title, description, duration, imgurl }
        }
        if (modalType === "event") {
          // backend expects: { name, description, date }
          const eventPayload = mapEventPayload(payload);
          await addEvent(eventPayload);
        }
        if (modalType === "faculty") {
          // backend expects: { name, department, imgURl }
          const facultyPayload = mapFacultyPayload(payload);
          await addFaculty(facultyPayload);
        }
      } else {
        const id = modalData._id ?? modalData.id;
        if (modalType === "course") await editCourse(id, payload);
        if (modalType === "event") {
          const eventPayload = mapEventPayload(payload);
          await editEvent(id, eventPayload);
        }
        if (modalType === "faculty") {
          const facultyPayload = mapFacultyPayload(payload);
          await editFaculty(id, facultyPayload);
        }
      }

      setModalOpen(false);
      await fetchAll();
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving. See console for details.");
    }
  }

  function mapEventPayload(payload) {
    // payload (from form) may be { name, description, date } or legacy { title, desc, date }
    return {
      name: payload.name ?? payload.title ?? "",
      description: payload.description ?? payload.desc ?? "",
      // ensure date is an ISO string or Date accepted by backend
      date: payload.date ? new Date(payload.date).toISOString() : null,
    };
  }

  function mapFacultyPayload(payload) {
    // map faculty frontend fields to backend schema keys
    return {
      name: payload.name ?? "",
      department: payload.department ?? payload.dept ?? "",
      imgURl: payload.imgURl ?? payload.img ?? "",
    };
  }

  // Delete confirmed
  async function handleDeleteConfirmed() {
    if (!deleteTarget) return;
    const { type, item } = deleteTarget;
    const id = item._id ?? item.id;
    try {
      if (type === "course") await deleteCourse(id);
      if (type === "event") await deleteEvent(id);
      if (type === "faculty") await deleteFaculty(id);
      setConfirmOpen(false);
      setDeleteTarget(null);
      await fetchAll();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting. See console for details.");
    }
  }

  // Columns matching backend fields exactly
  const courseCols = [
    { key: "title", label: "Title" },
    { key: "duration", label: "Duration" },
    { key: "description", label: "Description" },
  ];
  const eventCols = [
    { key: "name", label: "Name" },
    { key: "date", label: "Date" },
    { key: "description", label: "Description" },
  ];
  const facultyCols = [
    { key: "name", label: "Name" },
    { key: "department", label: "Department" },
    { key: "imgURl", label: "Image URL" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <DashboardSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onNav={(k) => setActive(k)}
          active={active}
        />

        <div className="flex-1 flex flex-col">
          <DashboardTopbar onMenu={() => setSidebarOpen((s) => !s)} />

          <main className="p-6 max-w-7xl mx-auto w-full">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-extrabold">Dashboard</h1>
                <p className="text-sm text-slate-600">Overview and management for Raynott College.</p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => openAdd("course")} className="px-3 py-2 rounded-md border">Add Course</button>
                <button onClick={() => openAdd("event")} className="px-3 py-2 rounded-md border">Add Event</button>
                <button onClick={() => openAdd("faculty")} className="px-3 py-2 rounded-md border">Add Faculty</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {stats.map((s) => (
                <StatCard key={s.id} title={s.title} value={s.value} />
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow p-4">
              {active === "overview" && (
                <>
                  <h2 className="text-lg font-semibold mb-4">Recent Items</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium">Recent Courses</h3>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        {courses.slice(0, 5).map((c) => (
                          <li key={c._id ?? c.id}>{c.title ?? c.name ?? "-"}</li>
                        ))}
                        {courses.length === 0 && <li className="text-slate-400">No courses</li>}
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium">Upcoming Events</h3>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        {events.slice(0, 5).map((e) => (
                          <li key={e._id ?? e.id}>{e.name ?? e.title ?? "-" } {e.date ? <span className="text-xs text-slate-400">({formatDate(e.date)})</span> : null}</li>
                        ))}
                        {events.length === 0 && <li className="text-slate-400">No events</li>}
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium">Faculty Spotlight</h3>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        {faculties.slice(0, 5).map((f) => (
                          <li key={f._id ?? f.id}>{f.name ?? "-"}</li>
                        ))}
                        {faculties.length === 0 && <li className="text-slate-400">No faculty</li>}
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {active === "courses" && (
                <DataTable
                  title="Courses"
                  columns={courseCols}
                  rows={courses}
                  onEdit={(r) => openEdit("course", r)}
                  onDelete={(r) => openDelete("course", r)}
                />
              )}

              {active === "events" && (
                <DataTable
                  title="Events"
                  columns={eventCols}
                  rows={events}
                  onEdit={(r) => openEdit("event", r)}
                  onDelete={(r) => openDelete("event", r)}
                />
              )}

              {active === "faculty" && (
                <DataTable
                  title="Faculty"
                  columns={facultyCols}
                  rows={faculties}
                  onEdit={(r) => openEdit("faculty", r)}
                  onDelete={(r) => openDelete("faculty", r)}
                />
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} title={modalMode === "add" ? `Add ${capitalize(modalType)}` : `Edit ${capitalize(modalType)}`} onClose={() => setModalOpen(false)}>
        <EntityForm
          type={modalType}
          initial={modalMode === "edit" ? modalData : {}}
          onCancel={() => setModalOpen(false)}
          onSave={handleModalSubmit}
        />
      </Modal>

      {/* Confirm delete */}
      <ConfirmDialog
        open={confirmOpen}
        title="Confirm delete"
        message={`Are you sure you want to delete this ${deleteTarget?.type ?? ""}?`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDeleteConfirmed}
      />
    </div>
  );
}

/* ----------------------
   Helper components & functions
   ---------------------- */

function capitalize(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatDate(d) {
  if (!d) return "";
  const dt = new Date(d);
  if (isNaN(dt)) return "";
  return dt.toLocaleDateString();
}

/* ----------------------
   Inline small form component (EntityForm)
   Matches your backend models exactly:
    - Event => { name, description, date }
    - Faculty => { name, department, imgURl }
    - Course => { title, description, duration, imgurl }
   ---------------------- */
function EntityForm({ type, initial = {}, onCancel = () => {}, onSave = () => {} }) {
  const [form, setForm] = useState(() => {
    if (type === "course") {
      return {
        title: initial.title || "",
        description: initial.description || "",
        duration: initial.duration || "",
        imgurl: initial.imgurl || ""
      };
    }

    if (type === "event") {
      return {
        name: initial.name || "",
        description: initial.description || "",
        date: initial.date ? formatForInput(initial.date) : ""
      };
    }

    if (type === "faculty") {
      return {
        name: initial.name || "",
        department: initial.department || "",
        imgURl: initial.imgURl || ""
      };
    }

    return {};
  });

  function formatForInput(d) {
    if (!d) return "";
    const dt = new Date(d);
    if (isNaN(dt)) return "";
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const dd = String(dt.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  function change(k, v) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // For events, keep date as YYYY-MM-DD string (we map before sending)
        onSave(form);
      }}
      className="space-y-3"
    >
      {/* COURSE */}
      {type === "course" && (
        <>
          <label className="block text-sm">Title</label>
          <input className="w-full border rounded-md px-3 py-2" value={form.title} onChange={(e) => change("title", e.target.value)} required />

          <label className="block text-sm">Duration</label>
          <input className="w-full border rounded-md px-3 py-2" value={form.duration} onChange={(e) => change("duration", e.target.value)} required />

          <label className="block text-sm">Description</label>
          <textarea className="w-full border rounded-md px-3 py-2" value={form.description} onChange={(e) => change("description", e.target.value)} required />

          <label className="block text-sm">Image URL</label>
          <input className="w-full border rounded-md px-3 py-2" value={form.imgurl} onChange={(e) => change("imgurl", e.target.value)} />
        </>
      )}

      {/* EVENT */}
      {type === "event" && (
        <>
          <label className="block text-sm">Event Name</label>
          <input className="w-full border rounded-md px-3 py-2" value={form.name} onChange={(e) => change("name", e.target.value)} required />

          <label className="block text-sm">Description</label>
          <textarea className="w-full border rounded-md px-3 py-2" value={form.description} onChange={(e) => change("description", e.target.value)} required />

          <label className="block text-sm">Date</label>
          <input type="date" className="w-full border rounded-md px-3 py-2" value={form.date} onChange={(e) => change("date", e.target.value)} required />
        </>
      )}

      {/* FACULTY */}
      {type === "faculty" && (
        <>
          <label className="block text-sm">Name</label>
          <input className="w-full border rounded-md px-3 py-2" value={form.name} onChange={(e) => change("name", e.target.value)} required />

          <label className="block text-sm">Department</label>
          <input className="w-full border rounded-md px-3 py-2" value={form.department} onChange={(e) => change("department", e.target.value)} required />

          <label className="block text-sm">Image URL</label>
          <input className="w-full border rounded-md px-3 py-2" value={form.imgURl} onChange={(e) => change("imgURl", e.target.value)} />
        </>
      )}

      <div className="flex justify-end gap-3 pt-3">
        <button type="button" onClick={onCancel} className="px-3 py-2 rounded-md border">Cancel</button>
        <button type="submit" className="px-3 py-2 rounded-md bg-indigo-600 text-white">Save</button>
      </div>
    </form>
  );
}
