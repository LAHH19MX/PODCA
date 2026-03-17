"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { BookOpen, Search, Eye, Calendar, Users } from "lucide-react"

const publicaciones = [
  { titulo: "IA en Entornos Educativos Rurales de la Huasteca", tipo: "Articulo de revista", autores: "E. Juarez, J. Mendoza", ca: "UTHH-CA-7", fecha: "12 ene 2025", indexacion: "Scopus" },
  { titulo: "Energia Solar Fotovoltaica: Caso Huasteca", tipo: "Articulo de revista", autores: "L. Gutierrez, R. Diaz", ca: "UTHH-CA-6", fecha: "08 ene 2025", indexacion: "CONACYT" },
  { titulo: "Deteccion Temprana de Enfermedades con ML", tipo: "Ponencia", autores: "R. Perez, M. Sanchez", ca: "UTHH-CA-1", fecha: "05 ene 2025", indexacion: "IEEE" },
  { titulo: "Automatizacion Agricola Mediante Sensores IoT", tipo: "Articulo de revista", autores: "C. Flores, A. Ramirez", ca: "UTHH-CA-4", fecha: "28 dic 2024", indexacion: "Scopus" },
  { titulo: "Modelos Agiles en PyMEs de la Region Huasteca", tipo: "Capitulo de libro", autores: "J. Mendoza, S. Cruz", ca: "UTHH-CA-3", fecha: "20 dic 2024", indexacion: "ISBN" },
  { titulo: "Trajes Representativos de la Huasteca Hidalguense", tipo: "Libro", autores: "J. Mendoza, S. San Vicente", ca: "UTHH-CA-7", fecha: "15 nov 2024", indexacion: "ISBN" },
  { titulo: "Generador de Horarios con Algoritmos Evolutivos", tipo: "Articulo", autores: "E. Juarez", ca: "UTHH-CA-7", fecha: "01 oct 2024", indexacion: "Scopus" },
  { titulo: "Analisis de Redes Sociales en la Huasteca", tipo: "Ponencia", autores: "A. Lopez, C. Vega", ca: "UTHH-CA-2", fecha: "15 sep 2024", indexacion: "CONACYT" },
]

export default function ExternoPublicacionesPage() {
  return (
    <DashboardLayout role="externo">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#b78c33] block mb-2">Acceso externo</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#0f0f0f] leading-tight">Publicaciones</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Consulta la produccion academica disponible de los cuerpos academicos de la UTHH.</p>
      </div>

      <div className="bg-[#fff] border border-[#e4ddd0] p-4 mb-[6px] flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#9a9a9a]" />
          <input type="text" placeholder="Buscar por titulo, autor, C.A...." className="w-full pl-9 pr-4 py-[0.5rem] bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.82rem] text-[#2e2e2e] placeholder:text-[#9a9a9a] outline-none focus:border-[#b78c33] transition-colors duration-200" />
        </div>
        <select className="py-[0.5rem] px-3 bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.82rem] text-[#6b6b6b] outline-none focus:border-[#b78c33]">
          <option>Todos los tipos</option>
          <option>Articulo</option>
          <option>Libro</option>
          <option>Ponencia</option>
          <option>Capitulo de libro</option>
        </select>
      </div>

      <div className="flex flex-col gap-[6px]">
        {publicaciones.map((pub, i) => (
          <div key={i} className="bg-[#fff] border border-[#e4ddd0] p-5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-[#f5edd8] flex items-center justify-center rounded-[3px] shrink-0 mt-0.5">
                  <BookOpen className="w-[14px] h-[14px] text-[#b78c33]" />
                </div>
                <div>
                  <h3 className="text-[0.9rem] font-medium text-[#0f0f0f]">{pub.titulo}</h3>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="text-[0.72rem] text-[#6b6b6b]">{pub.tipo}</span>
                    <span className="text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] bg-[#f5edd8] text-[#b78c33]">{pub.indexacion}</span>
                  </div>
                </div>
              </div>
              <button className="text-[0.72rem] font-semibold text-[#b78c33] flex items-center gap-1 hover:text-[#0f0f0f] transition-colors shrink-0">
                <Eye className="w-3 h-3" /> Ver
              </button>
            </div>
            <div className="flex items-center gap-5 mt-3 pt-3 border-t border-[#e4ddd0]">
              <div className="flex items-center gap-1.5">
                <Users className="w-3 h-3 text-[#9a9a9a]" />
                <span className="text-[0.75rem] text-[#6b6b6b]">{pub.autores}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[0.72rem] font-semibold text-[#b78c33]">{pub.ca}</span>
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
