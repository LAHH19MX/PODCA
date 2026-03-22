"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { FileText } from "lucide-react"
import { useEffect, useState } from "react"

type Produccion = Record<string, string | number | null>
type Cat = { value: string; label: string }

export default function ProduccionPage() {
  const [data, setData] = useState<Produccion[]>([])
  const [columnas, setColumnas] = useState<string[]>([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState("")
  const [cuerpos, setCuerpos] = useState<Cat[]>([])
  const [statusCat, setStatusCat] = useState<Cat[]>([])
  const [tiposCat, setTiposCat] = useState<Cat[]>([])

  const [filtros, setFiltros] = useState({
    ca: "", docente: "", status: "", tipo: "", fechaInicio: "", fechaFin: "",
  })

  async function cargar(f: typeof filtros) {
    setCargando(true)
    setError("")
    const params = new URLSearchParams()
    Object.entries(f).forEach(([k, v]) => { if (v) params.set(k, v) })
    try {
      const r = await fetch(`/api/enlace/produccion?${params}`).then(r => r.json())
      if (r.success) {
        setData(r.data)
        if (r.data.length > 0 && columnas.length === 0) setColumnas(Object.keys(r.data[0]))
        if (cuerpos.length === 0) {
          setCuerpos((r.catalogos?.cuerpos ?? []).map((c: any) => ({ value: c.vchClvCA, label: `${c.vchClvCA} - ${c.vchNombreCA}` })))
          setStatusCat((r.catalogos?.status ?? []).map((s: any) => ({ value: String(s.intClvStatus), label: s.vchNombreStatus })))
          setTiposCat((r.catalogos?.tipos ?? []).map((t: any) => ({ value: String(t.intClvProducto), label: t.vchNombreProducto })))
        }
      } else {
        setError(r.error ?? "Error al cargar producción")
      }
    } catch {
      setError("Error de conexión")
    }
    setCargando(false)
  }

  useEffect(() => {
    cargar(filtros)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function actualizar(campo: string, valor: string) {
    const nuevos = { ...filtros, [campo]: valor }
    setFiltros(nuevos)
    void cargar(nuevos)
  }

  return (
    <DashboardLayout role="enlace">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Enlace Académico</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#722F37] leading-tight">Visor de Producción Académica</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Consulta y filtra la producción académica de todos los C.A.</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-[0.82rem] text-red-600">{error}</div>
      )}

      {/* Filtros */}
      <div className="bg-[#fff] border border-[#e8e4df] p-5 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div>
            <label className="text-[0.72rem] font-semibold text-[#6b6b6b] block mb-1">Cuerpo Académico</label>
            <select
              className="w-full border border-[#e8e4df] rounded-[3px] px-3 py-2 text-[0.82rem]"
              value={filtros.ca}
              onChange={e => actualizar("ca", e.target.value)}
            >
              <option value="">Todos</option>
              {cuerpos.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[0.72rem] font-semibold text-[#6b6b6b] block mb-1">No. Trabajador</label>
            <input
              type="text"
              placeholder="Clave docente..."
              value={filtros.docente}
              onChange={e => actualizar("docente", e.target.value)}
              className="w-full border border-[#e8e4df] rounded-[3px] px-3 py-2 text-[0.82rem] focus:outline-none focus:border-[#c9a227]"
            />
          </div>
          <div>
            <label className="text-[0.72rem] font-semibold text-[#6b6b6b] block mb-1">Status</label>
            <select
              className="w-full border border-[#e8e4df] rounded-[3px] px-3 py-2 text-[0.82rem]"
              value={filtros.status}
              onChange={e => actualizar("status", e.target.value)}
            >
              <option value="">Todos</option>
              {statusCat.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[0.72rem] font-semibold text-[#6b6b6b] block mb-1">Tipo de producto</label>
            <select
              className="w-full border border-[#e8e4df] rounded-[3px] px-3 py-2 text-[0.82rem]"
              value={filtros.tipo}
              onChange={e => actualizar("tipo", e.target.value)}
            >
              <option value="">Todos</option>
              {tiposCat.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[0.72rem] font-semibold text-[#6b6b6b] block mb-1">Fecha inicio</label>
            <input
              type="date"
              className="w-full border border-[#e8e4df] rounded-[3px] px-3 py-2 text-[0.82rem]"
              value={filtros.fechaInicio}
              onChange={e => actualizar("fechaInicio", e.target.value)}
            />
          </div>
          <div>
            <label className="text-[0.72rem] font-semibold text-[#6b6b6b] block mb-1">Fecha fin</label>
            <input
              type="date"
              className="w-full border border-[#e8e4df] rounded-[3px] px-3 py-2 text-[0.82rem]"
              value={filtros.fechaFin}
              onChange={e => actualizar("fechaFin", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Contador */}
      <p className="text-[0.82rem] text-[#6b6b6b] mb-3">
        {cargando ? "Cargando..." : `${data.length} registros encontrados`}
      </p>

      {/* Tabla con scroll horizontal */}
      <div className="bg-[#fff] border border-[#e8e4df] overflow-x-auto">
        <table className="text-[0.78rem] min-w-max w-full">
          <thead>
            <tr className="border-b border-[#e8e4df] bg-[#fdfcfa]">
              {columnas.map(col => (
                <th key={col} className="text-left px-3 py-2 text-[0.65rem] font-semibold text-[#9a9a9a] uppercase tracking-wider whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-[#e8e4df] hover:bg-[#fdfcfa]">
                {columnas.map(col => (
                  <td key={col} className="px-3 py-2 text-[#2e2e2e] whitespace-nowrap max-w-[200px] truncate">
                    {row[col] != null ? String(row[col]) : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {!cargando && data.length === 0 && !error && (
          <div className="text-center py-12 text-[#9a9a9a] text-[0.82rem]">
            <FileText className="w-8 h-8 mx-auto mb-2 opacity-30" />
            No hay registros con los filtros actuales.
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
