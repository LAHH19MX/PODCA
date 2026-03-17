"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Building2, Users, BookOpen, TrendingUp, Eye } from "lucide-react"
import Link from "next/link"

const cuerpos = [
  { clave: "UTHH-CA-1", nombre: "Administracion y Evaluacion de Proyectos", grado: "En Formacion", integrantes: 3, publicaciones: 12, avancePRODEP: 40 },
  { clave: "UTHH-CA-2", nombre: "Desarrollo de Software e Innovacion", grado: "En Consolidacion", integrantes: 4, publicaciones: 25, avancePRODEP: 72 },
  { clave: "UTHH-CA-3", nombre: "Capital Humano y Competitividad", grado: "Consolidado", integrantes: 5, publicaciones: 35, avancePRODEP: 95 },
  { clave: "UTHH-CA-5", nombre: "Metodos Estadisticos Aplicados", grado: "En Formacion", integrantes: 2, publicaciones: 8, avancePRODEP: 30 },
  { clave: "UTHH-CA-6", nombre: "Tecnologias Verdes y Eficiencia Energetica", grado: "En Formacion", integrantes: 3, publicaciones: 10, avancePRODEP: 35 },
  { clave: "UTHH-CA-7", nombre: "Tecnologias de Informacion y Comunicacion", grado: "En Consolidacion", integrantes: 2, publicaciones: 28, avancePRODEP: 68 },
]

const gradoColor: Record<string, string> = {
  "En Formacion": "bg-[#f0ece4] text-[#9a9a9a]",
  "En Consolidacion": "bg-[#f5edd8] text-[#b78c33]",
  "Consolidado": "bg-[#0f0f0f] text-[#fff]",
}

export default function DireccionCuerposPage() {
  return (
    <DashboardLayout role="direccion">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#b78c33] block mb-2">Direccion Academica</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#0f0f0f] leading-tight">Cuerpos Academicos</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Seguimiento y evaluacion de cuerpos academicos institucionales.</p>
      </div>

      <div className="grid grid-cols-1 gap-[6px]">
        {cuerpos.map((ca) => (
          <div key={ca.clave} className="bg-[#fff] border border-[#e4ddd0] p-6 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="flex-1 min-w-[260px]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-[#b78c33]">{ca.clave}</span>
                  <span className={`text-[0.65rem] font-semibold px-2 py-0.5 rounded-[3px] ${gradoColor[ca.grado]}`}>{ca.grado}</span>
                </div>
                <h3 className="font-serif text-[1.05rem] font-semibold text-[#0f0f0f] mb-3">{ca.nombre}</h3>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-1.5 text-[0.75rem] text-[#6b6b6b]">
                    <Users className="w-3.5 h-3.5 text-[#b78c33]" /> {ca.integrantes} integrantes
                  </div>
                  <div className="flex items-center gap-1.5 text-[0.75rem] text-[#6b6b6b]">
                    <BookOpen className="w-3.5 h-3.5 text-[#b78c33]" /> {ca.publicaciones} publicaciones
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="flex items-center gap-1 mb-1">
                    <TrendingUp className="w-3 h-3 text-[#b78c33]" />
                    <span className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a]">PRODEP</span>
                  </div>
                  <div className="w-32 h-[6px] bg-[#f0ece4] rounded-full overflow-hidden">
                    <div className="h-full bg-[#b78c33] rounded-full transition-all duration-500" style={{ width: `${ca.avancePRODEP}%` }} />
                  </div>
                  <span className="text-[0.72rem] text-[#6b6b6b] mt-1 block">{ca.avancePRODEP}%</span>
                </div>
                <Link href={`#`} className="flex items-center gap-2 px-3 py-[0.4rem] border border-[#e4ddd0] rounded-[3px] text-[0.75rem] font-semibold text-[#6b6b6b] no-underline hover:border-[#b78c33] hover:text-[#b78c33] transition-colors duration-200">
                  <Eye className="w-3.5 h-3.5" />
                  Detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
