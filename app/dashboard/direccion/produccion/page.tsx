"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { FileText, BookOpen, Award, GraduationCap, Filter } from "lucide-react"

const produccion = [
  { titulo: "IA en Entornos Educativos Rurales", tipo: "Articulo de revista", ca: "UTHH-CA-7", autores: "E. Juarez, J. Mendoza", fecha: "Ene 2025", indexacion: "Scopus" },
  { titulo: "Energia Solar Fotovoltaica: Caso Huasteca", tipo: "Articulo de revista", ca: "UTHH-CA-6", autores: "L. Gutierrez, R. Martinez", fecha: "Dic 2024", indexacion: "CONACYT" },
  { titulo: "Deteccion Temprana de Enfermedades con ML", tipo: "Articulo de congreso", ca: "UTHH-CA-5", autores: "R. Perez, M. Luna", fecha: "Nov 2024", indexacion: "IEEE" },
  { titulo: "Modelo de Gestion Empresarial Regional", tipo: "Libro", ca: "UTHH-CA-3", autores: "S. Cruz, A. Lopez", fecha: "Oct 2024", indexacion: "ISBN" },
  { titulo: "Generador de Horarios con Algoritmos Evolutivos", tipo: "Articulo de revista", ca: "UTHH-CA-7", autores: "E. Juarez", fecha: "Sep 2024", indexacion: "Scopus" },
  { titulo: "Trajes Representativos de la Huasteca", tipo: "Libro", ca: "UTHH-CA-7", autores: "J. Mendoza, E. Juarez", fecha: "Ago 2024", indexacion: "ISBN" },
]

export default function DireccionProduccionPage() {
  return (
    <DashboardLayout role="direccion">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#b78c33] block mb-2">Direccion Academica</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#0f0f0f] leading-tight">Produccion Academica</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Seguimiento de la produccion academica institucional.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[6px] mb-8">
        <StatCard icon={BookOpen} label="Articulos" value="68" sub="En revistas indexadas" />
        <StatCard icon={FileText} label="Libros" value="12" sub="Con ISBN" />
        <StatCard icon={Award} label="Congresos" value="34" sub="Ponencias presentadas" />
        <StatCard icon={GraduationCap} label="Tesis dirigidas" value="10" sub="Concluidas este periodo" />
      </div>

      {/* Filter bar */}
      <div className="bg-[#fff] border border-[#e4ddd0] p-4 mb-[6px] flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          {["Todos", "Articulos", "Libros", "Congresos"].map((f) => (
            <button key={f} className={`px-3 py-[0.4rem] rounded-[3px] text-[0.72rem] font-semibold transition-colors duration-200 ${f === "Todos" ? "bg-[#0f0f0f] text-[#fff]" : "bg-[#f0ece4] text-[#6b6b6b] hover:text-[#b78c33]"}`}>
              {f}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-3 py-[0.4rem] border border-[#e4ddd0] rounded-[3px] text-[0.78rem] font-medium text-[#6b6b6b] hover:border-[#b78c33] hover:text-[#b78c33] transition-colors duration-200">
          <Filter className="w-3.5 h-3.5" />
          Filtrar por C.A.
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#fff] border border-[#e4ddd0] overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#e4ddd0]">
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Titulo</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Tipo</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">C.A.</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Autores</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Fecha</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Indexacion</th>
            </tr>
          </thead>
          <tbody>
            {produccion.map((p, i) => (
              <tr key={i} className="border-b border-[#e4ddd0] last:border-b-0 hover:bg-[#f7f4ee] transition-colors duration-200">
                <td className="px-6 py-4 text-[0.82rem] font-medium text-[#2e2e2e] max-w-[300px]">{p.titulo}</td>
                <td className="px-6 py-4 text-[0.78rem] text-[#6b6b6b]">{p.tipo}</td>
                <td className="px-6 py-4 text-[0.78rem] text-[#6b6b6b]">{p.ca}</td>
                <td className="px-6 py-4 text-[0.78rem] text-[#6b6b6b]">{p.autores}</td>
                <td className="px-6 py-4 text-[0.78rem] text-[#9a9a9a]">{p.fecha}</td>
                <td className="px-6 py-4">
                  <span className="text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] bg-[#f5edd8] text-[#b78c33]">{p.indexacion}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
