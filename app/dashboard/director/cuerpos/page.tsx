"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Building2, Users, BookOpen, FlaskConical, ArrowRight } from "lucide-react"
import Link from "next/link"

const cuerpos = [
  { clave: "UTHH-CA-7", nombre: "Tecnologias de Informacion y Comunicacion", lider: "MIA. Efren Juarez Castillo", integrantes: 2, publicaciones: 28, lgac: "Aplicacion de las TIC en la Region", grado: "En Consolidacion" },
  { clave: "UTHH-CA-2", nombre: "Desarrollo de Software", lider: "Dr. Carlos Vega Martinez", integrantes: 2, publicaciones: 22, lgac: "Desarrollo de Software e Innovacion Tecnologica", grado: "En Formacion" },
]

export default function DirectorCuerposPage() {
  return (
    <DashboardLayout role="director">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#b78c33] block mb-2">Director del programa</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#0f0f0f] leading-tight">Cuerpos Academicos</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Cuerpos academicos pertenecientes al programa educativo TIC.</p>
      </div>

      <div className="flex flex-col gap-[6px]">
        {cuerpos.map((ca, i) => (
          <div key={i} className="bg-[#fff] border border-[#e4ddd0] p-6 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#f5edd8] flex items-center justify-center rounded-[3px] shrink-0">
                  <Building2 className="w-5 h-5 text-[#b78c33]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[0.68rem] font-bold tracking-[0.12em] text-[#b78c33] bg-[rgba(0,0,0,0.85)] px-2 py-0.5 rounded-[3px] border-l-2 border-[#b78c33]">{ca.clave}</span>
                    <span className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] ${ca.grado === "En Consolidacion" ? "bg-[#b78c33] text-[#fff]" : "bg-[#f5edd8] text-[#b78c33]"}`}>{ca.grado}</span>
                  </div>
                  <h3 className="font-serif text-[1.05rem] font-semibold text-[#0f0f0f]">{ca.nombre}</h3>
                  <p className="text-[0.75rem] text-[#9a9a9a] mt-0.5">Lider: {ca.lider}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <FlaskConical className="w-3.5 h-3.5 text-[#9a9a9a]" />
              <span className="text-[0.78rem] text-[#6b6b6b]">LGAC: {ca.lgac}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#e4ddd0]">
              <div>
                <p className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a]">Integrantes</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Users className="w-3.5 h-3.5 text-[#b78c33]" />
                  <span className="text-[0.85rem] font-semibold text-[#2e2e2e]">{ca.integrantes}</span>
                </div>
              </div>
              <div>
                <p className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a]">Publicaciones</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#b78c33]" />
                  <span className="text-[0.85rem] font-semibold text-[#2e2e2e]">{ca.publicaciones}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
