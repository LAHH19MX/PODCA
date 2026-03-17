"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Bell, CheckCircle, Clock, AlertTriangle, BookOpen, Building2, Users } from "lucide-react"

const notificaciones = [
  { tipo: "publicacion", titulo: "Nueva publicacion pendiente de revision", detalle: "El C.A. UTHH-CA-7 envio un nuevo articulo: 'IA en Entornos Educativos Rurales'", tiempo: "Hace 2 horas", leida: false, icon: BookOpen },
  { tipo: "ca", titulo: "Actualizacion de grado de consolidacion", detalle: "UTHH-CA-2 solicita evaluacion para cambio a 'Consolidado'", tiempo: "Hace 5 horas", leida: false, icon: Building2 },
  { tipo: "usuario", titulo: "Nuevo integrante registrado", detalle: "Mtra. Elena Diaz se ha incorporado al C.A. UTHH-CA-5", tiempo: "Hace 1 dia", leida: true, icon: Users },
  { tipo: "sistema", titulo: "Fecha limite de reporte PRODEP", detalle: "El reporte semestral de indicadores PRODEP vence en 15 dias", tiempo: "Hace 2 dias", leida: true, icon: AlertTriangle },
  { tipo: "publicacion", titulo: "Publicacion aprobada", detalle: "'Energia Solar Fotovoltaica: Caso Huasteca' ha sido aprobada y publicada", tiempo: "Hace 3 dias", leida: true, icon: CheckCircle },
  { tipo: "ca", titulo: "Informe trimestral disponible", detalle: "El informe de produccion academica del trimestre Oct-Dic 2024 esta listo", tiempo: "Hace 5 dias", leida: true, icon: Building2 },
]

export default function DireccionNotificacionesPage() {
  return (
    <DashboardLayout role="direccion">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#b78c33] block mb-2">Direccion Academica</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#0f0f0f] leading-tight">Notificaciones</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Centro de notificaciones y alertas del sistema.</p>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <button className="px-3 py-[0.4rem] rounded-[3px] text-[0.72rem] font-semibold bg-[#0f0f0f] text-[#fff]">Todas</button>
        <button className="px-3 py-[0.4rem] rounded-[3px] text-[0.72rem] font-semibold bg-[#f0ece4] text-[#6b6b6b] hover:text-[#b78c33] transition-colors">No leidas (2)</button>
        <button className="ml-auto text-[0.75rem] font-semibold text-[#b78c33] hover:text-[#0f0f0f] transition-colors">Marcar todas como leidas</button>
      </div>

      <div className="flex flex-col gap-[2px]">
        {notificaciones.map((notif, i) => {
          const Icon = notif.icon
          return (
            <div key={i} className={`bg-[#fff] border border-[#e4ddd0] p-5 flex items-start gap-4 transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] ${!notif.leida ? "border-l-2 border-l-[#b78c33]" : ""}`}>
              <div className={`w-10 h-10 flex items-center justify-center shrink-0 rounded-[3px] ${!notif.leida ? "bg-[#f5edd8]" : "bg-[#f0ece4]"}`}>
                <Icon className={`w-[16px] h-[16px] ${!notif.leida ? "text-[#b78c33]" : "text-[#9a9a9a]"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className={`text-[0.85rem] font-medium leading-tight ${!notif.leida ? "text-[#0f0f0f]" : "text-[#2e2e2e]"}`}>{notif.titulo}</h4>
                    <p className="text-[0.78rem] text-[#6b6b6b] mt-1">{notif.detalle}</p>
                  </div>
                  {!notif.leida && <div className="w-2 h-2 rounded-full bg-[#b78c33] shrink-0 mt-1.5" />}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="w-3 h-3 text-[#9a9a9a]" />
                  <span className="text-[0.7rem] text-[#9a9a9a]">{notif.tiempo}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </DashboardLayout>
  )
}
