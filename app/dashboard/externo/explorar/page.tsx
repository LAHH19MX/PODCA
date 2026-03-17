"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Building2, Users, BookOpen, FlaskConical, ArrowRight, Search } from "lucide-react"

const cuerposAcademicos = [
  { clave: "UTHH-CA-7", nombre: "Tecnologias de Informacion y Comunicacion", carrera: "Ing. en TIC", integrantes: 2, publicaciones: 28, lgac: "Aplicacion de las TIC en la Region" },
  { clave: "UTHH-CA-2", nombre: "Desarrollo de Software", carrera: "Ing. en TIC", integrantes: 2, publicaciones: 22, lgac: "Desarrollo de Software e Innovacion" },
  { clave: "UTHH-CA-3", nombre: "Administracion y Gestion Empresarial", carrera: "Lic. en Administracion", integrantes: 2, publicaciones: 18, lgac: "Capital Humano y Competitividad" },
  { clave: "UTHH-CA-4", nombre: "Procesos Industriales y Mecatronica", carrera: "Ing. Industrial", integrantes: 2, publicaciones: 15, lgac: "Procesos de Produccion y Calidad" },
  { clave: "UTHH-CA-5", nombre: "Matematicas Aplicadas", carrera: "Ing. Industrial", integrantes: 2, publicaciones: 12, lgac: "Metodos Estadisticos Aplicados" },
  { clave: "UTHH-CA-6", nombre: "Energias Renovables y Medio Ambiente", carrera: "Ing. en Energias Renovables", integrantes: 2, publicaciones: 16, lgac: "Tecnologias Verdes y Eficiencia Energetica" },
  { clave: "UTHH-CA-1", nombre: "Tecnologias Aplicadas a la Salud", carrera: "Lic. en Enfermeria", integrantes: 2, publicaciones: 13, lgac: "Tecnologias Aplicadas a la Salud" },
]

export default function ExternoExplorarPage() {
  return (
    <DashboardLayout role="externo">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#b78c33] block mb-2">Explorar</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#0f0f0f] leading-tight">Cuerpos Academicos de la UTHH</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Conoce los cuerpos academicos, sus lineas de investigacion y produccion.</p>
      </div>

      <div className="bg-[#fff] border border-[#e4ddd0] p-4 mb-[6px]">
        <div className="relative max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#9a9a9a]" />
          <input type="text" placeholder="Buscar cuerpo academico..." className="w-full pl-9 pr-4 py-[0.5rem] bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.82rem] text-[#2e2e2e] placeholder:text-[#9a9a9a] outline-none focus:border-[#b78c33] transition-colors duration-200" />
        </div>
      </div>

      <div className="flex flex-col gap-[6px]">
        {cuerposAcademicos.map((ca, i) => (
          <div key={i} className="bg-[#fff] border border-[#e4ddd0] p-6 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#f5edd8] flex items-center justify-center rounded-[3px] shrink-0">
                  <Building2 className="w-5 h-5 text-[#b78c33]" />
                </div>
                <div>
                  <span className="text-[0.68rem] font-bold tracking-[0.12em] text-[#b78c33] bg-[rgba(0,0,0,0.85)] px-2 py-0.5 rounded-[3px] border-l-2 border-[#b78c33] inline-block mb-1">{ca.clave}</span>
                  <h3 className="font-serif text-[1rem] font-semibold text-[#0f0f0f]">{ca.nombre}</h3>
                  <p className="text-[0.75rem] text-[#9a9a9a] mt-0.5">{ca.carrera}</p>
                </div>
              </div>
              <button className="text-[0.72rem] font-semibold text-[#b78c33] flex items-center gap-1 hover:text-[#0f0f0f] transition-colors duration-300">
                Ver detalle <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-3 mb-3">
              <FlaskConical className="w-3.5 h-3.5 text-[#9a9a9a]" />
              <span className="text-[0.78rem] text-[#6b6b6b]">LGAC: {ca.lgac}</span>
            </div>
            <div className="flex items-center gap-6 pt-3 border-t border-[#e4ddd0]">
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#9a9a9a]" />
                <span className="text-[0.75rem] text-[#6b6b6b]">{ca.integrantes} integrantes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#9a9a9a]" />
                <span className="text-[0.75rem] text-[#6b6b6b]">{ca.publicaciones} publicaciones</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
