"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Settings, Shield, Bell, Database, Globe, Save } from "lucide-react"

export default function AdminConfiguracionPage() {
  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Administracion</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#722F37] leading-tight">Configuracion del Sistema</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Ajustes generales y preferencias del sistema.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[6px]">
        {/* General */}
        <div className="bg-[#fff] border border-[#e8e4df] p-6">
          <div className="flex items-center gap-2 mb-5">
            <Globe className="w-[14px] h-[14px] text-[#c9a227]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">General</h3>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-[0.75rem] font-semibold text-[#2e2e2e] mb-1">Nombre de la institucion</label>
              <input type="text" defaultValue="Universidad Tecnologica de la Huasteca Hidalguense" className="w-full px-3 py-[0.5rem] bg-[#fdfcfa] border border-[#e8e4df] rounded-[3px] text-[0.82rem] text-[#2e2e2e] outline-none focus:border-[#c9a227] transition-colors" />
            </div>
            <div>
              <label className="block text-[0.75rem] font-semibold text-[#2e2e2e] mb-1">Siglas</label>
              <input type="text" defaultValue="UTHH" className="w-full px-3 py-[0.5rem] bg-[#fdfcfa] border border-[#e8e4df] rounded-[3px] text-[0.82rem] text-[#2e2e2e] outline-none focus:border-[#c9a227] transition-colors" />
            </div>
            <div>
              <label className="block text-[0.75rem] font-semibold text-[#2e2e2e] mb-1">Correo institucional</label>
              <input type="email" defaultValue="rectoria@uthh.edu.mx" className="w-full px-3 py-[0.5rem] bg-[#fdfcfa] border border-[#e8e4df] rounded-[3px] text-[0.82rem] text-[#2e2e2e] outline-none focus:border-[#c9a227] transition-colors" />
            </div>
            <div>
              <label className="block text-[0.75rem] font-semibold text-[#2e2e2e] mb-1">Periodo activo</label>
              <select className="w-full px-3 py-[0.5rem] bg-[#fdfcfa] border border-[#e8e4df] rounded-[3px] text-[0.82rem] text-[#2e2e2e] outline-none focus:border-[#c9a227] transition-colors">
                <option>Enero - Junio 2025</option>
                <option>Julio - Diciembre 2025</option>
              </select>
            </div>
          </div>
        </div>

        {/* Seguridad */}
        <div className="bg-[#fff] border border-[#e8e4df] p-6">
          <div className="flex items-center gap-2 mb-5">
            <Shield className="w-[14px] h-[14px] text-[#c9a227]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Seguridad</h3>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between py-3 border-b border-[#e8e4df]">
              <div>
                <p className="text-[0.82rem] font-medium text-[#2e2e2e]">Autenticacion de dos factores</p>
                <p className="text-[0.72rem] text-[#9a9a9a]">Requerir 2FA para todos los administradores</p>
              </div>
              <button className="w-11 h-6 bg-[#c9a227] rounded-full relative transition-colors">
                <span className="w-5 h-5 bg-[#fff] rounded-full absolute top-0.5 right-0.5 transition-all" />
              </button>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[#e8e4df]">
              <div>
                <p className="text-[0.82rem] font-medium text-[#2e2e2e]">Bloqueo por intentos fallidos</p>
                <p className="text-[0.72rem] text-[#9a9a9a]">Bloquear tras 5 intentos fallidos de sesion</p>
              </div>
              <button className="w-11 h-6 bg-[#c9a227] rounded-full relative transition-colors">
                <span className="w-5 h-5 bg-[#fff] rounded-full absolute top-0.5 right-0.5 transition-all" />
              </button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-[0.82rem] font-medium text-[#2e2e2e]">Registro publico</p>
                <p className="text-[0.72rem] text-[#9a9a9a]">Permitir que usuarios externos se registren</p>
              </div>
              <button className="w-11 h-6 bg-[#e8e4df] rounded-full relative transition-colors">
                <span className="w-5 h-5 bg-[#fff] rounded-full absolute top-0.5 left-0.5 transition-all" />
              </button>
            </div>
          </div>
        </div>

        {/* Notificaciones */}
        <div className="bg-[#fff] border border-[#e8e4df] p-6">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="w-[14px] h-[14px] text-[#c9a227]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Notificaciones</h3>
          </div>
          <div className="flex flex-col gap-3">
            {["Nuevas publicaciones pendientes", "Nuevos usuarios registrados", "Actualizaciones de C.A.", "Reportes generados"].map((notif) => (
              <div key={notif} className="flex items-center justify-between py-2">
                <span className="text-[0.82rem] text-[#2e2e2e]">{notif}</span>
                <button className="w-11 h-6 bg-[#c9a227] rounded-full relative transition-colors">
                  <span className="w-5 h-5 bg-[#fff] rounded-full absolute top-0.5 right-0.5 transition-all" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Base de datos */}
        <div className="bg-[#fff] border border-[#e8e4df] p-6">
          <div className="flex items-center gap-2 mb-5">
            <Database className="w-[14px] h-[14px] text-[#c9a227]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Base de datos</h3>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between py-3 border-b border-[#e8e4df]">
              <div>
                <p className="text-[0.82rem] font-medium text-[#2e2e2e]">Ultimo respaldo</p>
                <p className="text-[0.72rem] text-[#9a9a9a]">Hace 2 horas</p>
              </div>
              <span className="text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] bg-[#faf5e4] text-[#c9a227]">Automatico</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[#e8e4df]">
              <div>
                <p className="text-[0.82rem] font-medium text-[#2e2e2e]">Tamano de la BD</p>
                <p className="text-[0.72rem] text-[#9a9a9a]">245 MB de 1 GB</p>
              </div>
              <div className="w-24 h-[4px] bg-[#f8f6f3] rounded-full overflow-hidden">
                <div className="w-[25%] h-full bg-[#c9a227] rounded-full" />
              </div>
            </div>
            <button className="inline-flex items-center justify-center gap-2 px-4 py-[0.5rem] bg-[#722F37] text-[#fff] rounded-[3px] text-[0.78rem] font-semibold transition-colors duration-300 hover:bg-[#c9a227]">
              <Database className="w-3.5 h-3.5" />
              Generar respaldo manual
            </button>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="mt-6 flex justify-end">
        <button className="inline-flex items-center gap-2 px-6 py-[0.6rem] bg-[#c9a227] text-[#fff] rounded-[3px] text-[0.82rem] font-semibold transition-all duration-300 hover:bg-[#ddb94a] hover:shadow-[0_6px_18px_rgba(183,140,51,0.35)]">
          <Save className="w-4 h-4" />
          Guardar cambios
        </button>
      </div>
    </DashboardLayout>
  )
}
