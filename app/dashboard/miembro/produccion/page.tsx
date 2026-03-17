"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Upload, Plus, FileText, Calendar } from "lucide-react"

const produccion = [
  { titulo: "Portal Digital de Cuerpos Academicos", tipo: "Memoria de residencia", fecha: "08 ene 2025", estado: "En revision", descripcion: "Sistema web para la gestion y visualizacion de cuerpos academicos." },
  { titulo: "Trajes Representativos de la Huasteca Hidalguense", tipo: "Libro", fecha: "15 nov 2024", estado: "Publicado", descripcion: "Software multimedia sobre trajes tipicos de 8 municipios de la Huasteca." },
  { titulo: "Software Multimedia: Dilo Con Senas", tipo: "Proyecto de investigacion", fecha: "01 sep 2024", estado: "Publicado", descripcion: "Aplicacion movil para el aprendizaje del lenguaje de senas mexicano." },
]

export default function MiembroProduccionPage() {
  return (
    <DashboardLayout role="miembro">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Miembro C.A.</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#691B31] leading-tight">Mi Produccion Academica</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Registra y gestiona tu produccion academica.</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-[0.82rem] text-[#6b6b6b]">{produccion.length} registros</p>
        <button className="inline-flex items-center gap-2 px-4 py-[0.5rem] bg-[#691B31] text-[#fff] rounded-[3px] text-[0.78rem] font-semibold transition-colors duration-300 hover:bg-[#b78c33]">
          <Plus className="w-3.5 h-3.5" />
          Subir produccion
        </button>
      </div>

      <div className="flex flex-col gap-[6px]">
        {produccion.map((item, i) => (
          <div key={i} className="bg-[#fff] border border-[#e4ddd0] p-6 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300">
            <div className="flex items-start justify-between mb-2 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#faf5e4] flex items-center justify-center rounded-[3px] shrink-0">
                  <FileText className="w-[16px] h-[16px] text-[#c9a227]" />
                </div>
                <div>
                  <h3 className="font-serif text-[1rem] font-semibold text-[#691B31]">{item.titulo}</h3>
                  <p className="text-[0.75rem] text-[#9a9a9a] mt-0.5">{item.tipo}</p>
                </div>
              </div>
              <span className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] shrink-0 ${item.estado === "Publicado" ? "bg-[#691B31] text-[#fff]" : "bg-[#faf5e4] text-[#c9a227]"}`}>
                {item.estado}
              </span>
            </div>
            <p className="text-[0.82rem] text-[#6b6b6b] leading-[1.6] mb-3 ml-[52px]">{item.descripcion}</p>
            <div className="flex items-center gap-1.5 ml-[52px]">
              <Calendar className="w-3 h-3 text-[#9a9a9a]" />
              <span className="text-[0.75rem] text-[#9a9a9a]">{item.fecha}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
