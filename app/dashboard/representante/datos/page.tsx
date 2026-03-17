"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Users, Mail, GraduationCap, Building2, Search } from "lucide-react"

const miembros = [
  { nombre: "MIA. Efren Juarez Castillo", email: "efren.juarez@uthh.edu.mx", ca: "UTHH-CA-7", cargo: "Lider", grado: "Maestria en Inteligencia Artificial" },
  { nombre: "MTI. Juvencio Mendoza Castelan", email: "juvencio.mendoza@uthh.edu.mx", ca: "UTHH-CA-7", cargo: "Integrante", grado: "Maestria en Tecnologias de la Informacion" },
  { nombre: "Dr. Carlos Vega Martinez", email: "carlos.vega@uthh.edu.mx", ca: "UTHH-CA-2", cargo: "Lider", grado: "Doctorado en Ciencias Computacionales" },
  { nombre: "Mtra. Ana Lopez Ruiz", email: "ana.lopez@uthh.edu.mx", ca: "UTHH-CA-2", cargo: "Integrante", grado: "Maestria en Bases de Datos" },
  { nombre: "Dra. Sandra Cruz Hernandez", email: "sandra.cruz@uthh.edu.mx", ca: "UTHH-CA-3", cargo: "Lider", grado: "Doctorado en Administracion" },
  { nombre: "Mtro. Pedro Hernandez Flores", email: "pedro.hernandez@uthh.edu.mx", ca: "UTHH-CA-3", cargo: "Integrante", grado: "Maestria en Gestion Empresarial" },
]

export default function RepresentanteDatosPage() {
  return (
    <DashboardLayout role="representante">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Representante institucional</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#691B31] leading-tight">Datos Generales</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Informacion de todos los miembros de los cuerpos academicos.</p>
      </div>

      <div className="bg-[#fff] border border-[#e4ddd0] p-4 mb-[6px]">
        <div className="relative max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#9a9a9a]" />
          <input type="text" placeholder="Buscar miembro..." className="w-full pl-9 pr-4 py-[0.5rem] bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.82rem] text-[#2e2e2e] placeholder:text-[#9a9a9a] outline-none focus:border-[#c9a227] transition-colors duration-200" />
        </div>
      </div>

      <div className="bg-[#fff] border border-[#e4ddd0] overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#e4ddd0]">
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Nombre</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Correo</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">C.A.</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Cargo</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Grado</th>
            </tr>
          </thead>
          <tbody>
            {miembros.map((m, i) => (
              <tr key={i} className="border-b border-[#e4ddd0] last:border-b-0 hover:bg-[#f7f4ee] transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#faf5e4] flex items-center justify-center shrink-0"><Users className="w-[12px] h-[12px] text-[#c9a227]" /></div>
                    <span className="text-[0.82rem] font-medium text-[#2e2e2e]">{m.nombre}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[0.78rem] text-[#6b6b6b]">{m.email}</td>
                <td className="px-6 py-4"><span className="text-[0.68rem] font-bold tracking-[0.1em] text-[#c9a227] bg-[rgba(0,0,0,0.85)] px-1.5 py-0.5 rounded-[2px]">{m.ca}</span></td>
                <td className="px-6 py-4"><span className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] ${m.cargo === "Lider" ? "bg-[#691B31] text-[#fff]" : "bg-[#faf5e4] text-[#c9a227]"}`}>{m.cargo}</span></td>
                <td className="px-6 py-4 text-[0.78rem] text-[#6b6b6b]">{m.grado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
