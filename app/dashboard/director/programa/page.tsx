"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { GraduationCap, Users, BookOpen, Building2, Calendar, MapPin, Award, FlaskConical } from "lucide-react"

const integrantes = [
  { nombre: "MIA. Efren Juarez Castillo", rol: "Lider CA-7", area: "Inteligencia Artificial" },
  { nombre: "MTI. Juvencio Mendoza Castelan", rol: "Integrante CA-7", area: "Tecnologias de Informacion" },
  { nombre: "Dr. Carlos Vega Martinez", rol: "Lider CA-2", area: "Sistemas Computacionales" },
  { nombre: "Mtra. Ana Lopez Ruiz", rol: "Integrante CA-2", area: "Bases de Datos" },
]

const lgac = [
  "Aplicacion de las TIC en la Region",
  "Desarrollo de Software e Innovacion Tecnologica",
]

export default function DirectorProgramaPage() {
  return (
    <DashboardLayout role="director">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#b78c33] block mb-2">Director del programa</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#0f0f0f] leading-tight">Programa Educativo: TIC</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Informacion general del programa educativo y sus recursos academicos.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[6px] mb-8">
        <div className="lg:col-span-2 bg-[#fff] border border-[#e4ddd0] p-6">
          <div className="flex items-center gap-2 mb-5">
            <GraduationCap className="w-[14px] h-[14px] text-[#b78c33]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#b78c33]">Informacion del programa</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1">Nombre del programa</label>
              <p className="text-[0.85rem] text-[#2e2e2e] font-medium">Ingenieria en Tecnologias de la Informacion</p>
            </div>
            <div>
              <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1">Clave del programa</label>
              <p className="text-[0.85rem] text-[#2e2e2e] font-medium">PE-TIC-001</p>
            </div>
            <div>
              <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1">Director</label>
              <p className="text-[0.85rem] text-[#2e2e2e]">MTI. Cesar Adrian Ortega Crespo</p>
            </div>
            <div>
              <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1">Nivel educativo</label>
              <p className="text-[0.85rem] text-[#2e2e2e]">TSU e Ingenieria</p>
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-[#e4ddd0]">
            <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-2">Descripcion</label>
            <p className="text-[0.82rem] text-[#6b6b6b] leading-[1.7]">
              El programa de Tecnologias de la Informacion y Comunicacion forma profesionistas competentes en el desarrollo de soluciones tecnologicas, contribuyendo al desarrollo productivo y social de la region Huasteca Hidalguense.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[6px]">
          <div className="bg-[#fff] border border-[#e4ddd0] p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-[#f5edd8] flex items-center justify-center rounded-[3px]"><Building2 className="w-[16px] h-[16px] text-[#b78c33]" /></div>
            <div><p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a]">Cuerpos academicos</p><p className="font-serif text-[1.4rem] font-bold text-[#0f0f0f]">2</p></div>
          </div>
          <div className="bg-[#fff] border border-[#e4ddd0] p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-[#f5edd8] flex items-center justify-center rounded-[3px]"><Users className="w-[16px] h-[16px] text-[#b78c33]" /></div>
            <div><p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a]">Investigadores</p><p className="font-serif text-[1.4rem] font-bold text-[#0f0f0f]">4</p></div>
          </div>
          <div className="bg-[#fff] border border-[#e4ddd0] p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-[#f5edd8] flex items-center justify-center rounded-[3px]"><BookOpen className="w-[16px] h-[16px] text-[#b78c33]" /></div>
            <div><p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a]">Publicaciones</p><p className="font-serif text-[1.4rem] font-bold text-[#0f0f0f]">50</p></div>
          </div>
          <div className="bg-[#fff] border border-[#e4ddd0] p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-[#f5edd8] flex items-center justify-center rounded-[3px]"><FlaskConical className="w-[16px] h-[16px] text-[#b78c33]" /></div>
            <div><p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a]">LGAC</p><p className="font-serif text-[1.4rem] font-bold text-[#0f0f0f]">2</p></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[6px]">
        <div className="bg-[#fff] border border-[#e4ddd0] p-6">
          <div className="flex items-center gap-2 mb-5">
            <Users className="w-[14px] h-[14px] text-[#b78c33]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#b78c33]">Investigadores del programa</h3>
          </div>
          <div className="flex flex-col">
            {integrantes.map((m, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#e4ddd0] last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f5edd8] flex items-center justify-center shrink-0">
                    <Users className="w-[12px] h-[12px] text-[#b78c33]" />
                  </div>
                  <div>
                    <p className="text-[0.82rem] font-medium text-[#2e2e2e]">{m.nombre}</p>
                    <p className="text-[0.7rem] text-[#9a9a9a]">{m.rol} · {m.area}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#fff] border border-[#e4ddd0] p-6">
          <div className="flex items-center gap-2 mb-5">
            <FlaskConical className="w-[14px] h-[14px] text-[#b78c33]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#b78c33]">Lineas de investigacion (LGAC)</h3>
          </div>
          <ul className="list-none">
            {lgac.map((linea, i) => (
              <li key={i} className="flex items-start gap-2 py-3 border-b border-[#e4ddd0] last:border-b-0">
                <div className="w-[5px] h-[5px] rounded-full bg-[#b78c33] mt-[7px] shrink-0" />
                <p className="text-[0.82rem] text-[#2e2e2e] leading-[1.5]">{linea}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  )
}
