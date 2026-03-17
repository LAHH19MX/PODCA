"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { ClipboardList, Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react"

const evaluaciones = [
  { ca: "UTHH-CA-7", tipo: "Evaluacion PRODEP", fecha: "Mar 2025", estado: "Pendiente", descripcion: "Evaluacion programada del grado de consolidacion." },
  { ca: "UTHH-CA-2", tipo: "Informe Anual", fecha: "Feb 2025", estado: "En proceso", descripcion: "Informe de produccion academica anual." },
  { ca: "UTHH-CA-7", tipo: "Indicadores CONACYT", fecha: "Ene 2025", estado: "Completada", descripcion: "Reporte de indicadores de productividad cientifica." },
  { ca: "UTHH-CA-2", tipo: "Evaluacion PRODEP", fecha: "Dic 2024", estado: "Completada", descripcion: "Evaluacion periodica del perfil deseable PRODEP." },
  { ca: "UTHH-CA-7", tipo: "Informe Semestral", fecha: "Nov 2024", estado: "Completada", descripcion: "Informe Jul - Dic 2024 de actividades del C.A." },
  { ca: "UTHH-CA-2", tipo: "Indicadores CONACYT", fecha: "Oct 2024", estado: "Completada", descripcion: "Reporte de indicadores segundo semestre." },
]

const estadoConfig: Record<string, { color: string; icon: React.ElementType }> = {
  "Pendiente": { color: "bg-[#f5edd8] text-[#b78c33]", icon: AlertCircle },
  "En proceso": { color: "bg-[#e4ddd0] text-[#6b6b6b]", icon: Clock },
  "Completada": { color: "bg-[#0f0f0f] text-[#fff]", icon: CheckCircle2 },
}

export default function DirectorEvaluacionesPage() {
  return (
    <DashboardLayout role="director">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#b78c33] block mb-2">Director del programa</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#0f0f0f] leading-tight">Evaluaciones</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Seguimiento de evaluaciones PRODEP, CONACYT e informes de los C.A.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[6px] mb-8">
        <div className="bg-[#fff] border border-[#e4ddd0] p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-[#f5edd8] flex items-center justify-center rounded-[3px]"><AlertCircle className="w-[16px] h-[16px] text-[#b78c33]" /></div>
          <div><p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a]">Pendientes</p><p className="font-serif text-[1.4rem] font-bold text-[#0f0f0f]">1</p></div>
        </div>
        <div className="bg-[#fff] border border-[#e4ddd0] p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-[#f5edd8] flex items-center justify-center rounded-[3px]"><Clock className="w-[16px] h-[16px] text-[#b78c33]" /></div>
          <div><p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a]">En proceso</p><p className="font-serif text-[1.4rem] font-bold text-[#0f0f0f]">1</p></div>
        </div>
        <div className="bg-[#fff] border border-[#e4ddd0] p-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-[#f5edd8] flex items-center justify-center rounded-[3px]"><CheckCircle2 className="w-[16px] h-[16px] text-[#b78c33]" /></div>
          <div><p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a]">Completadas</p><p className="font-serif text-[1.4rem] font-bold text-[#0f0f0f]">4</p></div>
        </div>
      </div>

      {/* Evaluaciones List */}
      <div className="bg-[#fff] border border-[#e4ddd0] overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#e4ddd0]">
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Cuerpo Academico</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Tipo</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Descripcion</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Fecha</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {evaluaciones.map((ev, i) => (
              <tr key={i} className="border-b border-[#e4ddd0] last:border-b-0 hover:bg-[#f7f4ee] transition-colors duration-200">
                <td className="px-6 py-4 text-[0.82rem] font-medium text-[#2e2e2e]">{ev.ca}</td>
                <td className="px-6 py-4 text-[0.78rem] text-[#6b6b6b]">{ev.tipo}</td>
                <td className="px-6 py-4 text-[0.78rem] text-[#6b6b6b]">{ev.descripcion}</td>
                <td className="px-6 py-4 text-[0.78rem] text-[#9a9a9a]">{ev.fecha}</td>
                <td className="px-6 py-4">
                  <span className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] ${estadoConfig[ev.estado]?.color}`}>{ev.estado}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
