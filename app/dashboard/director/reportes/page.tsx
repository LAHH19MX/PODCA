"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { BarChart3, FileText, Download, Building2, BookOpen, Users, TrendingUp } from "lucide-react"

const reportes = [
  { titulo: "Produccion academica anual 2024", tipo: "Anual", fecha: "Ene 2025", estado: "Generado" },
  { titulo: "Indicadores PRODEP - CA-7", tipo: "Evaluacion", fecha: "Dic 2024", estado: "Generado" },
  { titulo: "Indicadores PRODEP - CA-2", tipo: "Evaluacion", fecha: "Dic 2024", estado: "Generado" },
  { titulo: "Informe semestral Jul-Dic 2024", tipo: "Semestral", fecha: "Nov 2024", estado: "Generado" },
  { titulo: "Reporte de proyectos de investigacion", tipo: "Proyectos", fecha: "Oct 2024", estado: "Generado" },
]

const indicadores = [
  { label: "Articulos publicados", valor: 50, meta: 60 },
  { label: "Proyectos concluidos", valor: 8, meta: 10 },
  { label: "Ponencias presentadas", valor: 15, meta: 12 },
  { label: "Capitulos de libro", valor: 6, meta: 8 },
]

export default function DirectorReportesPage() {
  return (
    <DashboardLayout role="director">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#b78c33] block mb-2">Director del programa</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#0f0f0f] leading-tight">Reportes</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Generacion y consulta de reportes de produccion academica.</p>
      </div>

      {/* Indicadores */}
      <div className="bg-[#fff] border border-[#e4ddd0] p-6 mb-8">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-[14px] h-[14px] text-[#b78c33]" />
          <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#b78c33]">Indicadores de produccion anual</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {indicadores.map((ind, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[0.78rem] font-medium text-[#2e2e2e]">{ind.label}</p>
                <p className="text-[0.72rem] text-[#9a9a9a]">{ind.valor}/{ind.meta}</p>
              </div>
              <div className="w-full h-[6px] bg-[#f0ece4] rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${(ind.valor / ind.meta) >= 1 ? "bg-[#0f0f0f]" : "bg-[#b78c33]"}`} style={{ width: `${Math.min((ind.valor / ind.meta) * 100, 100)}%` }} />
              </div>
              <p className="text-[0.68rem] text-[#9a9a9a] mt-1">{Math.round((ind.valor / ind.meta) * 100)}% de la meta</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reportes Table */}
      <div className="bg-[#fff] border border-[#e4ddd0] overflow-x-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e4ddd0]">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-[14px] h-[14px] text-[#b78c33]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#b78c33]">Reportes generados</h3>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-[0.4rem] bg-[#0f0f0f] text-[#fff] rounded-[3px] text-[0.72rem] font-semibold transition-colors duration-300 hover:bg-[#b78c33]">
            <FileText className="w-3 h-3" />
            Generar reporte
          </button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#e4ddd0]">
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Titulo</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Tipo</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Fecha</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((rep, i) => (
              <tr key={i} className="border-b border-[#e4ddd0] last:border-b-0 hover:bg-[#f7f4ee] transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#f5edd8] flex items-center justify-center shrink-0 rounded-[3px]"><FileText className="w-[12px] h-[12px] text-[#b78c33]" /></div>
                    <span className="text-[0.82rem] font-medium text-[#2e2e2e]">{rep.titulo}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[0.78rem] text-[#6b6b6b]">{rep.tipo}</td>
                <td className="px-6 py-4 text-[0.78rem] text-[#9a9a9a]">{rep.fecha}</td>
                <td className="px-6 py-4">
                  <button className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-[#b78c33] hover:text-[#0f0f0f] transition-colors">
                    <Download className="w-3.5 h-3.5" />
                    Descargar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
