"use client"

import { DashboardSidebar } from "./dashboard-sidebar"

export function DashboardLayout({ role, children }: { role: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#fdfcfa]">
      <DashboardSidebar role={role} />
      <div className="flex-1 overflow-x-hidden">
        {/* Top bar */}
        <header className="h-[56px] bg-[#fff] border-b border-[#e8e4df] flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <div className="w-[6px] h-[6px] rounded-full bg-[#c9a227]" />
            <span className="text-[0.72rem] tracking-[0.12em] uppercase text-[#9a9a9a] font-semibold">Panel de control</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[0.78rem] text-[#6b6b6b]">{new Date().toLocaleDateString("es-MX", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
          </div>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
