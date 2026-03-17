"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Users, Search, Plus, MoreHorizontal, Filter } from "lucide-react"
import Link from "next/link"

const usuarios = [
  { id: 1, nombre: "MIA. Efren Juarez Castillo", email: "efren.juarez@uthh.edu.mx", rol: "Lider C.A.", ca: "UTHH-CA-7", estado: "Activo", fechaRegistro: "15 ene 2024" },
  { id: 2, nombre: "MTI. Juvencio Mendoza Castelan", email: "juvencio.mendoza@uthh.edu.mx", rol: "Integrante", ca: "UTHH-CA-7", estado: "Activo", fechaRegistro: "15 ene 2024" },
  { id: 3, nombre: "Dra. Sandra Cruz Hernandez", email: "sandra.cruz@uthh.edu.mx", rol: "Lider C.A.", ca: "UTHH-CA-3", estado: "Activo", fechaRegistro: "20 feb 2024" },
  { id: 4, nombre: "Mtro. Carlos Vega Martinez", email: "carlos.vega@uthh.edu.mx", rol: "Director", ca: "TIC", estado: "Activo", fechaRegistro: "10 mar 2024" },
  { id: 5, nombre: "Lic. Ana Lopez Ruiz", email: "ana.lopez@uthh.edu.mx", rol: "Direccion Academica", ca: "—", estado: "Activo", fechaRegistro: "08 abr 2024" },
  { id: 6, nombre: "Ing. Roberto Garcia Perez", email: "roberto.garcia@uthh.edu.mx", rol: "Externo", ca: "—", estado: "Inactivo", fechaRegistro: "12 may 2024" },
  { id: 7, nombre: "Mtra. Elena Diaz Ortiz", email: "elena.diaz@uthh.edu.mx", rol: "Integrante", ca: "UTHH-CA-5", estado: "Activo", fechaRegistro: "25 jun 2024" },
  { id: 8, nombre: "Dr. Fernando Reyes Luna", email: "fernando.reyes@uthh.edu.mx", rol: "Lider C.A.", ca: "UTHH-CA-2", estado: "Activo", fechaRegistro: "03 jul 2024" },
]

export default function AdminUsuariosPage() {
  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Administracion</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#722F37] leading-tight">Gestion de Usuarios</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Administra los usuarios registrados en el sistema.</p>
      </div>

      {/* Toolbar */}
      <div className="bg-[#fff] border border-[#e8e4df] p-4 mb-[6px] flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-[200px] max-w-[400px]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#9a9a9a]" />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              className="w-full pl-9 pr-4 py-[0.5rem] bg-[#fdfcfa] border border-[#e8e4df] rounded-[3px] text-[0.82rem] text-[#2e2e2e] placeholder:text-[#9a9a9a] outline-none focus:border-[#c9a227] transition-colors duration-200"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-[0.5rem] border border-[#e8e4df] rounded-[3px] text-[0.78rem] font-medium text-[#6b6b6b] hover:border-[#c9a227] hover:text-[#c9a227] transition-colors duration-200">
            <Filter className="w-3.5 h-3.5" />
            Filtrar
          </button>
        </div>
        <Link
          href="#"
          className="inline-flex items-center gap-2 px-4 py-[0.5rem] bg-[#722F37] text-[#fff] rounded-[3px] text-[0.78rem] font-semibold no-underline transition-colors duration-300 hover:bg-[#c9a227]"
        >
          <Plus className="w-3.5 h-3.5" />
          Nuevo usuario
        </Link>
      </div>

      {/* Table */}
      <div className="bg-[#fff] border border-[#e8e4df] overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#e8e4df]">
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Usuario</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Rol</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">C.A.</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Estado</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3">Registro</th>
              <th className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id} className="border-b border-[#e8e4df] last:border-b-0 hover:bg-[#fdfcfa] transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#faf5e4] flex items-center justify-center shrink-0">
                      <Users className="w-[14px] h-[14px] text-[#c9a227]" />
                    </div>
                    <div>
                      <p className="text-[0.82rem] font-medium text-[#2e2e2e]">{user.nombre}</p>
                      <p className="text-[0.7rem] text-[#9a9a9a]">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-[0.78rem] text-[#6b6b6b]">{user.rol}</td>
                <td className="px-6 py-4 text-[0.78rem] text-[#6b6b6b]">{user.ca}</td>
                <td className="px-6 py-4">
                  <span className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] ${user.estado === "Activo" ? "bg-[#faf5e4] text-[#c9a227]" : "bg-[#f8f6f3] text-[#9a9a9a]"}`}>
                    {user.estado}
                  </span>
                </td>
                <td className="px-6 py-4 text-[0.78rem] text-[#9a9a9a]">{user.fechaRegistro}</td>
                <td className="px-6 py-4">
                  <button className="w-8 h-8 flex items-center justify-center rounded-[3px] hover:bg-[#faf5e4] transition-colors duration-200">
                    <MoreHorizontal className="w-4 h-4 text-[#9a9a9a]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-[0.78rem] text-[#6b6b6b]">
        <span>Mostrando 1-8 de 48 usuarios</span>
        <div className="flex items-center gap-1">
          <button className="px-3 py-1.5 border border-[#e8e4df] rounded-[3px] hover:border-[#c9a227] hover:text-[#c9a227] transition-colors duration-200">Anterior</button>
          <button className="px-3 py-1.5 bg-[#722F37] text-[#fff] rounded-[3px]">1</button>
          <button className="px-3 py-1.5 border border-[#e8e4df] rounded-[3px] hover:border-[#c9a227] hover:text-[#c9a227] transition-colors duration-200">2</button>
          <button className="px-3 py-1.5 border border-[#e8e4df] rounded-[3px] hover:border-[#c9a227] hover:text-[#c9a227] transition-colors duration-200">3</button>
          <button className="px-3 py-1.5 border border-[#e8e4df] rounded-[3px] hover:border-[#c9a227] hover:text-[#c9a227] transition-colors duration-200">Siguiente</button>
        </div>
      </div>
    </DashboardLayout>
  )
}
