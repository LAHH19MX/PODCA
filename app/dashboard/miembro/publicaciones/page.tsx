"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { BookOpen, Search, Eye, Calendar, Users } from "lucide-react"

const publicaciones = [
  { titulo: "IA en Entornos Educativos Rurales de la Huasteca", tipo: "Articulo", autores: "E. Juarez, J. Mendoza", fecha: "12 ene 2025", indexacion: "Scopus" },
  { titulo: "Portal Digital de Cuerpos Academicos de la UTHH", tipo: "Proyecto", autores: "J. Mendoza", fecha: "08 ene 2025", indexacion: "—" },
  { titulo: "Generador de Horarios con Algoritmos Evolutivos", tipo: "Articulo", autores: "E. Juarez", fecha: "20 dic 2024", indexacion: "Scopus" },
  { titulo: "Trajes Representativos de la Huasteca Hidalguense", tipo: "Libro", autores: "J. Mendoza, S. San Vicente", fecha: "15 nov 2024", indexacion: "ISBN" },
  { titulo: "Sistema de Monitoreo de Cultivos con IoT", tipo: "Proyecto", autores: "E. Juarez", fecha: "01 oct 2024", indexacion: "—" },
]

export default function MiembroPublicacionesPage() {
  return (
    <DashboardLayout role="miembro">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Miembro C.A.</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#691B31] leading-tight">Publicaciones</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Publicaciones del cuerpo academico UTHH-CA-7.</p>
      </div>

      <div className="bg-[#fff] border border-[#e4ddd0] p-4 mb-[6px]">
        <div className="relative max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#9a9a9a]" />
          <input type="text" placeholder="Buscar publicacion..." className="w-full pl-9 pr-4 py-[0.5rem] bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.82rem] text-[#2e2e2e] placeholder:text-[#9a9a9a] outline-none focus:border-[#b78c33] transition-colors duration-200" />
        </div>
      </div>

      <div className="flex flex-col gap-[6px]">
        {publicaciones.map((pub, i) => (
          <div key={i} className="bg-[#fff] border border-[#e4ddd0] p-5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-[#faf5e4] flex items-center justify-center rounded-[3px] shrink-0 mt-0.5">
                  <BookOpen className="w-[14px] h-[14px] text-[#c9a227]" />
                </div>
                <div>
                  <h3 className="text-[0.9rem] font-medium text-[#691B31]">{pub.titulo}</h3>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="text-[0.72rem] text-[#6b6b6b]">{pub.tipo}</span>
                    <span className="text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] bg-[#faf5e4] text-[#c9a227]">{pub.indexacion}</span>
                  </div>
                </div>
              </div>
              <button className="text-[0.72rem] font-semibold text-[#c9a227] flex items-center gap-1 hover:text-[#691B31] transition-colors shrink-0">
                <Eye className="w-3 h-3" /> Ver
              </button>
            </div>
            <div className="flex items-center gap-5 mt-3 pt-3 border-t border-[#e4ddd0]">
              <div className="flex items-center gap-1.5">
                <Users className="w-3 h-3 text-[#9a9a9a]" />
                <span className="text-[0.75rem] text-[#6b6b6b]">{pub.autores}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-[#9a9a9a]" />
                <span className="text-[0.75rem] text-[#9a9a9a]">{pub.fecha}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
