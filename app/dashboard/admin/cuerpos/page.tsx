"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Building2, Search, Plus, Users, BookOpen, FolderOpen } from "lucide-react"
import Link from "next/link"

const cuerpos = [
  { clave: "UTHH-CA-1", nombre: "Administracion y Evaluacion de Proyectos", grado: "En Formacion", lider: "Mtro. Juan Perez", integrantes: 3, publicaciones: 12, lgac: "Gestion de Proyectos Tecnologicos" },
  { clave: "UTHH-CA-2", nombre: "Desarrollo de Software e Innovacion", grado: "En Consolidacion", lider: "Dr. Fernando Reyes", integrantes: 4, publicaciones: 25, lgac: "Ingenieria de Software" },
  { clave: "UTHH-CA-3", nombre: "Capital Humano y Competitividad", grado: "Consolidado", lider: "Dra. Sandra Cruz", integrantes: 5, publicaciones: 35, lgac: "Gestion del Capital Humano" },
  { clave: "UTHH-CA-5", nombre: "Metodos Estadisticos Aplicados", grado: "En Formacion", lider: "Dr. Luis Ramirez", integrantes: 2, publicaciones: 8, lgac: "Estadistica y Modelacion" },
  { clave: "UTHH-CA-6", nombre: "Tecnologias Verdes y Eficiencia Energetica", grado: "En Formacion", lider: "Mtra. Rosa Martinez", integrantes: 3, publicaciones: 10, lgac: "Energias Renovables" },
  { clave: "UTHH-CA-7", nombre: "Tecnologias de Informacion y Comunicacion", grado: "En Consolidacion", lider: "MIA. Efren Juarez", integrantes: 2, publicaciones: 28, lgac: "Aplicacion de las TIC en la Region" },
]

const gradoColor: Record<string, string> = {
  "En Formacion": "bg-[#f8f6f3] text-[#9a9a9a]",
  "En Consolidacion": "bg-[#f5edd8] text-[#c9a227]",
  "Consolidado": "bg-[#722F37] text-[#fff]",
}

export default function AdminCuerposPage() {
  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Administracion</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#722F37] leading-tight">Cuerpos Academicos</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Gestiona todos los cuerpos academicos registrados.</p>
      </div>

      {/* Toolbar */}
      <div className="bg-[#fff] border border-[#e8e4df] p-4 mb-[6px] flex items-center justify-between flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px] max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#9a9a9a]" />
          <input type="text" placeholder="Buscar cuerpos academicos..." className="w-full pl-9 pr-4 py-[0.5rem] bg-[#fdfcfa] border border-[#e8e4df] rounded-[3px] text-[0.82rem] text-[#2e2e2e] placeholder:text-[#9a9a9a] outline-none focus:border-[#c9a227] transition-colors duration-200" />
        </div>
        <Link href="#" className="inline-flex items-center gap-2 px-4 py-[0.5rem] bg-[#722F37] text-[#fff] rounded-[3px] text-[0.78rem] font-semibold no-underline transition-colors duration-300 hover:bg-[#c9a227]">
          <Plus className="w-3.5 h-3.5" />
          Registrar C.A.
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[6px]">
        {cuerpos.map((ca) => (
          <div key={ca.clave} className="bg-[#fff] border border-[#e8e4df] p-6 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-[#c9a227]">{ca.clave}</span>
                <h3 className="font-serif text-[1rem] font-semibold text-[#722F37] mt-1 leading-tight">{ca.nombre}</h3>
              </div>
              <span className={`text-[0.65rem] font-semibold px-2 py-0.5 rounded-[3px] shrink-0 ${gradoColor[ca.grado]}`}>{ca.grado}</span>
            </div>
            <p className="text-[0.78rem] text-[#6b6b6b] mb-4">LGAC: {ca.lgac}</p>
            <p className="text-[0.78rem] text-[#6b6b6b] mb-4">Lider: <span className="text-[#2e2e2e] font-medium">{ca.lider}</span></p>
            <div className="flex items-center gap-4 pt-4 border-t border-[#e8e4df]">
              <div className="flex items-center gap-1.5 text-[0.72rem] text-[#9a9a9a]">
                <Users className="w-3.5 h-3.5" /> {ca.integrantes}
              </div>
              <div className="flex items-center gap-1.5 text-[0.72rem] text-[#9a9a9a]">
                <BookOpen className="w-3.5 h-3.5" /> {ca.publicaciones}
              </div>
              <div className="flex items-center gap-1.5 text-[0.72rem] text-[#9a9a9a]">
                <FolderOpen className="w-3.5 h-3.5" /> {ca.lgac.split(",").length} LGAC
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
