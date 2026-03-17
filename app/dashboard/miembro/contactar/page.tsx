"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Users, Mail, Building2, Send } from "lucide-react"
import { useState } from "react"

const cuerposAcademicos = [
  {
    clave: "UTHH-CA-7",
    nombre: "Tecnologias de Informacion y Comunicacion",
    carrera: "Ing. en TIC",
    miembros: [
      { nombre: "MIA. Efren Juarez Castillo", email: "efren.juarez@uthh.edu.mx", rol: "Lider" },
      { nombre: "MTI. Juvencio Mendoza Castelan", email: "juvencio.mendoza@uthh.edu.mx", rol: "Integrante" },
    ],
  },
  {
    clave: "UTHH-CA-2",
    nombre: "Desarrollo de Software",
    carrera: "Ing. en TIC",
    miembros: [
      { nombre: "Dr. Carlos Vega Martinez", email: "carlos.vega@uthh.edu.mx", rol: "Lider" },
      { nombre: "Mtra. Ana Lopez Ruiz", email: "ana.lopez@uthh.edu.mx", rol: "Integrante" },
    ],
  },
  {
    clave: "UTHH-CA-3",
    nombre: "Administracion y Gestion Empresarial",
    carrera: "Lic. en Administracion",
    miembros: [
      { nombre: "Dra. Sandra Cruz Hernandez", email: "sandra.cruz@uthh.edu.mx", rol: "Lider" },
      { nombre: "Mtro. Pedro Hernandez Flores", email: "pedro.hernandez@uthh.edu.mx", rol: "Integrante" },
    ],
  },
]

export default function MiembroContactarPage() {
  const [selectedCA, setSelectedCA] = useState(0)
  const [selectedMiembro, setSelectedMiembro] = useState(0)

  const ca = cuerposAcademicos[selectedCA]
  const miembro = ca.miembros[selectedMiembro]

  return (
    <DashboardLayout role="miembro">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Miembro C.A.</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#691B31] leading-tight">Contactar Cuerpos Academicos</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Envia un mensaje a miembros de otros cuerpos academicos.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[6px]">
        {/* CA List */}
        <div className="bg-[#fff] border border-[#e4ddd0] p-6">
          <div className="flex items-center gap-2 mb-5">
            <Building2 className="w-[14px] h-[14px] text-[#c9a227]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Cuerpos academicos</h3>
          </div>
          <div className="flex flex-col gap-1">
            {cuerposAcademicos.map((c, i) => (
              <button
                key={i}
                onClick={() => { setSelectedCA(i); setSelectedMiembro(0) }}
                className={`text-left p-3 rounded-[3px] transition-all duration-200 ${selectedCA === i ? "bg-[#faf5e4] border border-[#b78c33]" : "border border-transparent hover:bg-[#f7f4ee]"}`}
              >
                <span className="text-[0.68rem] font-bold tracking-[0.1em] text-[#c9a227]">{c.clave}</span>
                <p className="text-[0.82rem] font-medium text-[#2e2e2e] mt-0.5">{c.nombre}</p>
                <p className="text-[0.7rem] text-[#9a9a9a]">{c.carrera}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-[#fff] border border-[#e4ddd0] p-6">
          <div className="flex items-center gap-2 mb-5">
            <Mail className="w-[14px] h-[14px] text-[#c9a227]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Enviar mensaje</h3>
          </div>

          <div className="mb-5">
            <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-2">Destinatario</label>
            <div className="flex flex-wrap gap-2">
              {ca.miembros.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedMiembro(i)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-[3px] transition-all duration-200 text-left ${selectedMiembro === i ? "bg-[#691B31] text-[#fff]" : "bg-[#f7f4ee] border border-[#e4ddd0] text-[#2e2e2e] hover:border-[#b78c33]"}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${selectedMiembro === i ? "bg-[rgba(183,140,51,0.3)]" : "bg-[#faf5e4]"}`}>
                    <Users className={`w-3 h-3 ${selectedMiembro === i ? "text-[#c9a227]" : "text-[#c9a227]"}`} />
                  </div>
                  <div>
                    <p className="text-[0.78rem] font-medium">{m.nombre}</p>
                    <p className={`text-[0.65rem] ${selectedMiembro === i ? "text-[rgba(255,255,255,0.6)]" : "text-[#9a9a9a]"}`}>{m.rol}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 p-3 bg-[#f7f4ee] rounded-[3px]">
            <p className="text-[0.72rem] text-[#9a9a9a]">Correo del destinatario:</p>
            <p className="text-[0.85rem] font-medium text-[#2e2e2e]">{miembro.email}</p>
          </div>

          <div className="mb-4">
            <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1.5">Asunto</label>
            <input
              type="text"
              placeholder="Escribe el asunto..."
              className="w-full py-[0.6rem] px-3 bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.85rem] text-[#2e2e2e] placeholder:text-[#9a9a9a] outline-none transition-all duration-200 focus:border-[#b78c33] focus:shadow-[0_0_0_3px_rgba(183,140,51,0.15)]"
            />
          </div>

          <div className="mb-5">
            <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1.5">Mensaje</label>
            <textarea
              rows={5}
              placeholder="Escribe tu mensaje..."
              className="w-full py-[0.6rem] px-3 bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.85rem] text-[#2e2e2e] placeholder:text-[#9a9a9a] outline-none transition-all duration-200 focus:border-[#b78c33] focus:shadow-[0_0_0_3px_rgba(183,140,51,0.15)] resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button className="inline-flex items-center gap-2 px-5 py-[0.55rem] bg-[#691B31] text-[#fff] rounded-[3px] text-[0.78rem] font-semibold transition-colors duration-300 hover:bg-[#b78c33]">
              <Send className="w-3.5 h-3.5" />
              Enviar mensaje
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
