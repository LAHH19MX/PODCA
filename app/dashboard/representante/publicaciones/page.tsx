"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { BookOpen, Search, Eye, Calendar } from "lucide-react"

const publicaciones = [
  { titulo: "IA en Entornos Educativos Rurales de la Huasteca", tipo: "Articulo", ca: "UTHH-CA-7", fecha: "12 ene 2025", indexacion: "Scopus" },
  { titulo: "Energia Solar Fotovoltaica: Caso Huasteca", tipo: "Articulo", ca: "UTHH-CA-6", fecha: "08 ene 2025", indexacion: "CONACYT" },
  { titulo: "Deteccion Temprana de Enfermedades con ML", tipo: "Ponencia", ca: "UTHH-CA-1", fecha: "05 ene 2025", indexacion: "IEEE" },
  { titulo: "Trajes Representativos de la Huasteca Hidalguense", tipo: "Libro", ca: "UTHH-CA-7", fecha: "15 nov 2024", indexacion: "ISBN" },
  { titulo: "Modelos Agiles en PyMEs de la Region Huasteca", tipo: "Capitulo", ca: "UTHH-CA-3", fecha: "20 dic 2024", indexacion: "ISBN" },
]

export default function RepresentantePublicacionesPage() {
  return (
    <DashboardLayout role="representante">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Representante institucional</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#691B31] leading-tight">Publicaciones</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Visualiza las publicaciones de todos los cuerpos academicos.</p>
      </div>

      <div className="bg-[#fff] border border-[#e4ddd0] p-4 mb-[6px] flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#9a9a9a]" />
          <input type="text" placeholder="Buscar publicacion..." className="w-full pl-9 pr-4 py-[0.5rem] bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.82rem] text-[#2e2e2e] placeholder:text-[#9a9a9a] outline-none focus:border-[#c9a227] transition-colors duration-200" />
        </div>
        <select className="py-[0.5rem] px-3 bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.82rem] text-[#6b6b6b] outline-none focus:border-[#c9a227]">
          <option>Todos los C.A.</option>
          <option>UTHH-CA-7</option>
          <option>UTHH-CA-2</option>
          <option>UTHH-CA-3</option>
        </select>
      </div>

      <div className="bg-[#fff] border border-[#e4ddd0] overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#e4ddd0]">
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Titulo</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Tipo</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">C.A.</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Fecha</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Indexacion</th>
            </tr>
          </thead>
          <tbody>
            {publicaciones.map((pub, i) => (
              <tr key={i} className="border-b border-[#e4ddd0] last:border-b-0 hover:bg-[#f7f4ee] transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#faf5e4] flex items-center justify-center shrink-0 rounded-[3px]"><BookOpen className="w-[12px] h-[12px] text-[#c9a227]" /></div>
                    <span className="text-[0.82rem] font-medium text-[#2e2e2e]">{pub.titulo}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[0.78rem] text-[#6b6b6b]">{pub.tipo}</td>
                <td className="px-6 py-4"><span className="text-[0.68rem] font-bold tracking-[0.1em] text-[#c9a227] bg-[rgba(0,0,0,0.85)] px-1.5 py-0.5 rounded-[2px]">{pub.ca}</span></td>
                <td className="px-6 py-4 text-[0.78rem] text-[#9a9a9a]">{pub.fecha}</td>
                <td className="px-6 py-4"><span className="text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] bg-[#faf5e4] text-[#c9a227]">{pub.indexacion}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
