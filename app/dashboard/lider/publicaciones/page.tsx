"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { BookOpen, Plus, Search, Eye, Edit, Trash2 } from "lucide-react"

const publicaciones = [
  { id: 1, titulo: "IA en Entornos Educativos Rurales de la Huasteca", tipo: "Articulo de revista", autores: "E. Juarez, J. Mendoza", fecha: "12 ene 2025", estado: "Publicado", indexacion: "Scopus" },
  { id: 2, titulo: "Portal Digital de Cuerpos Academicos de la UTHH", tipo: "Memoria de residencia", autores: "J. Mendoza", fecha: "08 ene 2025", estado: "En revision", indexacion: "—" },
  { id: 3, titulo: "Generador de Horarios con Algoritmos Evolutivos", tipo: "Articulo de revista", autores: "E. Juarez", fecha: "20 dic 2024", estado: "Publicado", indexacion: "Scopus" },
  { id: 4, titulo: "Trajes Representativos de la Huasteca Hidalguense", tipo: "Libro", autores: "J. Mendoza, E. Juarez", fecha: "15 nov 2024", estado: "Publicado", indexacion: "ISBN" },
  { id: 5, titulo: "Sistema de Monitoreo de Cultivos con IoT", tipo: "Proyecto de investigacion", autores: "E. Juarez", fecha: "01 oct 2024", estado: "En progreso", indexacion: "—" },
]

const estadoColor: Record<string, string> = {
  "Publicado": "bg-[#691B31] text-[#fff]",
  "En revision": "bg-[#faf5e4] text-[#c9a227]",
  "En progreso": "bg-[#f0ece4] text-[#6b6b6b]",
}

export default function LiderPublicacionesPage() {
  return (
    <DashboardLayout role="lider">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">UTHH-CA-7</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#691B31] leading-tight">Publicaciones</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Gestiona las publicaciones de tu cuerpo academico.</p>
      </div>

      <div className="bg-[#fff] border border-[#e4ddd0] p-4 mb-[6px] flex items-center justify-between flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px] max-w-[360px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#9a9a9a]" />
          <input type="text" placeholder="Buscar publicaciones..." className="w-full pl-9 pr-4 py-[0.5rem] bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.82rem] text-[#2e2e2e] placeholder:text-[#9a9a9a] outline-none focus:border-[#b78c33] transition-colors duration-200" />
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-[0.5rem] bg-[#691B31] text-[#fff] rounded-[3px] text-[0.78rem] font-semibold transition-colors duration-300 hover:bg-[#b78c33]">
          <Plus className="w-3.5 h-3.5" />
          Nueva publicacion
        </button>
      </div>

      <div className="bg-[#fff] border border-[#e4ddd0] overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#e4ddd0]">
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Titulo</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Tipo</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Autores</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Fecha</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Estado</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {publicaciones.map((pub) => (
              <tr key={pub.id} className="border-b border-[#e4ddd0] last:border-b-0 hover:bg-[#f7f4ee] transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#faf5e4] flex items-center justify-center shrink-0 rounded-[3px]">
                      <BookOpen className="w-[12px] h-[12px] text-[#c9a227]" />
                    </div>
                    <div>
                      <p className="text-[0.82rem] font-medium text-[#2e2e2e]">{pub.titulo}</p>
                      <p className="text-[0.68rem] text-[#9a9a9a]">{pub.indexacion}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-[0.78rem] text-[#6b6b6b]">{pub.tipo}</td>
                <td className="px-6 py-4 text-[0.78rem] text-[#6b6b6b]">{pub.autores}</td>
                <td className="px-6 py-4 text-[0.78rem] text-[#9a9a9a]">{pub.fecha}</td>
                <td className="px-6 py-4">
                  <span className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] ${estadoColor[pub.estado]}`}>{pub.estado}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <button className="w-7 h-7 flex items-center justify-center rounded-[3px] hover:bg-[#faf5e4] transition-colors"><Eye className="w-3.5 h-3.5 text-[#6b6b6b]" /></button>
                    <button className="w-7 h-7 flex items-center justify-center rounded-[3px] hover:bg-[#faf5e4] transition-colors"><Edit className="w-3.5 h-3.5 text-[#6b6b6b]" /></button>
                    <button className="w-7 h-7 flex items-center justify-center rounded-[3px] hover:bg-[#f0ece4] transition-colors"><Trash2 className="w-3.5 h-3.5 text-[#9a9a9a]" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
