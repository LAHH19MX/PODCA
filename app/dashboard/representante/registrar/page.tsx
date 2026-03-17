"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { UserCheck, Plus, Building2, Mail, Users } from "lucide-react"

const representantes = [
  { nombre: "MIA. Efren Juarez Castillo", ca: "UTHH-CA-7", caName: "Tecnologias de Informacion y Comunicacion", email: "efren.juarez@uthh.edu.mx", estado: "Activo" },
  { nombre: "Dr. Carlos Vega Martinez", ca: "UTHH-CA-2", caName: "Desarrollo de Software", email: "carlos.vega@uthh.edu.mx", estado: "Activo" },
  { nombre: "Dra. Sandra Cruz Hernandez", ca: "UTHH-CA-3", caName: "Administracion y Gestion Empresarial", email: "sandra.cruz@uthh.edu.mx", estado: "Activo" },
  { nombre: "Ing. Marco Reyes Lopez", ca: "UTHH-CA-4", caName: "Procesos Industriales y Mecatronica", email: "marco.reyes@uthh.edu.mx", estado: "Activo" },
  { nombre: "Mtra. Elena Diaz Torres", ca: "UTHH-CA-5", caName: "Matematicas Aplicadas", email: "elena.diaz@uthh.edu.mx", estado: "Activo" },
  { nombre: "Mtra. Laura Gutierrez Pena", ca: "UTHH-CA-6", caName: "Energias Renovables y Medio Ambiente", email: "laura.gutierrez@uthh.edu.mx", estado: "Activo" },
  { nombre: "Dr. Roberto Perez Sanchez", ca: "UTHH-CA-1", caName: "Tecnologias Aplicadas a la Salud", email: "roberto.perez@uthh.edu.mx", estado: "Activo" },
]

export default function RepresentanteRegistrarPage() {
  return (
    <DashboardLayout role="representante">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Representante institucional</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#691B31] leading-tight">Registrar Representantes</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Gestiona los lideres y representantes de cada cuerpo academico.</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-[0.82rem] text-[#6b6b6b]">{representantes.length} representantes registrados</p>
        <button className="inline-flex items-center gap-2 px-4 py-[0.5rem] bg-[#691B31] text-[#fff] rounded-[3px] text-[0.78rem] font-semibold transition-colors duration-300 hover:bg-[#c9a227]">
          <Plus className="w-3.5 h-3.5" />
          Registrar representante
        </button>
      </div>

      <div className="flex flex-col gap-[6px]">
        {representantes.map((rep, i) => (
          <div key={i} className="bg-[#fff] border border-[#e4ddd0] p-5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#faf5e4] flex items-center justify-center shrink-0">
                  <UserCheck className="w-5 h-5 text-[#c9a227]" />
                </div>
                <div>
                  <h3 className="text-[0.9rem] font-semibold text-[#691B31]">{rep.nombre}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[0.68rem] font-bold tracking-[0.1em] text-[#c9a227] bg-[rgba(0,0,0,0.85)] px-1.5 py-0.5 rounded-[2px]">{rep.ca}</span>
                    <span className="text-[0.75rem] text-[#6b6b6b]">{rep.caName}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Mail className="w-3 h-3 text-[#9a9a9a]" />
                    <span className="text-[0.75rem] text-[#6b6b6b]">{rep.email}</span>
                  </div>
                </div>
              </div>
              <span className="text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] bg-[#faf5e4] text-[#c9a227]">{rep.estado}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
