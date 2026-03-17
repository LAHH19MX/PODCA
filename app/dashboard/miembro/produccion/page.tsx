"use client"

import { useState, useEffect, useRef } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  Upload, Plus, FileText, Calendar, Loader2,
  Pencil, Trash2, X, Save, CheckCircle, XCircle,
  Download, Eye, AlertTriangle
} from "lucide-react"

interface Produccion {
  id: number
  fechaRegistro: string
  clvProducto: number
  tipoProducto: string
  titulo: string
  descripcion: string
  impacto: string
  clvLinea: number
  lineaInvestigacion: string
  idStatus: number
  status: string
  perteneceCA: boolean
  autores: string
  colaboradores: string
  clvCA1: string
  nombreCA1: string | null
  clvCA2: string
  nombreCA2: string | null
  clvCA3: string
  nombreCA3: string | null
  caExterno: string
  nombreColaboradorExt: string
  archivo: string
}

interface Catalogo { intClvProducto: number; vchNombreProducto: string }
interface CatStatus { intClvStatus: number; vchNombreStatus: string }
interface CatLinea { intClaveLinea: number; vchDescripcion: string }
interface CatCA { vchClvCA: string; vchNombreCA: string }

const FORM_VACIO = {
  clvProducto: "",
  titulo: "",
  descripcion: "",
  impacto: "",
  clvLinea: "",
  clvStatus: "",
  perteneceCA: "0",
  autores: "",
  colaboradores: "",
  clvCA1: "Ninguno",
  clvCA2: "Ninguno",
  clvCA3: "Ninguno",
  caExterno: "",
  nombreColaboradorExt: "",
}

function formatFecha(iso: string): string {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" })
}

export default function MiembroProduccionPage() {
  const [producciones, setProducciones] = useState<Produccion[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<"crear" | "editar" | "eliminar" | "ver" | null>(null)
  const [seleccionada, setSeleccionada] = useState<Produccion | null>(null)
  const [form, setForm] = useState({ ...FORM_VACIO })
  const [archivo, setArchivo] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [mensaje, setMensaje] = useState<{ tipo: "ok" | "error"; texto: string } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  // Catálogos
  const [productos, setProductos] = useState<Catalogo[]>([])
  const [statusCat, setStatusCat] = useState<CatStatus[]>([])
  const [lineas, setLineas] = useState<CatLinea[]>([])
  const [cuerpos, setCuerpos] = useState<CatCA[]>([])

  useEffect(() => {
    Promise.all([
      fetch("/api/miembro/produccion").then(r => r.json()),
      fetch("/api/miembro/catalogos").then(r => r.json()),
    ]).then(([prodRes, catRes]) => {
      if (prodRes.success) setProducciones(prodRes.data)
      if (catRes.success) {
        setProductos(catRes.data.productos)
        setStatusCat(catRes.data.status)
        setLineas(catRes.data.lineas)
        setCuerpos(catRes.data.cuerpos)
      }
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const abrirCrear = () => {
    setForm({ ...FORM_VACIO })
    setArchivo(null)
    setMensaje(null)
    setSeleccionada(null)
    setModal("crear")
  }

  const abrirEditar = (p: Produccion) => {
    setSeleccionada(p)
    setForm({
      clvProducto: String(p.clvProducto),
      titulo: p.titulo,
      descripcion: p.descripcion,
      impacto: p.impacto,
      clvLinea: String(p.clvLinea),
      clvStatus: String(p.idStatus),
      perteneceCA: p.perteneceCA ? "1" : "0",
      autores: p.autores,
      colaboradores: p.colaboradores ?? "",
      clvCA1: p.clvCA1 ?? "Ninguno",
      clvCA2: p.clvCA2 ?? "Ninguno",
      clvCA3: p.clvCA3 ?? "Ninguno",
      caExterno: p.caExterno ?? "",
      nombreColaboradorExt: p.nombreColaboradorExt ?? "",
    })
    setArchivo(null)
    setMensaje(null)
    setModal("editar")
  }

  const handleGuardar = async () => {
    setSaving(true)
    setMensaje(null)

    try {
      let nombreArchivo = seleccionada?.archivo ?? ""

      // Subir archivo si se seleccionó uno nuevo
      if (archivo) {
        const fd = new FormData()
        fd.append("archivo", archivo)
        const upRes = await fetch("/api/miembro/produccion/archivo", {
          method: "POST",
          body: fd,
        })
        const upData = await upRes.json()
        if (upData.success) {
          nombreArchivo = upData.nombreArchivo
        } else {
          setMensaje({ tipo: "error", texto: "Error al subir el archivo." })
          setSaving(false)
          return
        }
      }

      const esCrear = modal === "crear"
      const res = await fetch("/api/miembro/produccion", {
        method: esCrear ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(esCrear ? {} : { id: seleccionada?.id }),
          clvProducto: form.clvProducto,
          titulo: form.titulo,
          descripcion: form.descripcion,
          impacto: form.impacto,
          clvLinea: form.clvLinea,
          clvStatus: form.clvStatus,
          perteneceCA: form.perteneceCA,
          autores: form.autores,
          colaboradores: form.colaboradores,
          clvCA1: form.clvCA1,
          clvCA2: form.clvCA2,
          clvCA3: form.clvCA3,
          caExterno: form.caExterno,
          nombreColaboradorExt: form.nombreColaboradorExt,
          archivo: nombreArchivo,
        }),
      })
      const data = await res.json()
      if (data.success) {
        // Recargar lista
        const prodRes = await fetch("/api/miembro/produccion").then(r => r.json())
        if (prodRes.success) setProducciones(prodRes.data)
        setMensaje({ tipo: "ok", texto: esCrear ? "Producción registrada." : "Producción actualizada." })
        setTimeout(() => setModal(null), 1200)
      } else {
        setMensaje({ tipo: "error", texto: "Ocurrió un error al guardar." })
      }
    } catch {
      setMensaje({ tipo: "error", texto: "Error de conexión." })
    } finally {
      setSaving(false)
    }
  }

  const handleEliminar = async () => {
    if (!seleccionada) return
    setSaving(true)
    try {
      const res = await fetch(`/api/miembro/produccion?id=${seleccionada.id}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (data.success) {
        setProducciones(prev => prev.filter(p => p.id !== seleccionada.id))
        setModal(null)
      } else {
        setMensaje({ tipo: "error", texto: "Error al eliminar." })
      }
    } catch {
      setMensaje({ tipo: "error", texto: "Error de conexión." })
    } finally {
      setSaving(false)
    }
  }

  const campo = (label: string, children: React.ReactNode) => (
    <div>
      <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1.5">
        {label}
      </label>
      {children}
    </div>
  )

  const inputCls = "w-full py-[0.6rem] px-3 bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.85rem] text-[#2e2e2e] outline-none transition-all duration-200 focus:border-[#b78c33] focus:shadow-[0_0_0_3px_rgba(183,140,51,0.15)]"
  const selectCls = inputCls + " appearance-none"
  const textareaCls = inputCls + " resize-none"

  return (
    <DashboardLayout role="miembro">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">
          Miembro C.A.
        </span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#691B31] leading-tight">
          Mi Producción Académica
        </h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">
          Registra y gestiona tu producción académica.
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-[0.82rem] text-[#6b6b6b]">
          {loading ? "..." : `${producciones.length} registros`}
        </p>
        <button
          onClick={abrirCrear}
          className="inline-flex items-center gap-2 px-4 py-[0.5rem] bg-[#691B31] text-[#fff] rounded-[3px] text-[0.78rem] font-semibold transition-colors duration-300 hover:bg-[#b78c33]"
        >
          <Plus className="w-3.5 h-3.5" />
          Subir producción
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-6 h-6 text-[#c9a227] animate-spin" />
        </div>
      )}

      {/* Sin registros */}
      {!loading && producciones.length === 0 && (
        <div className="bg-[#fff] border border-[#e4ddd0] p-12 text-center">
          <Upload className="w-8 h-8 text-[#e4ddd0] mx-auto mb-3" />
          <p className="text-[0.85rem] text-[#9a9a9a]">No tienes producción registrada aún.</p>
        </div>
      )}

      {/* Lista */}
      {!loading && (
        <div className="flex flex-col gap-[6px]">
          {producciones.map((item) => (
            <div
              key={item.id}
              className="bg-[#fff] border border-[#e4ddd0] p-6 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-2 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#faf5e4] flex items-center justify-center rounded-[3px] shrink-0">
                    <FileText className="w-[16px] h-[16px] text-[#c9a227]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-[1rem] font-semibold text-[#691B31]">
                      {item.titulo}
                    </h3>
                    <p className="text-[0.75rem] text-[#9a9a9a] mt-0.5">{item.tipoProducto}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] ${
                    item.status === "TERMINADO"
                      ? "bg-[#691B31] text-white"
                      : "bg-[#faf5e4] text-[#c9a227]"
                  }`}>
                    {item.status}
                  </span>
                  <button
                    onClick={() => { setSeleccionada(item); setModal("ver") }}
                    className="w-7 h-7 flex items-center justify-center rounded-[3px] bg-[#f7f4ee] hover:bg-[#faf5e4] transition-colors"
                    title="Ver detalle"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#c9a227]" />
                  </button>
                  <button
                    onClick={() => abrirEditar(item)}
                    className="w-7 h-7 flex items-center justify-center rounded-[3px] bg-[#f7f4ee] hover:bg-[#faf5e4] transition-colors"
                    title="Editar"
                  >
                    <Pencil className="w-3.5 h-3.5 text-[#6b6b6b]" />
                  </button>
                  <button
                    onClick={() => { setSeleccionada(item); setMensaje(null); setModal("eliminar") }}
                    className="w-7 h-7 flex items-center justify-center rounded-[3px] bg-[#fff0f0] hover:bg-[#ffe0e0] transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  </button>
                </div>
              </div>
              <p className="text-[0.82rem] text-[#6b6b6b] leading-[1.6] mb-3 ml-[52px] line-clamp-2">
                {item.descripcion}
              </p>
              <div className="flex items-center gap-4 ml-[52px] flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#9a9a9a]" />
                  <span className="text-[0.75rem] text-[#9a9a9a]">{formatFecha(item.fechaRegistro)}</span>
                </div>
                {item.archivo && (
                  <a
                    href={`/ProduccionAcademica/${item.archivo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[0.75rem] text-[#c9a227] hover:text-[#691B31] transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    Archivo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Modal Crear / Editar ─────────────────────────────────── */}
      {(modal === "crear" || modal === "editar") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.4)]">
          <div
            className="bg-[#fff] border border-[#e4ddd0] w-full max-w-[680px] max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
            onClick={e => e.stopPropagation()}
          >
            <div className="h-[3px] bg-gradient-to-r from-[#c9a227] via-[#ddb94a] to-[#c9a227]" />
            <div className="p-6">
              {/* Header modal */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Upload className="w-[14px] h-[14px] text-[#c9a227]" />
                  <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">
                    {modal === "crear" ? "Registrar producción" : "Editar producción"}
                  </h3>
                </div>
                <button
                  onClick={() => setModal(null)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-[#f7f4ee] hover:bg-[#e4ddd0] transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-[#6b6b6b]" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {campo("Tipo de producto",
                  <select value={form.clvProducto} onChange={e => setForm(f => ({ ...f, clvProducto: e.target.value }))} className={selectCls}>
                    <option value="">-- Seleccionar --</option>
                    {productos.map(p => <option key={p.intClvProducto} value={p.intClvProducto}>{p.vchNombreProducto}</option>)}
                  </select>
                )}
                {campo("Estado",
                  <select value={form.clvStatus} onChange={e => setForm(f => ({ ...f, clvStatus: e.target.value }))} className={selectCls}>
                    <option value="">-- Seleccionar --</option>
                    {statusCat.map(s => <option key={s.intClvStatus} value={s.intClvStatus}>{s.vchNombreStatus}</option>)}
                  </select>
                )}
                <div className="sm:col-span-2">
                  {campo("Título del producto",
                    <input type="text" value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))} className={inputCls} maxLength={500} />
                  )}
                </div>
                <div className="sm:col-span-2">
                  {campo("Descripción",
                    <textarea value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} rows={3} className={textareaCls} maxLength={850} />
                  )}
                </div>
                <div className="sm:col-span-2">
                  {campo("Impacto",
                    <textarea value={form.impacto} onChange={e => setForm(f => ({ ...f, impacto: e.target.value }))} rows={2} className={textareaCls} maxLength={850} />
                  )}
                </div>
                {campo("Línea de investigación",
                  <select value={form.clvLinea} onChange={e => setForm(f => ({ ...f, clvLinea: e.target.value }))} className={selectCls}>
                    <option value="">-- Seleccionar --</option>
                    {lineas.map(l => <option key={l.intClaveLinea} value={l.intClaveLinea}>{l.vchDescripcion}</option>)}
                  </select>
                )}
                {campo("¿Pertenece a un C.A.?",
                  <select value={form.perteneceCA} onChange={e => setForm(f => ({ ...f, perteneceCA: e.target.value }))} className={selectCls}>
                    <option value="0">No</option>
                    <option value="1">Sí</option>
                  </select>
                )}
                <div className="sm:col-span-2">
                  {campo("Autores",
                    <textarea value={form.autores} onChange={e => setForm(f => ({ ...f, autores: e.target.value }))} rows={2} className={textareaCls} maxLength={850} />
                  )}
                </div>
                <div className="sm:col-span-2">
                  {campo("Colaboradores",
                    <textarea value={form.colaboradores} onChange={e => setForm(f => ({ ...f, colaboradores: e.target.value }))} rows={2} className={textareaCls} maxLength={850} />
                  )}
                </div>

                {/* Red colaboración interna */}
                <div className="sm:col-span-2">
                  <p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] mb-3">
                    Red de colaboración interna
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { key: "clvCA1", label: "C.A. 1" },
                      { key: "clvCA2", label: "C.A. 2" },
                      { key: "clvCA3", label: "C.A. 3" },
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <label className="text-[0.66rem] text-[#9a9a9a] block mb-1">{label}</label>
                        <select
                          value={form[key as keyof typeof form]}
                          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                          className={selectCls}
                        >
                          <option value="Ninguno">Ninguno</option>
                          {cuerpos.map(c => <option key={c.vchClvCA} value={c.vchClvCA}>{c.vchNombreCA}</option>)}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Red colaboración externa */}
                <div className="sm:col-span-2">
                  <p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] mb-3">
                    Red de colaboración externa
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {campo("Cuerpo académico externo",
                      <input type="text" value={form.caExterno} onChange={e => setForm(f => ({ ...f, caExterno: e.target.value }))} className={inputCls} maxLength={250} />
                    )}
                    {campo("Colaborador externo",
                      <input type="text" value={form.nombreColaboradorExt} onChange={e => setForm(f => ({ ...f, nombreColaboradorExt: e.target.value }))} className={inputCls} maxLength={250} />
                    )}
                  </div>
                </div>

                {/* Archivo */}
                <div className="sm:col-span-2">
                  {campo("Archivo",
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="inline-flex items-center gap-2 px-3 py-[0.5rem] bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.78rem] font-medium text-[#6b6b6b] hover:border-[#b78c33] transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        {archivo ? archivo.name : "Seleccionar archivo"}
                      </button>
                      {modal === "editar" && seleccionada?.archivo && !archivo && (
                        <span className="text-[0.75rem] text-[#9a9a9a]">
                          Actual: {seleccionada.archivo}
                        </span>
                      )}
                      <input
                        ref={fileRef}
                        type="file"
                        accept=".doc,.docx,.xlsx,.pdf,.pptx,.jpg,.jpeg,.png,.mp4"
                        className="hidden"
                        onChange={e => setArchivo(e.target.files?.[0] ?? null)}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Feedback */}
              {mensaje && (
                <div className={`flex items-center gap-2 mt-5 p-3 rounded-[3px] text-[0.78rem] font-medium ${
                  mensaje.tipo === "ok"
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-600"
                }`}>
                  {mensaje.tipo === "ok"
                    ? <CheckCircle className="w-4 h-4 shrink-0" />
                    : <XCircle className="w-4 h-4 shrink-0" />
                  }
                  {mensaje.texto}
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setModal(null)}
                  className="px-4 py-[0.5rem] border border-[#e4ddd0] rounded-[3px] text-[0.78rem] font-medium text-[#6b6b6b] hover:bg-[#f7f4ee] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleGuardar}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-[0.5rem] bg-[#691B31] text-white rounded-[3px] text-[0.78rem] font-semibold hover:bg-[#b78c33] transition-colors disabled:opacity-70"
                >
                  {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  {saving ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Ver detalle ────────────────────────────────────── */}
      {modal === "ver" && seleccionada && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.4)]"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-[#fff] border border-[#e4ddd0] w-full max-w-[580px] max-h-[85vh] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
            onClick={e => e.stopPropagation()}
          >
            <div className="h-[3px] bg-gradient-to-r from-[#c9a227] via-[#ddb94a] to-[#c9a227]" />
            <div className="p-6">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span className="text-[0.68rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">
                    {seleccionada.tipoProducto}
                  </span>
                  <h2 className="font-serif text-[1.1rem] font-bold text-[#691B31] mt-1 leading-snug">
                    {seleccionada.titulo}
                  </h2>
                </div>
                <button
                  onClick={() => setModal(null)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-[#f7f4ee] hover:bg-[#e4ddd0] transition-colors shrink-0 ml-4"
                >
                  <X className="w-3.5 h-3.5 text-[#6b6b6b]" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {seleccionada.descripcion && (
                  <div>
                    <p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] mb-1">Descripción</p>
                    <p className="text-[0.85rem] text-[#2e2e2e] leading-relaxed">{seleccionada.descripcion}</p>
                  </div>
                )}
                {seleccionada.impacto && (
                  <div>
                    <p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] mb-1">Impacto</p>
                    <p className="text-[0.85rem] text-[#2e2e2e] leading-relaxed">{seleccionada.impacto}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] mb-1">Autores</p>
                    <p className="text-[0.82rem] text-[#2e2e2e]">{seleccionada.autores || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] mb-1">Colaboradores</p>
                    <p className="text-[0.82rem] text-[#2e2e2e]">{seleccionada.colaboradores || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] mb-1">Línea de investigación</p>
                    <p className="text-[0.82rem] text-[#2e2e2e]">{seleccionada.lineaInvestigacion}</p>
                  </div>
                  <div>
                    <p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] mb-1">Fecha</p>
                    <p className="text-[0.82rem] text-[#2e2e2e]">{formatFecha(seleccionada.fechaRegistro)}</p>
                  </div>
                  <div>
                    <p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] mb-1">Estado</p>
                    <span className={`text-[0.72rem] font-semibold px-2 py-0.5 rounded-[3px] ${
                      seleccionada.status === "TERMINADO"
                        ? "bg-[#691B31] text-white"
                        : "bg-[#faf5e4] text-[#c9a227]"
                    }`}>
                      {seleccionada.status}
                    </span>
                  </div>
                </div>
                {seleccionada.archivo && (
                  <a
                    href={`/ProduccionAcademica/${seleccionada.archivo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-[0.55rem] bg-[#691B31] text-white rounded-[3px] text-[0.78rem] font-semibold hover:bg-[#b78c33] transition-colors w-fit"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Descargar archivo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Confirmar eliminar ─────────────────────────────── */}
      {modal === "eliminar" && seleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.4)]">
          <div className="bg-[#fff] border border-[#e4ddd0] w-full max-w-[400px] shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
            <div className="h-[3px] bg-red-500" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-[0.9rem] font-semibold text-[#2e2e2e]">Eliminar producción</h3>
                  <p className="text-[0.78rem] text-[#9a9a9a]">Esta acción no se puede deshacer.</p>
                </div>
              </div>
              <p className="text-[0.82rem] text-[#6b6b6b] mb-5">
                ¿Estás seguro de eliminar <strong className="text-[#2e2e2e]">"{seleccionada.titulo}"</strong>?
              </p>
              {mensaje && (
                <div className="flex items-center gap-2 mb-4 p-3 rounded-[3px] text-[0.78rem] bg-red-50 border border-red-200 text-red-600">
                  <XCircle className="w-4 h-4 shrink-0" />
                  {mensaje.texto}
                </div>
              )}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setModal(null)}
                  className="px-4 py-[0.5rem] border border-[#e4ddd0] rounded-[3px] text-[0.78rem] font-medium text-[#6b6b6b] hover:bg-[#f7f4ee] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEliminar}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-4 py-[0.5rem] bg-red-600 text-white rounded-[3px] text-[0.78rem] font-semibold hover:bg-red-700 transition-colors disabled:opacity-70"
                >
                  {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  {saving ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}