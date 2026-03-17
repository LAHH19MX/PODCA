"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { FolderOpen, Plus, Users, Calendar, ArrowRight } from "lucide-react"

const proyectos = [
  {
    nombre: "Generador de Horarios mediante Algoritmos Evolutivos",
    descripcion: "Desarrollo de un sistema inteligente para la generacion automatica de horarios escolares utilizando algoritmos geneticos y evolutivos.",
    estado: "En progreso",
    avance: 75,
    fechaInicio: "Ene 2024",
    fechaFin: "Jun 2025",
    participantes: ["E. Juarez", "J. Mendoza"],
  },
  {
    nombre: "Portal Digital de Cuerpos Academicos de la UTHH",
    descripcion: "Implementacion de un sistema web para el control y visualizacion de la produccion academica de los cuerpos academicos.",
    estado: "En progreso",
    avance: 60,
    fechaInicio: "Mar 2024",
    fechaFin: "Ago 2025",
    participantes: ["J. Mendoza", "E. Juarez"],
  },
  {
    nombre: "Publicacion del libro: Trajes Representativos de la Huasteca Hidalguense",
    descripcion: "Software multimedia sobre los trajes tipicos de la Huasteca Hidalguense, que incluye 8 municipios de la region.",
    estado: "Completado",
    avance: 100,
    fechaInicio: "Sep 2023",
    fechaFin: "Dic 2024",
    participantes: ["J. Mendoza", "S. San Vicente"],
  },
]

export default function LiderProyectosPage() {
  return (
    <DashboardLayout role="lider">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">UTHH-CA-7</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#691B31] leading-tight">Proyectos</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Gestiona los proyectos de investigacion del cuerpo academico.</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-[0.82rem] text-[#6b6b6b]">{proyectos.length} proyectos registrados</p>
        <button className="inline-flex items-center gap-2 px-4 py-[0.5rem] bg-[#691B31] text-[#fff] rounded-[3px] text-[0.78rem] font-semibold transition-colors duration-300 hover:bg-[#b78c33]">
          <Plus className="w-3.5 h-3.5" />
          Nuevo proyecto
        </button>
      </div>

      <div className="flex flex-col gap-[6px]">
        {proyectos.map((proyecto, i) => (
          <div key={i} className="bg-[#fff] border border-[#e4ddd0] p-6 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300">
            <div className="flex items-start justify-between mb-3 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#faf5e4] flex items-center justify-center rounded-[3px] shrink-0">
                  <FolderOpen className="w-[16px] h-[16px] text-[#c9a227]" />
                </div>
                <div>
                  <h3 className="font-serif text-[1rem] font-semibold text-[#691B31]">{proyecto.nombre}</h3>
                  <p className="text-[0.75rem] text-[#9a9a9a] mt-0.5">{proyecto.descripcion}</p>
                </div>
              </div>
              <span className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] shrink-0 ${proyecto.avance === 100 ? "bg-[#691B31] text-[#fff]" : "bg-[#faf5e4] text-[#c9a227]"}`}>
                {proyecto.estado}
              </span>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[0.72rem] text-[#6b6b6b]">Avance</span>
                <span className="text-[0.72rem] font-semibold text-[#2e2e2e]">{proyecto.avance}%</span>
              </div>
              <div className="w-full h-[5px] bg-[#f0ece4] rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${proyecto.avance === 100 ? "bg-[#691B31]" : "bg-[#b78c33]"}`} style={{ width: `${proyecto.avance}%` }} />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-3 border-t border-[#e4ddd0]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#9a9a9a]" />
                <span className="text-[0.75rem] text-[#6b6b6b]">{proyecto.fechaInicio} - {proyecto.fechaFin}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#9a9a9a]" />
                <span className="text-[0.75rem] text-[#6b6b6b]">{proyecto.participantes.join(", ")}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
