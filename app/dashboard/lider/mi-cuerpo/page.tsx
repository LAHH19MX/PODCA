"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Building2, Users, BookOpen, FolderOpen, FlaskConical, Calendar, MapPin, Award } from "lucide-react"

export default function LiderMiCuerpoPage() {
  return (
    <DashboardLayout role="lider">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">UTHH-CA-7</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#691B31] leading-tight">Tecnologias de Informacion y Comunicacion</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Informacion general de tu cuerpo academico.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[6px] mb-8">
        {/* Info Principal */}
        <div className="lg:col-span-2 bg-[#fff] border border-[#e4ddd0] p-6">
          <div className="flex items-center gap-2 mb-5">
            <Building2 className="w-[14px] h-[14px] text-[#c9a227]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Informacion general</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1">Clave PRODEP</label>
              <p className="text-[0.85rem] text-[#2e2e2e] font-medium">UTHH-CA-7</p>
            </div>
            <div>
              <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1">Grado de consolidacion</label>
              <span className="text-[0.72rem] font-semibold px-2 py-0.5 rounded-[3px] bg-[#faf5e4] text-[#c9a227]">En Consolidacion</span>
            </div>
            <div>
              <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1">Programa Educativo</label>
              <p className="text-[0.85rem] text-[#2e2e2e]">Ingenieria en Tecnologias de la Informacion</p>
            </div>
            <div>
              <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1">Area de conocimiento</label>
              <p className="text-[0.85rem] text-[#2e2e2e]">Ingenieria y Tecnologia</p>
            </div>
            <div>
              <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1">LGAC</label>
              <p className="text-[0.85rem] text-[#2e2e2e]">Aplicacion de las TIC en la Region</p>
            </div>
            <div>
              <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1">Fecha de registro</label>
              <p className="text-[0.85rem] text-[#2e2e2e]">Marzo 2010</p>
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-[#e4ddd0]">
            <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-2">Descripcion / Objetivo</label>
            <p className="text-[0.82rem] text-[#6b6b6b] leading-[1.7]">
              Generar y aplicar conocimiento en el area de Tecnologias de la Informacion y Comunicacion con impacto regional, desarrollando proyectos de investigacion aplicada que contribuyan al fortalecimiento academico y al desarrollo tecnologico de la Huasteca Hidalguense.
            </p>
          </div>
        </div>

        {/* Stats Lateral */}
        <div className="flex flex-col gap-[6px]">
          <div className="bg-[#fff] border border-[#e4ddd0] p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-[#faf5e4] flex items-center justify-center rounded-[3px]"><Users className="w-[16px] h-[16px] text-[#c9a227]" /></div>
            <div><p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a]">Integrantes</p><p className="font-serif text-[1.4rem] font-bold text-[#691B31]">2</p></div>
          </div>
          <div className="bg-[#fff] border border-[#e4ddd0] p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-[#faf5e4] flex items-center justify-center rounded-[3px]"><BookOpen className="w-[16px] h-[16px] text-[#c9a227]" /></div>
            <div><p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a]">Publicaciones</p><p className="font-serif text-[1.4rem] font-bold text-[#691B31]">28</p></div>
          </div>
          <div className="bg-[#fff] border border-[#e4ddd0] p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-[#faf5e4] flex items-center justify-center rounded-[3px]"><FolderOpen className="w-[16px] h-[16px] text-[#c9a227]" /></div>
            <div><p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a]">Proyectos</p><p className="font-serif text-[1.4rem] font-bold text-[#691B31]">3</p></div>
          </div>
          <div className="bg-[#fff] border border-[#e4ddd0] p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-[#faf5e4] flex items-center justify-center rounded-[3px]"><FlaskConical className="w-[16px] h-[16px] text-[#c9a227]" /></div>
            <div><p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a]">LGAC</p><p className="font-serif text-[1.4rem] font-bold text-[#691B31]">1</p></div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[6px]">
        <div className="bg-[#fff] border border-[#e4ddd0] p-5">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#c9a227]" />
            <span className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a]">Ultimo periodo evaluado</span>
          </div>
          <p className="text-[0.85rem] font-medium text-[#2e2e2e]">Jul - Dic 2024</p>
        </div>
        <div className="bg-[#fff] border border-[#e4ddd0] p-5">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#c9a227]" />
            <span className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a]">Sede</span>
          </div>
          <p className="text-[0.85rem] font-medium text-[#2e2e2e]">UTHH - Huejutla de Reyes, Hidalgo</p>
        </div>
        <div className="bg-[#fff] border border-[#e4ddd0] p-5">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-3.5 h-3.5 text-[#c9a227]" />
            <span className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a]">Reconocimiento PRODEP</span>
          </div>
          <p className="text-[0.85rem] font-medium text-[#2e2e2e]">Vigente hasta Dic 2025</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
