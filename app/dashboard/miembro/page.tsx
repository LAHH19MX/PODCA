"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { BookOpen, FileText, Upload, UserCog, Users, Building2, FolderOpen } from "lucide-react"
import Link from "next/link"

const publicacionesRecientes = [
  { titulo: "IA en Entornos Educativos Rurales de la Huasteca", tipo: "Articulo", autor: "E. Juarez, J. Mendoza", fecha: "12 ene 2025", estado: "Publicado" },
  { titulo: "Portal Digital de Cuerpos Academicos de la UTHH", tipo: "Proyecto", autor: "J. Mendoza", fecha: "08 ene 2025", estado: "En revision" },
  { titulo: "Generador de Horarios con Algoritmos Evolutivos", tipo: "Articulo", autor: "E. Juarez", fecha: "20 dic 2024", estado: "Publicado" },
  { titulo: "Trajes Representativos de la Huasteca Hidalguense", tipo: "Libro", autor: "J. Mendoza, S. San Vicente", fecha: "15 nov 2024", estado: "Publicado" },
]

const miProduccion = [
  { titulo: "Portal Digital de Cuerpos Academicos", tipo: "Memoria de residencia", fecha: "08 ene 2025", estado: "En revision" },
  { titulo: "Trajes Representativos de la Huasteca Hidalguense", tipo: "Libro", fecha: "15 nov 2024", estado: "Publicado" },
  { titulo: "Software Multimedia: Dilo Con Senas", tipo: "Proyecto", fecha: "01 sep 2024", estado: "Publicado" },
]

export default function MiembroDashboard() {
  return (
    <DashboardLayout role="miembro">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Miembro del Cuerpo Academico UTHH-CA-7</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#722F37] leading-tight">Bienvenido, MTI. Juvencio Mendoza</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Tecnologias de Informacion y Comunicacion</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[6px] mb-8">
        <StatCard icon={BookOpen} label="Mis publicaciones" value="13" sub="3 este periodo" />
        <StatCard icon={FileText} label="Produccion academica" value="3" sub="1 en revision" />
        <StatCard icon={FolderOpen} label="Proyectos" value="2" sub="En los que participo" />
        <StatCard icon={Users} label="Mi C.A." value="2" sub="Miembros activos" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[6px] mb-8">
        {/* My Production */}
        <div className="bg-[#fff] border border-[#e8e4df] p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Upload className="w-[14px] h-[14px] text-[#c9a227]" />
              <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Mi produccion academica</h3>
            </div>
            <Link href="/dashboard/miembro/produccion" className="text-[0.72rem] font-semibold text-[#c9a227] no-underline hover:text-[#722F37] transition-colors duration-300">
              Ver toda
            </Link>
          </div>
          <div className="flex flex-col">
            {miProduccion.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#e8e4df] last:border-b-0">
                <div>
                  <p className="text-[0.82rem] font-medium text-[#2e2e2e]">{item.titulo}</p>
                  <p className="text-[0.7rem] text-[#9a9a9a]">{item.tipo} · {item.fecha}</p>
                </div>
                <span className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] ${item.estado === "Publicado" ? "bg-[#722F37] text-[#fff]" : "bg-[#faf5e4] text-[#c9a227]"}`}>
                  {item.estado}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Publications */}
        <div className="bg-[#fff] border border-[#e8e4df] p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <BookOpen className="w-[14px] h-[14px] text-[#c9a227]" />
              <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Publicaciones del C.A.</h3>
            </div>
            <Link href="/dashboard/miembro/publicaciones" className="text-[0.72rem] font-semibold text-[#c9a227] no-underline hover:text-[#722F37] transition-colors duration-300">
              Ver todas
            </Link>
          </div>
          <div className="flex flex-col">
            {publicacionesRecientes.map((pub, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#e8e4df] last:border-b-0">
                <div>
                  <p className="text-[0.82rem] font-medium text-[#2e2e2e]">{pub.titulo}</p>
                  <p className="text-[0.7rem] text-[#9a9a9a]">{pub.tipo} · {pub.autor}</p>
                </div>
                <span className="text-[0.7rem] text-[#9a9a9a] shrink-0">{pub.fecha}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#fff] border border-[#e8e4df] p-6">
        <div className="flex items-center gap-2 mb-5">
          <Building2 className="w-[14px] h-[14px] text-[#c9a227]" />
          <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Acciones rapidas</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Subir produccion", href: "/dashboard/miembro/produccion", icon: Upload },
            { label: "Ver publicaciones", href: "/dashboard/miembro/publicaciones", icon: BookOpen },
            { label: "Editar perfil", href: "/dashboard/miembro/perfil", icon: UserCog },
            { label: "Contactar C.A.", href: "/dashboard/miembro/contactar", icon: Users },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 p-4 border border-[#e8e4df] rounded-[3px] no-underline text-[#2e2e2e] transition-all duration-300 hover:border-[#c9a227] hover:shadow-[0_2px_12px_rgba(183,140,51,0.1)]"
            >
              <action.icon className="w-[16px] h-[16px] text-[#c9a227] shrink-0" />
              <span className="text-[0.82rem] font-medium">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
