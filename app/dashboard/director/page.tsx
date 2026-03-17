"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { GraduationCap, Building2, Users, BookOpen, ClipboardList, TrendingUp, FileText } from "lucide-react"
import Link from "next/link"

const caDelPrograma = [
  { nombre: "CA·01 - TIC", lider: "MIA. Efren Juarez Castillo", publicaciones: 28, estado: "Activo" },
  { nombre: "CA·02 - Sistemas", lider: "Dr. Carlos Vega Martinez", publicaciones: 22, estado: "Activo" },
]

const evaluaciones = [
  { ca: "CA·01", tipo: "Evaluacion PRODEP", fecha: "Mar 2025", estado: "Pendiente" },
  { ca: "CA·02", tipo: "Informe Anual", fecha: "Feb 2025", estado: "En proceso" },
  { ca: "CA·01", tipo: "Indicadores CONACYT", fecha: "Ene 2025", estado: "Completada" },
  { ca: "CA·02", tipo: "Evaluacion PRODEP", fecha: "Dic 2024", estado: "Completada" },
]

const indicadores = [
  { label: "Articulos publicados", valor: 50, meta: 60 },
  { label: "Proyectos concluidos", valor: 8, meta: 10 },
  { label: "Ponencias presentadas", valor: 15, meta: 12 },
  { label: "Capitulos de libro", valor: 6, meta: 8 },
]

export default function DirectorDashboard() {
  return (
    <DashboardLayout role="director">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Director del programa</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#722F37] leading-tight">Programa Educativo: TIC</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Supervision de cuerpos academicos y evaluaciones del programa.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[6px] mb-8">
        <StatCard icon={Building2} label="C.A. del programa" value="2" sub="Cuerpos academicos activos" />
        <StatCard icon={Users} label="Investigadores" value="4" sub="Personal de tiempo completo" />
        <StatCard icon={BookOpen} label="Produccion total" value="50" sub="Articulos y proyectos" />
        <StatCard icon={TrendingUp} label="Cumplimiento" value="83%" sub="De metas anuales" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[6px] mb-8">
        {/* CA del programa */}
        <div className="bg-[#fff] border border-[#e8e4df] p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Building2 className="w-[14px] h-[14px] text-[#c9a227]" />
              <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Cuerpos academicos del programa</h3>
            </div>
            <Link href="/dashboard/director/cuerpos" className="text-[0.72rem] font-semibold text-[#c9a227] no-underline hover:text-[#722F37] transition-colors duration-300">
              Ver detalle
            </Link>
          </div>
          <div className="flex flex-col">
            {caDelPrograma.map((ca, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#e8e4df] last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#faf5e4] flex items-center justify-center rounded-[3px] shrink-0">
                    <GraduationCap className="w-[14px] h-[14px] text-[#c9a227]" />
                  </div>
                  <div>
                    <p className="text-[0.82rem] font-medium text-[#2e2e2e]">{ca.nombre}</p>
                    <p className="text-[0.7rem] text-[#9a9a9a]">Lider: {ca.lider}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[0.82rem] font-semibold text-[#722F37]">{ca.publicaciones}</p>
                  <p className="text-[0.65rem] text-[#9a9a9a]">publicaciones</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evaluaciones */}
        <div className="bg-[#fff] border border-[#e8e4df] p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-[14px] h-[14px] text-[#c9a227]" />
              <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Evaluaciones</h3>
            </div>
            <Link href="/dashboard/director/evaluaciones" className="text-[0.72rem] font-semibold text-[#c9a227] no-underline hover:text-[#722F37] transition-colors duration-300">
              Ver todas
            </Link>
          </div>
          <div className="flex flex-col">
            {evaluaciones.map((ev, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#e8e4df] last:border-b-0">
                <div>
                  <p className="text-[0.82rem] font-medium text-[#2e2e2e]">{ev.tipo}</p>
                  <p className="text-[0.7rem] text-[#9a9a9a]">{ev.ca} · {ev.fecha}</p>
                </div>
                <span className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] ${
                  ev.estado === "Completada" ? "bg-[#722F37] text-[#fff]" :
                  ev.estado === "Pendiente" ? "bg-[#faf5e4] text-[#c9a227]" :
                  "bg-[#e8e4df] text-[#6b6b6b]"
                }`}>
                  {ev.estado}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Indicadores */}
      <div className="bg-[#fff] border border-[#e8e4df] p-6">
        <div className="flex items-center gap-2 mb-5">
          <FileText className="w-[14px] h-[14px] text-[#c9a227]" />
          <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Indicadores de produccion anual</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {indicadores.map((ind, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[0.78rem] font-medium text-[#2e2e2e]">{ind.label}</p>
                <p className="text-[0.72rem] text-[#9a9a9a]">{ind.valor}/{ind.meta}</p>
              </div>
              <div className="w-full h-[6px] bg-[#f8f6f3] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${(ind.valor / ind.meta) >= 1 ? "bg-[#722F37]" : "bg-[#c9a227]"}`}
                  style={{ width: `${Math.min((ind.valor / ind.meta) * 100, 100)}%` }}
                />
              </div>
              <p className="text-[0.68rem] text-[#9a9a9a] mt-1">{Math.round((ind.valor / ind.meta) * 100)}% de la meta</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
