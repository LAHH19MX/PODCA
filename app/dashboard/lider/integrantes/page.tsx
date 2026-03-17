"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Users, Plus, Mail, BookOpen, GraduationCap, Award } from "lucide-react"

const integrantes = [
  {
    nombre: "MIA. Efren Juarez Castillo",
    email: "efren.juarez@uthh.edu.mx",
    rol: "Lider",
    gradoAcademico: "Maestria en Inteligencia Artificial",
    publicaciones: 15,
    proyectos: 3,
    perfilPRODEP: "Vigente",
    sni: "Candidato",
    estado: "Activo",
  },
  {
    nombre: "MTI. Juvencio Mendoza Castelan",
    email: "juvencio.mendoza@uthh.edu.mx",
    rol: "Integrante",
    gradoAcademico: "Maestria en Tecnologias de la Informacion",
    publicaciones: 13,
    proyectos: 2,
    perfilPRODEP: "Vigente",
    sni: "—",
    estado: "Activo",
  },
]

export default function LiderIntegrantesPage() {
  return (
    <DashboardLayout role="lider">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">UTHH-CA-7</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#691B31] leading-tight">Integrantes</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Gestiona los miembros de tu cuerpo academico.</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-[0.82rem] text-[#6b6b6b]">{integrantes.length} miembros activos</p>
        <button className="inline-flex items-center gap-2 px-4 py-[0.5rem] bg-[#691B31] text-[#fff] rounded-[3px] text-[0.78rem] font-semibold transition-colors duration-300 hover:bg-[#b78c33]">
          <Plus className="w-3.5 h-3.5" />
          Invitar integrante
        </button>
      </div>

      <div className="flex flex-col gap-[6px]">
        {integrantes.map((miembro, i) => (
          <div key={i} className="bg-[#fff] border border-[#e4ddd0] p-6 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300">
            <div className="flex items-start gap-5 flex-wrap">
              <div className="w-14 h-14 rounded-full bg-[#faf5e4] flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-[#c9a227]" />
              </div>
              <div className="flex-1 min-w-[240px]">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-serif text-[1.05rem] font-semibold text-[#691B31]">{miembro.nombre}</h3>
                  <span className={`text-[0.65rem] font-semibold px-2 py-0.5 rounded-[3px] ${miembro.rol === "Lider" ? "bg-[#691B31] text-[#fff]" : "bg-[#faf5e4] text-[#c9a227]"}`}>
                    {miembro.rol}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-3 h-3 text-[#9a9a9a]" />
                  <span className="text-[0.78rem] text-[#6b6b6b]">{miembro.email}</span>
                </div>
                <div className="flex items-center gap-1.5 mb-4">
                  <GraduationCap className="w-3.5 h-3.5 text-[#c9a227]" />
                  <span className="text-[0.78rem] text-[#6b6b6b]">{miembro.gradoAcademico}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#e4ddd0]">
                  <div>
                    <p className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a]">Publicaciones</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <BookOpen className="w-3.5 h-3.5 text-[#c9a227]" />
                      <span className="text-[0.85rem] font-semibold text-[#2e2e2e]">{miembro.publicaciones}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a]">Proyectos</p>
                    <span className="text-[0.85rem] font-semibold text-[#2e2e2e] mt-1 block">{miembro.proyectos}</span>
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a]">Perfil PRODEP</p>
                    <span className="text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] bg-[#faf5e4] text-[#c9a227] mt-1 inline-block">{miembro.perfilPRODEP}</span>
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a]">SNI</p>
                    <span className="text-[0.85rem] font-semibold text-[#2e2e2e] mt-1 block">{miembro.sni}</span>
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
