"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { BarChart3, Download, Users, BookOpen, Building2, TrendingUp } from "lucide-react"

const reportesMensuales = [
  { mes: "Enero", usuarios: 48, publicaciones: 12, cuerpos: 7 },
  { mes: "Febrero", usuarios: 50, publicaciones: 8, cuerpos: 7 },
  { mes: "Marzo", usuarios: 52, publicaciones: 15, cuerpos: 7 },
  { mes: "Abril", usuarios: 55, publicaciones: 10, cuerpos: 7 },
  { mes: "Mayo", usuarios: 58, publicaciones: 14, cuerpos: 7 },
  { mes: "Junio", usuarios: 60, publicaciones: 11, cuerpos: 7 },
]

const reportesDisponibles = [
  { titulo: "Reporte General de Produccion Academica", descripcion: "Resumen de publicaciones, proyectos y actividades por C.A.", formato: "PDF" },
  { titulo: "Listado de Integrantes por C.A.", descripcion: "Directorio completo de miembros activos de cada cuerpo academico.", formato: "Excel" },
  { titulo: "Indicadores PRODEP", descripcion: "Metricas de cumplimiento de indicadores de PRODEP por periodo.", formato: "PDF" },
  { titulo: "Estadisticas de Publicaciones", descripcion: "Desglose de publicaciones por tipo, fecha y cuerpo academico.", formato: "Excel" },
]

export default function AdminReportesPage() {
  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Administracion</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#722F37] leading-tight">Reportes y Estadisticas</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Genera y consulta reportes del sistema.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[6px] mb-8">
        <StatCard icon={Users} label="Usuarios activos" value="60" sub="+12 este semestre" />
        <StatCard icon={BookOpen} label="Publicaciones totales" value="124" sub="+70 vs semestre anterior" />
        <StatCard icon={Building2} label="C.A. registrados" value="7" sub="2 en consolidacion" />
        <StatCard icon={TrendingUp} label="Tasa de crecimiento" value="18%" sub="Publicaciones mensuales" />
      </div>

      {/* Monthly Table */}
      <div className="bg-[#fff] border border-[#e8e4df] p-6 mb-[6px]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-[14px] h-[14px] text-[#c9a227]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Resumen mensual</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#e8e4df]">
                <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] pb-3 pr-4">Mes</th>
                <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] pb-3 pr-4">Usuarios</th>
                <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] pb-3 pr-4">Publicaciones</th>
                <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] pb-3">C.A.</th>
              </tr>
            </thead>
            <tbody>
              {reportesMensuales.map((r) => (
                <tr key={r.mes} className="border-b border-[#e8e4df] last:border-b-0">
                  <td className="py-3 pr-4 text-[0.82rem] font-medium text-[#2e2e2e]">{r.mes}</td>
                  <td className="py-3 pr-4 text-[0.78rem] text-[#6b6b6b]">{r.usuarios}</td>
                  <td className="py-3 pr-4 text-[0.78rem] text-[#6b6b6b]">{r.publicaciones}</td>
                  <td className="py-3 text-[0.78rem] text-[#6b6b6b]">{r.cuerpos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Available Reports */}
      <div className="bg-[#fff] border border-[#e8e4df] p-6">
        <div className="flex items-center gap-2 mb-5">
          <Download className="w-[14px] h-[14px] text-[#c9a227]" />
          <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Reportes disponibles</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[6px]">
          {reportesDisponibles.map((reporte, i) => (
            <div key={i} className="border border-[#e8e4df] p-5 flex items-start justify-between gap-4 hover:border-[#c9a227] transition-colors duration-300">
              <div>
                <h4 className="text-[0.85rem] font-semibold text-[#2e2e2e] mb-1">{reporte.titulo}</h4>
                <p className="text-[0.78rem] text-[#6b6b6b]">{reporte.descripcion}</p>
              </div>
              <button className="shrink-0 flex items-center gap-2 px-3 py-[0.4rem] bg-[#722F37] text-[#fff] rounded-[3px] text-[0.72rem] font-semibold transition-colors duration-300 hover:bg-[#c9a227]">
                <Download className="w-3 h-3" />
                {reporte.formato}
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
