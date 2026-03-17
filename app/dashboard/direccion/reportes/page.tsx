"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { BarChart3, TrendingUp, Building2, Award, Download } from "lucide-react"

const indicadores = [
  { indicador: "Publicaciones indexadas", meta: 20, actual: 18, porcentaje: 90 },
  { indicador: "Proyectos con financiamiento", meta: 5, actual: 3, porcentaje: 60 },
  { indicador: "Tesis dirigidas", meta: 15, actual: 10, porcentaje: 67 },
  { indicador: "Estancias de investigacion", meta: 4, actual: 2, porcentaje: 50 },
  { indicador: "Convenios de colaboracion", meta: 8, actual: 6, porcentaje: 75 },
  { indicador: "Participaciones en congresos", meta: 30, actual: 34, porcentaje: 100 },
]

export default function DireccionReportesPage() {
  return (
    <DashboardLayout role="direccion">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#b78c33] block mb-2">Direccion Academica</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#0f0f0f] leading-tight">Reportes Institucionales</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Indicadores de desempeno y metricas de los cuerpos academicos.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[6px] mb-8">
        <StatCard icon={BarChart3} label="Indicadores cumplidos" value="4/6" sub="66.7% de cumplimiento" />
        <StatCard icon={Building2} label="C.A. evaluados" value="6" sub="Todos evaluados" />
        <StatCard icon={TrendingUp} label="Productividad" value="+18%" sub="vs periodo anterior" />
        <StatCard icon={Award} label="Reconocimientos" value="3" sub="PRODEP vigentes" />
      </div>

      {/* Indicators Table */}
      <div className="bg-[#fff] border border-[#e4ddd0] p-6 mb-[6px]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-[14px] h-[14px] text-[#b78c33]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#b78c33]">Indicadores de desempeno</h3>
          </div>
          <button className="inline-flex items-center gap-2 px-3 py-[0.4rem] bg-[#0f0f0f] text-[#fff] rounded-[3px] text-[0.72rem] font-semibold transition-colors duration-300 hover:bg-[#b78c33]">
            <Download className="w-3 h-3" />
            Exportar
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#e4ddd0]">
                <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] pb-3 pr-4">Indicador</th>
                <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] pb-3 pr-4">Meta</th>
                <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] pb-3 pr-4">Actual</th>
                <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] pb-3 pr-4">Avance</th>
                <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] pb-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {indicadores.map((ind, i) => (
                <tr key={i} className="border-b border-[#e4ddd0] last:border-b-0">
                  <td className="py-3 pr-4 text-[0.82rem] font-medium text-[#2e2e2e]">{ind.indicador}</td>
                  <td className="py-3 pr-4 text-[0.78rem] text-[#6b6b6b]">{ind.meta}</td>
                  <td className="py-3 pr-4 text-[0.78rem] text-[#6b6b6b]">{ind.actual}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-[4px] bg-[#f0ece4] rounded-full overflow-hidden">
                        <div className="h-full bg-[#b78c33] rounded-full" style={{ width: `${Math.min(ind.porcentaje, 100)}%` }} />
                      </div>
                      <span className="text-[0.72rem] text-[#6b6b6b]">{ind.porcentaje}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] ${ind.porcentaje >= 80 ? "bg-[#0f0f0f] text-[#fff]" : ind.porcentaje >= 50 ? "bg-[#f5edd8] text-[#b78c33]" : "bg-[#f0ece4] text-[#9a9a9a]"}`}>
                      {ind.porcentaje >= 80 ? "Cumplido" : ind.porcentaje >= 50 ? "En proceso" : "Pendiente"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
