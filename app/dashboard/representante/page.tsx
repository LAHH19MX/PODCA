"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { Building2, BookOpen, Users, FileText, UserCheck, Eye, GraduationCap, ArrowRight } from "lucide-react"
import Link from "next/link"

const caRegistrados = [
  { clave: "UTHH-CA-7", nombre: "Tecnologias de Informacion y Comunicacion", lider: "MIA. Efren Juarez Castillo", integrantes: 2, publicaciones: 28 },
  { clave: "UTHH-CA-2", nombre: "Desarrollo de Software", lider: "Dr. Carlos Vega Martinez", integrantes: 2, publicaciones: 22 },
  { clave: "UTHH-CA-3", nombre: "Administracion y Gestion Empresarial", lider: "Dra. Sandra Cruz Hernandez", integrantes: 2, publicaciones: 18 },
]

const actividadReciente = [
  { accion: "Nuevo lider registrado", detalle: "UTHH-CA-7 actualizo su representante", tiempo: "Hace 3 horas" },
  { accion: "Publicacion agregada", detalle: "IA en Entornos Educativos Rurales", tiempo: "Hace 1 dia" },
  { accion: "C.A. actualizado", detalle: "UTHH-CA-3 modifico datos generales", tiempo: "Hace 2 dias" },
  { accion: "Produccion registrada", detalle: "Nuevo articulo indexado en Scopus", tiempo: "Hace 3 dias" },
]

export default function RepresentanteDashboard() {
  return (
    <DashboardLayout role="representante">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Representante institucional</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#722F37] leading-tight">Enlace Academico</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Gestion de representantes, publicaciones y produccion academica de los C.A.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[6px] mb-8">
        <StatCard icon={Building2} label="C.A. registrados" value="7" sub="De todos los programas" />
        <StatCard icon={Users} label="Representantes" value="7" sub="Lideres de C.A." />
        <StatCard icon={BookOpen} label="Publicaciones" value="124" sub="Total registradas" />
        <StatCard icon={FileText} label="Produccion" value="38" sub="Registros este periodo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[6px] mb-8">
        {/* CA Registrados */}
        <div className="bg-[#fff] border border-[#e8e4df] p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Building2 className="w-[14px] h-[14px] text-[#c9a227]" />
              <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Cuerpos academicos</h3>
            </div>
            <Link href="/dashboard/representante/cuerpos" className="text-[0.72rem] font-semibold text-[#c9a227] no-underline hover:text-[#722F37] transition-colors duration-300">
              Ver todos
            </Link>
          </div>
          <div className="flex flex-col">
            {caRegistrados.map((ca, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#e8e4df] last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#faf5e4] flex items-center justify-center rounded-[3px] shrink-0">
                    <GraduationCap className="w-[14px] h-[14px] text-[#c9a227]" />
                  </div>
                  <div>
                    <p className="text-[0.82rem] font-medium text-[#2e2e2e]">{ca.clave} - {ca.nombre}</p>
                    <p className="text-[0.7rem] text-[#9a9a9a]">Lider: {ca.lider}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[0.82rem] font-semibold text-[#722F37]">{ca.publicaciones}</p>
                  <p className="text-[0.65rem] text-[#9a9a9a]">publicaciones</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actividad */}
        <div className="bg-[#fff] border border-[#e8e4df] p-6">
          <div className="flex items-center gap-2 mb-5">
            <Eye className="w-[14px] h-[14px] text-[#c9a227]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Actividad reciente</h3>
          </div>
          <div className="flex flex-col">
            {actividadReciente.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-3 border-b border-[#e8e4df] last:border-b-0">
                <div className="w-2 h-2 rounded-full bg-[#c9a227] mt-[6px] shrink-0" />
                <div className="flex-1">
                  <p className="text-[0.82rem] font-medium text-[#2e2e2e]">{item.accion}</p>
                  <p className="text-[0.75rem] text-[#6b6b6b] mt-0.5">{item.detalle}</p>
                </div>
                <span className="text-[0.68rem] text-[#9a9a9a] shrink-0 whitespace-nowrap">{item.tiempo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#fff] border border-[#e8e4df] p-6">
        <div className="flex items-center gap-2 mb-5">
          <UserCheck className="w-[14px] h-[14px] text-[#c9a227]" />
          <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Acciones rapidas</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Datos generales", href: "/dashboard/representante/datos", icon: Users },
            { label: "Publicaciones", href: "/dashboard/representante/publicaciones", icon: BookOpen },
            { label: "Registrar representantes", href: "/dashboard/representante/registrar", icon: UserCheck },
            { label: "Visor de produccion", href: "/dashboard/representante/produccion", icon: Eye },
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
