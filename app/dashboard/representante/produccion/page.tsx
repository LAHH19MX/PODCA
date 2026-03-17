"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Eye, Search, BookOpen, FileText, Calendar, Users } from "lucide-react"

const produccion = [
  { titulo: "IA en Entornos Educativos Rurales", tipo: "Articulo de revista", autor: "E. Juarez, J. Mendoza", ca: "UTHH-CA-7", fecha: "12 ene 2025", indexacion: "Scopus" },
  { titulo: "Energia Solar Fotovoltaica: Caso Huasteca", tipo: "Articulo de revista", autor: "L. Gutierrez, R. Diaz", ca: "UTHH-CA-6", fecha: "08 ene 2025", indexacion: "CONACYT" },
  { titulo: "Deteccion Temprana de Enfermedades con ML", tipo: "Ponencia", autor: "R. Perez, M. Sanchez", ca: "UTHH-CA-1", fecha: "05 ene 2025", indexacion: "IEEE" },
  { titulo: "Trajes Representativos de la Huasteca Hidalguense", tipo: "Libro", autor: "J. Mendoza, S. San Vicente", ca: "UTHH-CA-7", fecha: "15 nov 2024", indexacion: "ISBN" },
  { titulo: "Automatizacion Agricola Mediante Sensores IoT", tipo: "Proyecto", autor: "C. Flores, A. Ramirez", ca: "UTHH-CA-4", fecha: "28 dic 2024", indexacion: "—" },
  { titulo: "Modelos Agiles en PyMEs", tipo: "Capitulo de libro", autor: "J. Mendoza, S. Cruz", ca: "UTHH-CA-3", fecha: "20 dic 2024", indexacion: "ISBN" },
  { titulo: "Generador de Horarios con Algoritmos Evolutivos", tipo: "Articulo", autor: "E. Juarez", ca: "UTHH-CA-7", fecha: "01 oct 2024", indexacion: "Scopus" },
]

export default function RepresentanteProduccionPage() {
  return (
    <DashboardLayout role="representante">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Representante institucional</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#691B31] leading-tight">Visor de Produccion</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Consulta toda la produccion academica de los cuerpos academicos.</p>
      </div>

      <div className="bg-[#fff] border border-[#e4ddd0] p-4 mb-[6px] flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-[360px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#9a9a9a]" />
          <input type="text" placeholder="Buscar produccion..." className="w-full pl-9 pr-4 py-[0.5rem] bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.82rem] text-[#2e2e2e] placeholder:text-[#9a9a9a] outline-none focus:border-[#c9a227] transition-colors duration-200" />
        </div>
        <select className="py-[0.5rem] px-3 bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.82rem] text-[#6b6b6b] outline-none focus:border-[#c9a227]">
          <option>Todos los C.A.</option>
          <option>UTHH-CA-7</option>
          <option>UTHH-CA-2</option>
          <option>UTHH-CA-3</option>
        </select>
        <select className="py-[0.5rem] px-3 bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.82rem] text-[#6b6b6b] outline-none focus:border-[#c9a227]">
          <option>Todos los tipos</option>
          <option>Articulo</option>
          <option>Libro</option>
          <option>Ponencia</option>
          <option>Proyecto</option>
        </select>
      </div>

      <div className="flex flex-col gap-[6px]">
        {produccion.map((item, i) => (
          <div key={i} className="bg-[#fff] border border-[#e4ddd0] p-5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-[#faf5e4] flex items-center justify-center rounded-[3px] shrink-0 mt-0.5">
                <FileText className="w-[14px] h-[14px] text-[#c9a227]" />
              </div>
              <div className="flex-1">
                <h3 className="text-[0.9rem] font-medium text-[#691B31]">{item.titulo}</h3>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className="text-[0.72rem] text-[#6b6b6b]">{item.tipo}</span>
                  <span className="text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] bg-[#faf5e4] text-[#c9a227]">{item.indexacion}</span>
                  <span className="text-[0.68rem] font-bold tracking-[0.1em] text-[#c9a227] bg-[rgba(0,0,0,0.85)] px-1.5 py-0.5 rounded-[2px]">{item.ca}</span>
                </div>
                <div className="flex items-center gap-5 mt-2">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-[#9a9a9a]" />
                    <span className="text-[0.75rem] text-[#6b6b6b]">{item.autor}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-[#9a9a9a]" />
                    <span className="text-[0.75rem] text-[#9a9a9a]">{item.fecha}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
