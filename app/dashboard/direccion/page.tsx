"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { Building2, BookOpen, Users, TrendingUp, FileText, GraduationCap } from "lucide-react"
import Link from "next/link"

const caResumen = [
  { nombre: "TIC - CA·01", grado: "En Formacion", publicaciones: 28, integrantes: 2 },
  { nombre: "Sistemas - CA·02", grado: "En Formacion", publicaciones: 22, integrantes: 2 },
  { nombre: "Administracion - CA·03", grado: "En Consolidacion", publicaciones: 18, integrantes: 2 },
  { nombre: "Industrial - CA·04", grado: "En Formacion", publicaciones: 15, integrantes: 2 },
  { nombre: "Matematicas - CA·05", grado: "En Formacion", publicaciones: 12, integrantes: 2 },
  { nombre: "Sustentabilidad - CA·06", grado: "En Formacion", publicaciones: 16, integrantes: 2 },
  { nombre: "Salud - CA·07", grado: "En Formacion", publicaciones: 13, integrantes: 2 },
]

const produccionReciente = [
  { titulo: "IA en Entornos Educativos Rurales", tipo: "Articulo", ca: "CA·01", fecha: "12 ene 2025" },
  { titulo: "Energia Solar Fotovoltaica", tipo: "Articulo", ca: "CA·06", fecha: "08 ene 2025" },
  { titulo: "Deteccion Temprana con ML", tipo: "Ponencia", ca: "CA·07", fecha: "05 ene 2025" },
  { titulo: "Modelos Agiles en PyMEs", tipo: "Capitulo", ca: "CA·03", fecha: "28 dic 2024" },
]

export default function DireccionDashboard() {
  return (
    <DashboardLayout role="direccion">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Direccion academica</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#722F37] leading-tight">Vision Academica General</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Monitoreo de cuerpos academicos y produccion cientifica de la UTHH.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[6px] mb-8">
        <StatCard icon={Building2} label="Cuerpos academicos" value="7" sub="1 en consolidacion" />
        <StatCard icon={BookOpen} label="Produccion total" value="124" sub="Articulos, libros, ponencias" />
        <StatCard icon={Users} label="Investigadores" value="14" sub="En 7 cuerpos academicos" />
        <StatCard icon={TrendingUp} label="Publicaciones 2025" value="18" sub="+24% vs periodo anterior" />
      </div>

      {/* CA Table */}
      <div className="bg-[#fff] border border-[#e8e4df] p-6 mb-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Building2 className="w-[14px] h-[14px] text-[#c9a227]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Resumen de cuerpos academicos</h3>
          </div>
          <Link href="/dashboard/direccion/cuerpos" className="text-[0.72rem] font-semibold text-[#c9a227] no-underline hover:text-[#722F37] transition-colors duration-300">
            Ver detalle
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#e8e4df]">
                <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] pb-3 pr-4">Cuerpo Academico</th>
                <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] pb-3 pr-4">Grado</th>
                <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] pb-3 pr-4">Publicaciones</th>
                <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] pb-3">Integrantes</th>
              </tr>
            </thead>
            <tbody>
              {caResumen.map((ca, i) => (
                <tr key={i} className="border-b border-[#e8e4df] last:border-b-0">
                  <td className="py-3 pr-4 text-[0.82rem] font-medium text-[#2e2e2e]">{ca.nombre}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] ${ca.grado === "En Consolidacion" ? "bg-[#c9a227] text-[#fff]" : "bg-[#faf5e4] text-[#c9a227]"}`}>
                      {ca.grado}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-[0.82rem] text-[#6b6b6b]">{ca.publicaciones}</td>
                  <td className="py-3 text-[0.82rem] text-[#6b6b6b]">{ca.integrantes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Production */}
      <div className="bg-[#fff] border border-[#e8e4df] p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <FileText className="w-[14px] h-[14px] text-[#c9a227]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Produccion reciente</h3>
          </div>
          <Link href="/dashboard/direccion/produccion" className="text-[0.72rem] font-semibold text-[#c9a227] no-underline hover:text-[#722F37] transition-colors duration-300">
            Ver toda
          </Link>
        </div>
        <div className="flex flex-col">
          {produccionReciente.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-[#e8e4df] last:border-b-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#faf5e4] flex items-center justify-center rounded-[3px] shrink-0">
                  <GraduationCap className="w-[14px] h-[14px] text-[#c9a227]" />
                </div>
                <div>
                  <p className="text-[0.82rem] font-medium text-[#2e2e2e]">{item.titulo}</p>
                  <p className="text-[0.7rem] text-[#9a9a9a]">{item.tipo} · {item.ca}</p>
                </div>
              </div>
              <span className="text-[0.7rem] text-[#9a9a9a] shrink-0">{item.fecha}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
