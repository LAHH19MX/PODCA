"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Building2, Users, BookOpen, FlaskConical, Search } from "lucide-react"

const cuerpos = [
  { clave: "UTHH-CA-7", nombre: "Tecnologias de Informacion y Comunicacion", lider: "MIA. Efren Juarez Castillo", carrera: "Ing. en TIC", integrantes: 2, publicaciones: 28, lgac: "Aplicacion de las TIC en la Region", grado: "En Consolidacion" },
  { clave: "UTHH-CA-2", nombre: "Desarrollo de Software", lider: "Dr. Carlos Vega Martinez", carrera: "Ing. en TIC", integrantes: 2, publicaciones: 22, lgac: "Desarrollo de Software e Innovacion", grado: "En Formacion" },
  { clave: "UTHH-CA-3", nombre: "Administracion y Gestion Empresarial", lider: "Dra. Sandra Cruz Hernandez", carrera: "Lic. en Administracion", integrantes: 2, publicaciones: 18, lgac: "Capital Humano y Competitividad", grado: "En Consolidacion" },
  { clave: "UTHH-CA-4", nombre: "Procesos Industriales y Mecatronica", lider: "Ing. Marco Reyes Lopez", carrera: "Ing. Industrial", integrantes: 2, publicaciones: 15, lgac: "Procesos de Produccion y Calidad", grado: "En Formacion" },
  { clave: "UTHH-CA-5", nombre: "Matematicas Aplicadas", lider: "Mtra. Elena Diaz Torres", carrera: "Ing. Industrial", integrantes: 2, publicaciones: 12, lgac: "Metodos Estadisticos Aplicados", grado: "En Formacion" },
  { clave: "UTHH-CA-6", nombre: "Energias Renovables y Medio Ambiente", lider: "Mtra. Laura Gutierrez Pena", carrera: "Ing. en Energias Renovables", integrantes: 2, publicaciones: 16, lgac: "Tecnologias Verdes y Eficiencia Energetica", grado: "En Formacion" },
  { clave: "UTHH-CA-1", nombre: "Tecnologias Aplicadas a la Salud", lider: "Dr. Roberto Perez Sanchez", carrera: "Lic. en Enfermeria", integrantes: 2, publicaciones: 13, lgac: "Tecnologias Aplicadas a la Salud", grado: "En Formacion" },
]

export default function RepresentanteCuerposPage() {
  return (
    <DashboardLayout role="representante">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Representante institucional</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#691B31] leading-tight">Cuerpos Academicos</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Todos los cuerpos academicos registrados en la UTHH.</p>
      </div>

      <div className="bg-[#fff] border border-[#e4ddd0] p-4 mb-[6px]">
        <div className="relative max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#9a9a9a]" />
          <input type="text" placeholder="Buscar cuerpo academico..." className="w-full pl-9 pr-4 py-[0.5rem] bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.82rem] text-[#2e2e2e] placeholder:text-[#9a9a9a] outline-none focus:border-[#c9a227] transition-colors duration-200" />
        </div>
      </div>

      <div className="bg-[#fff] border border-[#e4ddd0] overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#e4ddd0]">
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Clave</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Nombre</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Carrera</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Lider</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Grado</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Pub.</th>
            </tr>
          </thead>
          <tbody>
            {cuerpos.map((ca, i) => (
              <tr key={i} className="border-b border-[#e4ddd0] last:border-b-0 hover:bg-[#f7f4ee] transition-colors duration-200">
                <td className="px-6 py-4"><span className="text-[0.68rem] font-bold tracking-[0.1em] text-[#c9a227] bg-[rgba(0,0,0,0.85)] px-1.5 py-0.5 rounded-[2px]">{ca.clave}</span></td>
                <td className="px-6 py-4 text-[0.82rem] font-medium text-[#2e2e2e]">{ca.nombre}</td>
                <td className="px-6 py-4 text-[0.78rem] text-[#6b6b6b]">{ca.carrera}</td>
                <td className="px-6 py-4 text-[0.78rem] text-[#6b6b6b]">{ca.lider}</td>
                <td className="px-6 py-4"><span className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] ${ca.grado === "En Consolidacion" ? "bg-[#c9a227] text-[#fff]" : "bg-[#faf5e4] text-[#c9a227]"}`}>{ca.grado}</span></td>
                <td className="px-6 py-4 text-[0.82rem] font-semibold text-[#2e2e2e]">{ca.publicaciones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
