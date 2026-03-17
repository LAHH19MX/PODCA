"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { Users, BookOpen, FolderOpen, FlaskConical, FileText, Plus, UserCheck, Building2 } from "lucide-react"
import Link from "next/link"

const integrantes = [
  { nombre: "MIA. Efren Juarez Castillo", rol: "Lider", publicaciones: 15, estado: "Activo" },
  { nombre: "MTI. Juvencio Mendoza Castelan", rol: "Integrante", publicaciones: 13, estado: "Activo" },
]

const publicacionesRecientes = [
  { titulo: "IA en Entornos Educativos Rurales", tipo: "Articulo", autor: "E. Juarez", fecha: "12 ene 2025", estado: "Publicado" },
  { titulo: "Portal Digital de Cuerpos Academicos", tipo: "Proyecto", autor: "J. Mendoza", fecha: "08 ene 2025", estado: "En revision" },
  { titulo: "Generador de Horarios con Algoritmos Evolutivos", tipo: "Articulo", autor: "E. Juarez", fecha: "20 dic 2024", estado: "Publicado" },
]

const proyectos = [
  { nombre: "Generador de Horarios mediante Algoritmos Evolutivos", estado: "En progreso", avance: 75 },
  { nombre: "Portal digital de cuerpos academicos de la UTHH", estado: "En progreso", avance: 60 },
  { nombre: "Publicacion del libro: Trajes Representativos de la Huasteca Hidalguense", estado: "Completado", avance: 100 },
]

export default function LiderDashboard() {
  return (
    <DashboardLayout role="lider">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Cuerpo Academico UTHH-CA-7</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#722F37] leading-tight">Tecnologias de Informacion y Comunicacion</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Linea: Aplicacion de las TIC en la Region</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[6px] mb-8">
        <StatCard icon={Users} label="Integrantes" value="2" sub="Miembros activos" />
        <StatCard icon={BookOpen} label="Publicaciones" value="28" sub="3 este periodo" />
        <StatCard icon={FolderOpen} label="Proyectos" value="3" sub="2 en progreso" />
        <StatCard icon={FlaskConical} label="Lineas LGAC" value="1" sub="TIC en la Region" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[6px] mb-8">
        {/* Integrantes */}
        <div className="bg-[#fff] border border-[#e8e4df] p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <UserCheck className="w-[14px] h-[14px] text-[#c9a227]" />
              <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Integrantes del C.A.</h3>
            </div>
            <Link href="/dashboard/lider/integrantes" className="text-[0.72rem] font-semibold text-[#c9a227] no-underline hover:text-[#722F37] transition-colors duration-300">
              Gestionar
            </Link>
          </div>
          <div className="flex flex-col">
            {integrantes.map((miembro, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#e8e4df] last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#faf5e4] flex items-center justify-center shrink-0">
                    <Users className="w-[14px] h-[14px] text-[#c9a227]" />
                  </div>
                  <div>
                    <p className="text-[0.82rem] font-medium text-[#2e2e2e]">{miembro.nombre}</p>
                    <p className="text-[0.7rem] text-[#9a9a9a]">{miembro.rol} · {miembro.publicaciones} publicaciones</p>
                  </div>
                </div>
                <span className="text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] bg-[#faf5e4] text-[#c9a227]">{miembro.estado}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Proyectos */}
        <div className="bg-[#fff] border border-[#e8e4df] p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-[14px] h-[14px] text-[#c9a227]" />
              <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Proyectos actuales</h3>
            </div>
            <Link href="/dashboard/lider/proyectos" className="text-[0.72rem] font-semibold text-[#c9a227] no-underline hover:text-[#722F37] transition-colors duration-300">
              Ver todos
            </Link>
          </div>
          <div className="flex flex-col">
            {proyectos.map((proyecto, i) => (
              <div key={i} className="py-3 border-b border-[#e8e4df] last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[0.82rem] font-medium text-[#2e2e2e]">{proyecto.nombre}</p>
                  <span className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] ${proyecto.avance === 100 ? "bg-[#722F37] text-[#fff]" : "bg-[#faf5e4] text-[#c9a227]"}`}>
                    {proyecto.estado}
                  </span>
                </div>
                <div className="w-full h-[4px] bg-[#f8f6f3] rounded-full overflow-hidden">
                  <div className="h-full bg-[#c9a227] rounded-full transition-all duration-500" style={{ width: `${proyecto.avance}%` }} />
                </div>
                <p className="text-[0.68rem] text-[#9a9a9a] mt-1">{proyecto.avance}% completado</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Publicaciones recientes */}
      <div className="bg-[#fff] border border-[#e8e4df] p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <FileText className="w-[14px] h-[14px] text-[#c9a227]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Publicaciones recientes</h3>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/lider/publicaciones" className="inline-flex items-center gap-2 px-3 py-[0.4rem] bg-[#722F37] text-[#fff] rounded-[3px] text-[0.72rem] font-semibold no-underline transition-colors duration-300 hover:bg-[#c9a227]">
              <Plus className="w-3 h-3" />
              Nueva publicacion
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#e8e4df]">
                <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] pb-3 pr-4">Titulo</th>
                <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] pb-3 pr-4">Tipo</th>
                <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] pb-3 pr-4">Autor</th>
                <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] pb-3 pr-4">Fecha</th>
                <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] pb-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {publicacionesRecientes.map((pub, i) => (
                <tr key={i} className="border-b border-[#e8e4df] last:border-b-0">
                  <td className="py-3 pr-4 text-[0.82rem] font-medium text-[#2e2e2e]">{pub.titulo}</td>
                  <td className="py-3 pr-4 text-[0.78rem] text-[#6b6b6b]">{pub.tipo}</td>
                  <td className="py-3 pr-4 text-[0.78rem] text-[#6b6b6b]">{pub.autor}</td>
                  <td className="py-3 pr-4 text-[0.78rem] text-[#9a9a9a]">{pub.fecha}</td>
                  <td className="py-3">
                    <span className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] ${pub.estado === "Publicado" ? "bg-[#722F37] text-[#fff]" : "bg-[#faf5e4] text-[#c9a227]"}`}>
                      {pub.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
