"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { BookOpen, Search, Filter, Eye, CheckCircle, XCircle } from "lucide-react"

const publicaciones = [
  { id: 1, titulo: "IA en Entornos Educativos Rurales", tipo: "Articulo", autor: "Dr. M. Hernandez", ca: "UTHH-CA-7", fecha: "12 ene 2025", estado: "Pendiente" },
  { id: 2, titulo: "Energia Solar Fotovoltaica: Caso Huasteca", tipo: "Articulo", autor: "Mtra. L. Gutierrez", ca: "UTHH-CA-6", fecha: "05 ene 2025", estado: "Aprobado" },
  { id: 3, titulo: "Deteccion Temprana de Enfermedades con ML", tipo: "Articulo", autor: "Dr. R. Perez", ca: "UTHH-CA-5", fecha: "28 dic 2024", estado: "Aprobado" },
  { id: 4, titulo: "Automatizacion Agricola Mediante IoT", tipo: "Proyecto", autor: "Ing. C. Flores", ca: "UTHH-CA-2", fecha: "20 dic 2024", estado: "Rechazado" },
  { id: 5, titulo: "Generador de Horarios con Algoritmos Evolutivos", tipo: "Articulo", autor: "MIA. E. Juarez", ca: "UTHH-CA-7", fecha: "15 dic 2024", estado: "Aprobado" },
  { id: 6, titulo: "Portal Digital de Cuerpos Academicos UTHH", tipo: "Memoria", autor: "MTI. J. Mendoza", ca: "UTHH-CA-7", fecha: "10 dic 2024", estado: "Pendiente" },
]

const estadoConfig: Record<string, { color: string; icon: React.ElementType }> = {
  Pendiente: { color: "bg-[#faf5e4] text-[#c9a227]", icon: Eye },
  Aprobado: { color: "bg-[#722F37] text-[#fff]", icon: CheckCircle },
  Rechazado: { color: "bg-[#f8f6f3] text-[#9a9a9a]", icon: XCircle },
}

export default function AdminPublicacionesPage() {
  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Administracion</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#722F37] leading-tight">Publicaciones</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Revisa y aprueba las publicaciones de los cuerpos academicos.</p>
      </div>

      {/* Filters */}
      <div className="bg-[#fff] border border-[#e8e4df] p-4 mb-[6px] flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-[200px] max-w-[400px]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#9a9a9a]" />
            <input type="text" placeholder="Buscar publicaciones..." className="w-full pl-9 pr-4 py-[0.5rem] bg-[#fdfcfa] border border-[#e8e4df] rounded-[3px] text-[0.82rem] text-[#2e2e2e] placeholder:text-[#9a9a9a] outline-none focus:border-[#c9a227] transition-colors duration-200" />
          </div>
          <button className="flex items-center gap-2 px-3 py-[0.5rem] border border-[#e8e4df] rounded-[3px] text-[0.78rem] font-medium text-[#6b6b6b] hover:border-[#c9a227] hover:text-[#c9a227] transition-colors duration-200">
            <Filter className="w-3.5 h-3.5" />
            Filtrar
          </button>
        </div>
        <div className="flex items-center gap-2">
          {["Todos", "Pendiente", "Aprobado", "Rechazado"].map((f) => (
            <button key={f} className={`px-3 py-[0.4rem] rounded-[3px] text-[0.72rem] font-semibold transition-colors duration-200 ${f === "Todos" ? "bg-[#722F37] text-[#fff]" : "bg-[#f8f6f3] text-[#6b6b6b] hover:text-[#c9a227]"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#fff] border border-[#e8e4df] overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#e8e4df]">
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Titulo</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Tipo</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Autor</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">C.A.</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Fecha</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Estado</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {publicaciones.map((pub) => {
              const config = estadoConfig[pub.estado]
              return (
                <tr key={pub.id} className="border-b border-[#e8e4df] last:border-b-0 hover:bg-[#fdfcfa] transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#faf5e4] flex items-center justify-center shrink-0 rounded-[3px]">
                        <BookOpen className="w-[14px] h-[14px] text-[#c9a227]" />
                      </div>
                      <span className="text-[0.82rem] font-medium text-[#2e2e2e]">{pub.titulo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[0.78rem] text-[#6b6b6b]">{pub.tipo}</td>
                  <td className="px-6 py-4 text-[0.78rem] text-[#6b6b6b]">{pub.autor}</td>
                  <td className="px-6 py-4 text-[0.78rem] text-[#6b6b6b]">{pub.ca}</td>
                  <td className="px-6 py-4 text-[0.78rem] text-[#9a9a9a]">{pub.fecha}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] ${config.color}`}>{pub.estado}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {pub.estado === "Pendiente" && (
                        <>
                          <button className="w-7 h-7 flex items-center justify-center rounded-[3px] hover:bg-[#faf5e4] transition-colors" title="Aprobar">
                            <CheckCircle className="w-4 h-4 text-[#c9a227]" />
                          </button>
                          <button className="w-7 h-7 flex items-center justify-center rounded-[3px] hover:bg-[#f8f6f3] transition-colors" title="Rechazar">
                            <XCircle className="w-4 h-4 text-[#9a9a9a]" />
                          </button>
                        </>
                      )}
                      <button className="w-7 h-7 flex items-center justify-center rounded-[3px] hover:bg-[#faf5e4] transition-colors" title="Ver">
                        <Eye className="w-4 h-4 text-[#6b6b6b]" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
