import React from 'react'
export default function Footer(){
  return (
    <footer className="mt-16 border-t bg-white/70 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold">Raynott College</h3>
          <p className="text-sm text-slate-600">© {new Date().getFullYear()} Raynott College. All rights reserved.</p>
        </div>
        <div className="text-sm text-slate-600">Designed with ❤️ for learning</div>
      </div>
    </footer>
  )
}
