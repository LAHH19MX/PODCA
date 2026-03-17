"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Users, Mail, GraduationCap, Building2, Search, BookOpen } from "lucide-react"

const investigadores = [
  { nombre: "MIA. Efren Juarez Castillo", email: "efren.juarez@uthh.edu.mx", ca: "UTHH-CA-7", area: "Inteligencia Artificial", publicaciones: 15 },
  { nombre: "MTI. Juvencio Mendoza Castelan", email: "juvencio.mendoza@uthh.edu.mx", ca: "UTHH-CA-7", area: "Tecnologias de Informacion", publicaciones: 13 },
  { nombre: "Dr. Carlos Vega Martinez", email: "carlos.vega@uthh.edu.mx", ca: "UTHH-CA-2", area: "Sistemas Computacionales", publicaciones: 12 },
  { nombre: "Mtra. Ana Lopez Ruiz", email: "ana.lopez@uthh.edu.mx", ca: "UTHH-CA-2", area: "Bases de Datos", publicaciones: 10 },
  { nombre: "Dra. Sandra Cruz Hernandez", email: "sandra.cruz@uthh.edu.mx", ca: "UTHH-CA-3", area: "Gestion Empresarial", publicaciones: 9 },
  { nombre: "Mtra. Laura Gutierrez Pena", email: "laura.gutierrez@uthh.edu.mx", ca: "UTHH-CA-6", area: "Energias Renovables", publicaciones: 8 },
  { nombre: "Dr. Roberto Perez Sanchez", email: "roberto.perez@uthh.edu.mx", ca: "UTHH-CA-1", area: "Tecnologias en Salud", publicaciones: 7 },
  { nombre: "MC. Sonia San Vicente Rinza", email: "sonia.sanvicente@uthh.edu.mx", ca: "UTHH-CA-7", area: "Cultura y Tecnologia", publicaciones: 6 },
]

export default function ExternoDirectorioPage() {
  return (
    <DashboardLayout role="externo">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#b78c33] block mb-2">Acceso externo</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#0f0f0f] leading-tight">Directorio de Investigadores</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Consulta los perfiles de los investigadores de la UTHH.</p>
      </div>

      <div className="bg-[#fff] border border-[#e4ddd0] p-4 mb-[6px]">
        <div className="relative max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#9a9a9a]" />
          <input type="text" placeholder="Buscar investigador..." className="w-full pl-9 pr-4 py-[0.5rem] bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.82rem] text-[#2e2e2e] placeholder:text-[#9a9a9a] outline-none focus:border-[#b78c33] transition-colors duration-200" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[6px]">
        {investigadores.map((inv, i) => (
          <div key={i} className="bg-[#fff] border border-[#e4ddd0] p-5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f5edd8] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-[#b78c33]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[0.9rem] font-semibold text-[#0f0f0f]">{inv.nombre}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[0.68rem] font-bold tracking-[0.1em] text-[#b78c33] bg-[rgba(0,0,0,0.85)] px-1.5 py-0.5 rounded-[2px]">{inv.ca}</span>
                </div>
                <div className="flex flex-col gap-1.5 mt-3 pt-3 border-t border-[#e4ddd0]">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3 h-3 text-[#9a9a9a]" />
                    <span className="text-[0.75rem] text-[#6b6b6b]">{inv.area}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3 text-[#9a9a9a]" />
                    <span className="text-[0.75rem] text-[#6b6b6b]">{inv.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3 h-3 text-[#9a9a9a]" />
                    <span className="text-[0.75rem] text-[#6b6b6b]">{inv.publicaciones} publicaciones</span>
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
