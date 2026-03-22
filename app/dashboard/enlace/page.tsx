"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { UserCheck, Users, Eye, Upload, User } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

type Perfil = {
  nombre: string
  descripcion: string
  departamento: string
  imagen: string
}

export default function EnlaceDashboard() {
  const [perfil, setPerfil] = useState<Perfil | null>(null)
  const [subiendo, setSubiendo] = useState(false)
  const [msg, setMsg] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch("/api/enlace/perfil")
      .then((r) => r.json())
      .then((d) => { if (d.success) setPerfil(d.data); else setMsg("Error al cargar perfil") })
      .catch(() => setMsg("Error al cargar perfil"))
  }, [])

  async function subirFoto(file: File) {
    setSubiendo(true)
    setMsg("")
    const fd = new FormData()
    fd.append("imagen", file)
    const r = await fetch("/api/enlace/perfil", { method: "PUT", body: fd })
    const d = await r.json()
    if (d.success) {
      setMsg("Foto actualizada.")
      setPerfil((p) => p ? { ...p, imagen: d.imagen } : p)
    } else {
      setMsg(d.error ?? "Error al subir imagen")
    }
    setSubiendo(false)
  }

  const imgSrc = perfil?.imagen && perfil.imagen !== "sin imagen.jpg"
    ? `/ImagenPerfil/${perfil.imagen}`
    : null

  return (
    <DashboardLayout role="enlace">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Enlace Académico</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#722F37] leading-tight">Mi Perfil</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Información personal y accesos rápidos del sistema.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[6px] mb-6">
        {/* Foto y datos */}
        <div className="bg-[#fff] border border-[#e8e4df] p-6 flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full bg-[#faf5e4] flex items-center justify-center mb-4 overflow-hidden border-2 border-[#c9a227]">
            {imgSrc ? (
              <img src={imgSrc} alt="Foto de perfil" className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-[#c9a227]" />
            )}
          </div>
          <h2 className="font-serif text-[1.1rem] font-bold text-[#722F37]">{perfil?.nombre ?? "—"}</h2>
          <p className="text-[0.78rem] text-[#6b6b6b] mt-1">{perfil?.descripcion || "Enlace Académico"}</p>
          <p className="text-[0.75rem] text-[#9a9a9a] mt-0.5">{perfil?.departamento ?? ""}</p>

          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) subirFoto(f) }}
          />
          <button
            onClick={() => inputRef.current?.click()}
            disabled={subiendo}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#722F37] text-white rounded-[3px] text-[0.78rem] font-semibold hover:bg-[#c9a227] transition-colors disabled:opacity-50"
          >
            <Upload className="w-3.5 h-3.5" />
            {subiendo ? "Subiendo..." : "Cambiar foto"}
          </button>
          {msg && <p className="text-[0.75rem] mt-2 text-[#6b6b6b]">{msg}</p>}
        </div>

        {/* Acciones rápidas */}
        <div className="lg:col-span-2 bg-[#fff] border border-[#e8e4df] p-6">
          <div className="flex items-center gap-2 mb-5">
            <UserCheck className="w-[14px] h-[14px] text-[#c9a227]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Acciones rápidas</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Representantes", href: "/dashboard/enlace/representantes", icon: UserCheck },
              { label: "Datos de Miembros", href: "/dashboard/enlace/miembros", icon: Users },
              { label: "Visor de Produccion", href: "/dashboard/enlace/produccion", icon: Eye },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 p-4 border border-[#e8e4df] rounded-[3px] no-underline text-[#2e2e2e] transition-all duration-300 hover:border-[#c9a227] hover:shadow-[0_2px_12px_rgba(201,162,39,0.1)]"
              >
                <action.icon className="w-[16px] h-[16px] text-[#c9a227] shrink-0" />
                <span className="text-[0.82rem] font-medium">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
