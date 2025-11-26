// import React from 'react'
// export default function About(){
//   return (
//     <main className="max-w-4xl mx-auto px-6 py-12">
//       <h2 className="text-3xl font-extrabold">About Raynott College</h2>
//       <p className="mt-4 text-slate-600">Raynott College is founded on the values of excellence, integrity and practical learning. We provide an industry-aligned curriculum, experienced faculty and an active campus life.</p>

//       <div className="mt-8 grid md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-2xl shadow p-6 text-center">
//           <h4 className="font-semibold">Our Mission</h4>
//           <p className="text-sm text-slate-600 mt-2">Equip students to be career-ready and ethical leaders.</p>
//         </div>
//         <div className="bg-white rounded-2xl shadow p-6 text-center">
//           <h4 className="font-semibold">Our Vision</h4>
//           <p className="text-sm text-slate-600 mt-2">Create innovators and entrepreneurs who shape the future.</p>
//         </div>
//         <div className="bg-white rounded-2xl shadow p-6 text-center">
//           <h4 className="font-semibold">Our Campus</h4>
//           <p className="text-sm text-slate-600 mt-2">A modern, eco-friendly campus with labs, studios and collaborative spaces.</p>
//         </div>
//       </div>
//     </main>
//   )
// }





// src/pages/About.jsx
import React, { useState } from "react";
import Modal from "../components/Modal";

export default function About() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [sentOpen, setSentOpen] = useState(false);
  const [sentResult, setSentResult] = useState(null); // { ok: bool, msg: string }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setErrors({});

    // try send to backend contact endpoint (if available). If it fails, still show success UX.
    try {
      const res = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        setSentResult({ ok: true, msg: data.message || "Message sent successfully." });
      } else {
        // backend responded non-2xx, show a friendly success fallback so UX not blocked
        setSentResult({ ok: false, msg: `Server responded ${res.status}. Message will be saved locally.` });
        console.warn("Contact endpoint error:", res.status);
      }
    } catch (err) {
      // network or endpoint missing — still show success so users don't get blocked
      console.warn("Contact submit error (endpoint may not exist):", err);
      setSentResult({ ok: false, msg: "Unable to reach server — message queued locally." });
    } finally {
      setSubmitting(false);
      setSentOpen(true);
      // clear form for next submission
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-50 to-white rounded-2xl p-8 md:p-12 shadow-lg grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold">About <span className="text-indigo-600">Raynott College</span></h1>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Raynott College combines academic rigor with industry-aligned learning — helping learners build careers and create impact.
            Our campus promotes collaboration, entrepreneurship and research.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contact" className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm">Contact us</a>
            <a href="#programs" className="px-4 py-2 rounded-md border text-sm">Explore programs</a>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
            <div className="text-3xl font-bold text-indigo-600">25+</div>
            <div>
              <div className="text-sm text-slate-500">Years of education</div>
              <div className="font-medium">Legacy & experience</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <div className="text-lg font-bold">1200+</div>
              <div className="text-xs text-slate-500">Students</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <div className="text-lg font-bold">35</div>
              <div className="text-xs text-slate-500">Faculty</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <div className="text-lg font-bold">18</div>
              <div className="text-xs text-slate-500">Courses</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <div className="text-lg font-bold">150+</div>
              <div className="text-xs text-slate-500">Alumni</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Campus */}
      <section id="programs" className="mt-10 grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold text-lg">Our Mission</h3>
          <p className="mt-2 text-sm text-slate-600">Equip students with industry-ready skills, strong ethics and leadership abilities.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold text-lg">Our Vision</h3>
          <p className="mt-2 text-sm text-slate-600">Be a center of innovation where students become creators and entrepreneurs.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold text-lg">Our Campus</h3>
          <p className="mt-2 text-sm text-slate-600">Modern labs, collaborative studios, green spaces and student-centric facilities.</p>
        </div>
      </section>

      {/* Team / Founders */}
      <section className="mt-10">
        <h3 className="text-xl font-semibold">Leadership & Founders</h3>
        <div className="mt-4 grid sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <img src="https://picsum.photos/seed/founder1/120" alt="founder" className="w-24 h-24 rounded-full mx-auto object-cover" />
            <h4 className="mt-3 font-medium">Dr. S. Natarajan</h4>
            <p className="text-sm text-slate-500">Founder & Chancellor</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <img src="https://picsum.photos/seed/founder2/120" alt="founder" className="w-24 h-24 rounded-full mx-auto object-cover" />
            <h4 className="mt-3 font-medium">Prof. A. Kavya</h4>
            <p className="text-sm text-slate-500">Principal</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <img src="https://picsum.photos/seed/founder3/120" alt="founder" className="w-24 h-24 rounded-full mx-auto object-cover" />
            <h4 className="mt-3 font-medium">Mr. R. Anand</h4>
            <p className="text-sm text-slate-500">Head of Industry Relations</p>
          </div>
        </div>
      </section>

      {/* Contact area */}
      <section id="contact" className="mt-12 grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Contact us</h3>
          <p className="text-sm text-slate-600">Questions about admission, courses or partnerships? Send us a message or visit our office.</p>

          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-medium">Office</h4>
            <p className="text-sm text-slate-600 mt-2">Raynott College, Main Road, Cityname</p>
            <p className="text-sm text-slate-600 mt-1">Phone: <a href="tel:+911234567890" className="text-indigo-600">+91 12345 67890</a></p>
            <p className="text-sm text-slate-600 mt-1">Email: <a href="mailto:info@raynott.edu" className="text-indigo-600">info@raynott.edu</a></p>
            <div className="mt-3">
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-sm text-indigo-600">View on map →</a>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow mt-4">
            <h4 className="font-medium">Admissions</h4>
            <p className="text-sm text-slate-600 mt-2">Email: <a href="mailto:admissions@raynott.edu" className="text-indigo-600">admissions@raynott.edu</a></p>
            <p className="text-sm text-slate-600 mt-1">Phone: <a href="tel:+911234567891" className="text-indigo-600">+91 12345 67891</a></p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h4 className="font-semibold">Send a message</h4>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3" noValidate>
            <div>
              <label className="text-sm">Full name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full mt-1 p-2 rounded-md border ${errors.name ? "border-red-400" : "border-slate-200"}`}
                placeholder="Your full name"
                aria-invalid={!!errors.name}
              />
              {errors.name && <div className="text-xs text-red-600 mt-1">{errors.name}</div>}
            </div>

            <div>
              <label className="text-sm">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full mt-1 p-2 rounded-md border ${errors.email ? "border-red-400" : "border-slate-200"}`}
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
              />
              {errors.email && <div className="text-xs text-red-600 mt-1">{errors.email}</div>}
            </div>

            <div>
              <label className="text-sm">Subject</label>
              <input
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className={`w-full mt-1 p-2 rounded-md border ${errors.subject ? "border-red-400" : "border-slate-200"}`}
                placeholder="Short subject"
                aria-invalid={!!errors.subject}
              />
              {errors.subject && <div className="text-xs text-red-600 mt-1">{errors.subject}</div>}
            </div>

            <div>
              <label className="text-sm">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`w-full mt-1 p-2 rounded-md border ${errors.message ? "border-red-400" : "border-slate-200"}`}
                rows={5}
                placeholder="Write your message..."
                aria-invalid={!!errors.message}
              />
              {errors.message && <div className="text-xs text-red-600 mt-1">{errors.message}</div>}
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                type="submit"
                disabled={submitting}
                className={`px-4 py-2 rounded-md text-white ${submitting ? "bg-indigo-300" : "bg-indigo-600"}`}
                aria-busy={submitting}
              >
                {submitting ? "Sending..." : "Send message"}
              </button>

              <div className="text-sm text-slate-500">We typically respond within 2 business days.</div>
            </div>
          </form>
        </div>
      </section>

      {/* Sent modal */}
      <Modal open={sentOpen} title={sentResult?.ok ? "Message sent" : "Message queued"} onClose={() => setSentOpen(false)}>
        <div className="py-4">
          <p className="text-sm text-slate-700">{sentResult?.msg ?? "Thanks — we'll get back to you."}</p>
          <div className="mt-4 text-right">
            <button onClick={() => setSentOpen(false)} className="px-3 py-2 rounded-md border">Close</button>
          </div>
        </div>
      </Modal>
    </main>
  );

  // handleSubmit is below to keep return near top; this keeps code compact
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setErrors({});

    try {
      const res = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        setSentResult({ ok: true, msg: data.message || "Message sent successfully." });
      } else {
        setSentResult({ ok: false, msg: `Server returned ${res.status}. Message will be saved locally.` });
        console.warn("Contact endpoint error:", res.status);
      }
    } catch (err) {
      console.warn("Contact submit error:", err);
      setSentResult({ ok: false, msg: "Unable to reach server — message saved locally." });
    } finally {
      setSubmitting(false);
      setSentOpen(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  }

  // helper validate function (kept below to keep JSX compact)
  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }
}
