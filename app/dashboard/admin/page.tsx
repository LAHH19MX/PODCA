"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { Users, Building2, BookOpen, FileText, Settings, UserPlus, ShieldCheck, Activity } from "lucide-react"
import Link from "next/link"

const recentUsers = [
  { name: "Efren Juarez Castillo", role: "Lider C.A.", ca: "UTHH-CA-7", date: "15 ene 2025" },
  { name: "Sandra Cruz Hernandez", role: "Integrante", ca: "UTHH-CA-3", date: "12 ene 2025" },
  { name: "Carlos Vega Martinez", role: "Director", ca: "TIC", date: "10 ene 2025" },
  { name: "Ana Lopez Ruiz", role: "Externo", ca: "—", date: "08 ene 2025" },
]

const recentActivity = [
  { action: "Nuevo usuario registrado", detail: "Mtra. Elena Diaz se unio al sistema", time: "Hace 2 horas" },
  { action: "Publicacion aprobada", detail: "IA en Entornos Educativos Rurales", time: "Hace 5 horas" },
  { action: "C.A. actualizado", detail: "UTHH-CA-7 actualizo su linea de investigacion", time: "Hace 1 dia" },
  { action: "Reporte generado", detail: "Reporte trimestral de produccion academica", time: "Hace 2 dias" },
]

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Panel administrativo</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#722F37] leading-tight">Administracion del Sistema</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Vision general del sistema de cuerpos academicos de la UTHH.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[6px] mb-8">
        <StatCard icon={Users} label="Usuarios totales" value="48" sub="5 nuevos este mes" />
        <StatCard icon={Building2} label="Cuerpos academicos" value="7" sub="2 en consolidacion" />
        <StatCard icon={BookOpen} label="Publicaciones" value="124" sub="12 pendientes de revision" />
        <StatCard icon={FileText} label="Proyectos activos" value="19" sub="3 interdisciplinarios" />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[6px]">
        {/* Recent Users */}
        <div className="bg-[#fff] border border-[#e8e4df] p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <UserPlus className="w-[14px] h-[14px] text-[#c9a227]" />
              <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Usuarios recientes</h3>
            </div>
            <Link href="/dashboard/admin/usuarios" className="text-[0.72rem] font-semibold text-[#c9a227] no-underline hover:text-[#722F37] transition-colors duration-300">
              Ver todos
            </Link>
          </div>
          <div className="flex flex-col">
            {recentUsers.map((user, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[#e8e4df] last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#faf5e4] flex items-center justify-center shrink-0">
                    <Users className="w-[12px] h-[12px] text-[#c9a227]" />
                  </div>
                  <div>
                    <p className="text-[0.82rem] font-medium text-[#2e2e2e]">{user.name}</p>
                    <p className="text-[0.7rem] text-[#9a9a9a]">{user.role} · {user.ca}</p>
                  </div>
                </div>
                <span className="text-[0.7rem] text-[#9a9a9a] shrink-0">{user.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-[#fff] border border-[#e8e4df] p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Activity className="w-[14px] h-[14px] text-[#c9a227]" />
              <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Actividad reciente</h3>
            </div>
          </div>
          <div className="flex flex-col">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-3 border-b border-[#e8e4df] last:border-b-0">
                <div className="w-2 h-2 rounded-full bg-[#c9a227] mt-[6px] shrink-0" />
                <div className="flex-1">
                  <p className="text-[0.82rem] font-medium text-[#2e2e2e]">{item.action}</p>
                  <p className="text-[0.75rem] text-[#6b6b6b] mt-0.5">{item.detail}</p>
                </div>
                <span className="text-[0.68rem] text-[#9a9a9a] shrink-0 whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-[#fff] border border-[#e8e4df] p-6">
        <div className="flex items-center gap-2 mb-5">
          <ShieldCheck className="w-[14px] h-[14px] text-[#c9a227]" />
          <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Acciones rapidas</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Agregar usuario", href: "/dashboard/admin/usuarios", icon: UserPlus },
            { label: "Nuevo C.A.", href: "/dashboard/admin/cuerpos", icon: Building2 },
            { label: "Revisar publicaciones", href: "/dashboard/admin/publicaciones", icon: BookOpen },
            { label: "Configuracion", href: "/dashboard/admin/configuracion", icon: Settings },
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
