"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { UserCog, Mail, Building2, Save } from "lucide-react"

export default function ExternoPerfilPage() {
  return (
    <DashboardLayout role="externo">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#b78c33] block mb-2">Acceso externo</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#0f0f0f] leading-tight">Mi Perfil</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Actualiza tu informacion personal.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[6px]">
        <div className="bg-[#fff] border border-[#e4ddd0] p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-[#f5edd8] flex items-center justify-center mb-4">
              <UserCog className="w-8 h-8 text-[#b78c33]" />
            </div>
            <h3 className="font-serif text-[1.1rem] font-semibold text-[#0f0f0f]">Usuario Externo</h3>
            <span className="text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] bg-[#f5edd8] text-[#b78c33] mt-2">Externo</span>
          </div>
          <div className="flex flex-col gap-3 pt-4 border-t border-[#e4ddd0]">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#b78c33]" />
              <span className="text-[0.78rem] text-[#6b6b6b]">usuario@correo.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-[#b78c33]" />
              <span className="text-[0.78rem] text-[#6b6b6b]">Institucion externa</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#fff] border border-[#e4ddd0] p-6">
          <div className="flex items-center gap-2 mb-6">
            <UserCog className="w-[14px] h-[14px] text-[#b78c33]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#b78c33]">Editar informacion</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: "Nombre completo", value: "Usuario Externo", type: "text" },
              { label: "Correo electronico", value: "usuario@correo.com", type: "email" },
              { label: "Institucion", value: "Universidad autonoma", type: "text" },
              { label: "Area de interes", value: "Tecnologias de la Informacion", type: "text" },
            ].map((field, i) => (
              <div key={i}>
                <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  defaultValue={field.value}
                  className="w-full py-[0.6rem] px-3 bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.85rem] text-[#2e2e2e] outline-none transition-all duration-200 focus:border-[#b78c33] focus:shadow-[0_0_0_3px_rgba(183,140,51,0.15)]"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <button className="inline-flex items-center gap-2 px-5 py-[0.55rem] bg-[#0f0f0f] text-[#fff] rounded-[3px] text-[0.78rem] font-semibold transition-colors duration-300 hover:bg-[#b78c33]">
              <Save className="w-3.5 h-3.5" />
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
