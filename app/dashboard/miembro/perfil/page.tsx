"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { UserCog, Mail, GraduationCap, Building2, BookOpen, Award, Save } from "lucide-react"

export default function MiembroPerfilPage() {
  return (
    <DashboardLayout role="miembro">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Miembro C.A.</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#691B31] leading-tight">Mi Perfil</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Actualiza tu informacion personal y academica.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[6px]">
        <div className="bg-[#fff] border border-[#e4ddd0] p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-[#faf5e4] flex items-center justify-center mb-4">
              <UserCog className="w-8 h-8 text-[#c9a227]" />
            </div>
            <h3 className="font-serif text-[1.1rem] font-semibold text-[#691B31]">MTI. Juvencio Mendoza Castelan</h3>
            <span className="text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] bg-[#faf5e4] text-[#c9a227] mt-2">Integrante</span>
          </div>
          <div className="flex flex-col gap-3 pt-4 border-t border-[#e4ddd0]">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#c9a227]" />
              <span className="text-[0.78rem] text-[#6b6b6b]">juvencio.mendoza@uthh.edu.mx</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-[#c9a227]" />
              <span className="text-[0.78rem] text-[#6b6b6b]">UTHH-CA-7 · TIC</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-[#c9a227]" />
              <span className="text-[0.78rem] text-[#6b6b6b]">Maestria en Tecnologias de la Informacion</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-[#c9a227]" />
              <span className="text-[0.78rem] text-[#6b6b6b]">13 publicaciones</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-[#c9a227]" />
              <span className="text-[0.78rem] text-[#6b6b6b]">PRODEP vigente</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#fff] border border-[#e4ddd0] p-6">
          <div className="flex items-center gap-2 mb-6">
            <UserCog className="w-[14px] h-[14px] text-[#c9a227]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Editar informacion</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: "Nombre completo", value: "Juvencio Mendoza Castelan", type: "text" },
              { label: "Correo electronico", value: "juvencio.mendoza@uthh.edu.mx", type: "email" },
              { label: "Grado academico", value: "Maestria en Tecnologias de la Informacion", type: "text" },
              { label: "Numero de trabajador", value: "UTC-0046", type: "text" },
              { label: "Telefono", value: "789-896-2088", type: "tel" },
              { label: "Perfil PRODEP", value: "Vigente", type: "text" },
              { label: "ORCID", value: "0000-0003-5678-1234", type: "text" },
              { label: "Especialidad", value: "Cultura y Tecnologia", type: "text" },
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
            <button className="inline-flex items-center gap-2 px-5 py-[0.55rem] bg-[#691B31] text-[#fff] rounded-[3px] text-[0.78rem] font-semibold transition-colors duration-300 hover:bg-[#b78c33]">
              <Save className="w-3.5 h-3.5" />
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
