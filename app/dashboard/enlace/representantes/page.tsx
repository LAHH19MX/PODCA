"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { UserCheck, Plus, X, Save } from "lucide-react"
import { useEffect, useState } from "react"

type Representante = {
  id: number; claveCA: string; noTrabajador: string; nombre: string
  claveDpto: string; departamento: string; clavePerfil: number; perfil: string
}
type Perfil = { intClvPerfilPROMEP: number; vchNombrePerfil: string }
type Carrera = { Clave: string; Carrera: string }
type Docente = Record<string, string>

export default function RepresentantesPage() {
  const [lista, setLista] = useState<Representante[]>([])
  const [perfiles, setPerfiles] = useState<Perfil[]>([])
  const [carreras, setCarreras] = useState<Carrera[]>([])
  const [docentes, setDocentes] = useState<Docente[]>([])
  const [modo, setModo] = useState<"nuevo" | "editar" | null>(null)
  const [seleccionado, setSeleccionado] = useState<Representante | null>(null)
  const [form, setForm] = useState({ claveTrab: "", perfil: "", carrera: "" })
  const [msg, setMsg] = useState("")
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => { cargarDatos() }, [])

  async function cargarDatos() {
    try {
      const [repRes, carrRes] = await Promise.all([
        fetch("/api/enlace/representantes").then(r => r.json()),
        fetch("/api/enlace/representantes/carreras").then(r => r.json()),
      ])
      if (repRes.success) { setLista(repRes.data); setPerfiles(repRes.catalogos.perfiles) }
      else setError("Error al cargar representantes")
      if (carrRes.success && carrRes.data.length > 0) {
        setCarreras(carrRes.data)
        await cargarDocentes(carrRes.data[0].Clave)
      }
    } catch {
      setError("Error de conexión al cargar datos")
    }
  }

  async function cargarDocentes(clave: string) {
    try {
      const r = await fetch(`/api/enlace/representantes/docentes?clave=${encodeURIComponent(clave)}`).then(r => r.json())
      if (r.success) setDocentes(r.data)
    } catch {
      // silently fail — docentes optional for display
    }
  }

  function seleccionarParaEditar(rep: Representante) {
    setSeleccionado(rep)
    setForm({ claveTrab: rep.noTrabajador, perfil: String(rep.clavePerfil), carrera: rep.claveDpto })
    setModo("editar")
    cargarDocentes(rep.claveDpto)
    setMsg("")
  }

  function nuevoFormulario() {
    setSeleccionado(null)
    const primeraCarrera = carreras[0]?.Clave ?? ""
    const primerDocente = docentes[0] ? Object.values(docentes[0])[0] : ""
    const primerPerfil = String(perfiles[0]?.intClvPerfilPROMEP ?? "")
    setForm({ claveTrab: primerDocente, perfil: primerPerfil, carrera: primeraCarrera })
    setModo("nuevo")
    setMsg("")
  }

  async function guardar() {
    setGuardando(true); setMsg("")
    const esEdicion = modo === "editar"
    const body = esEdicion
      ? { ...form, id: seleccionado!.id, noTrabajadorAnterior: seleccionado!.noTrabajador }
      : form
    try {
      const r = await fetch("/api/enlace/representantes", {
        method: esEdicion ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(r => r.json())
      if (r.success) { setMsg("Guardado correctamente."); setModo(null); cargarDatos() }
      else setMsg(r.error ?? "Error al guardar")
    } catch {
      setMsg("Error de conexión")
    }
    setGuardando(false)
  }

  // Determinar las keys del objeto docente dinámicamente
  const docenteKeyId = docentes[0] ? Object.keys(docentes[0])[0] : ""
  const docenteKeyNombre = docentes[0]
    ? Object.keys(docentes[0]).find(k => k.toLowerCase().includes("nombre")) ?? Object.keys(docentes[0])[1] ?? ""
    : ""

  return (
    <DashboardLayout role="enlace">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Enlace Académico</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#722F37] leading-tight">Representantes de C.A.</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Gestiona quién es representante en cada cuerpo académico.</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-[0.82rem] text-red-600">{error}</div>
      )}

      <div className="flex justify-between items-center mb-4">
        <p className="text-[0.82rem] text-[#6b6b6b]">{lista.length} representantes registrados</p>
        <button
          onClick={nuevoFormulario}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#722F37] text-white rounded-[3px] text-[0.78rem] font-semibold hover:bg-[#c9a227] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Nuevo representante
        </button>
      </div>

      {/* Formulario */}
      {modo && (
        <div className="bg-[#fff] border border-[#c9a227] p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[0.82rem] font-semibold text-[#722F37]">
              {modo === "nuevo" ? "Registrar representante" : "Actualizar representante"}
            </h3>
            <button onClick={() => setModo(null)}><X className="w-4 h-4 text-[#9a9a9a]" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-[0.72rem] font-semibold text-[#6b6b6b] block mb-1">Carrera</label>
              <select
                className="w-full border border-[#e8e4df] rounded-[3px] px-3 py-2 text-[0.82rem]"
                value={form.carrera}
                onChange={(e) => {
                  setForm(f => ({ ...f, carrera: e.target.value }))
                  cargarDocentes(e.target.value)
                }}
              >
                {carreras.map(c => <option key={c.Clave} value={c.Clave}>{c.Carrera}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[0.72rem] font-semibold text-[#6b6b6b] block mb-1">Docente</label>
              <select
                className="w-full border border-[#e8e4df] rounded-[3px] px-3 py-2 text-[0.82rem]"
                value={form.claveTrab}
                onChange={(e) => setForm(f => ({ ...f, claveTrab: e.target.value }))}
              >
                {docentes.map((d, i) => (
                  <option key={i} value={d[docenteKeyId]}>{d[docenteKeyNombre]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[0.72rem] font-semibold text-[#6b6b6b] block mb-1">Perfil PROMEP</label>
              <select
                className="w-full border border-[#e8e4df] rounded-[3px] px-3 py-2 text-[0.82rem]"
                value={form.perfil}
                onChange={(e) => setForm(f => ({ ...f, perfil: e.target.value }))}
              >
                {perfiles.map(p => (
                  <option key={p.intClvPerfilPROMEP} value={p.intClvPerfilPROMEP}>{p.vchNombrePerfil}</option>
                ))}
              </select>
            </div>
          </div>
          {msg && <p className="text-[0.78rem] text-[#722F37] mb-3">{msg}</p>}
          <button
            onClick={guardar}
            disabled={guardando}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#722F37] text-white rounded-[3px] text-[0.78rem] font-semibold hover:bg-[#c9a227] transition-colors disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" /> {guardando ? "Guardando..." : "Guardar"}
          </button>
        </div>
      )}

      {/* Tabla */}
      <div className="bg-[#fff] border border-[#e8e4df] overflow-x-auto">
        <table className="w-full text-[0.82rem]">
          <thead>
            <tr className="border-b border-[#e8e4df] bg-[#fdfcfa]">
              {["Nombre", "Departamento", "Perfil PROMEP", ""].map((h, i) => (
                <th key={i} className="text-left px-4 py-3 text-[0.72rem] font-semibold text-[#9a9a9a] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lista.map((rep) => (
              <tr key={rep.id} className="border-b border-[#e8e4df] hover:bg-[#fdfcfa]">
                <td className="px-4 py-3 font-medium text-[#2e2e2e]">
                  <div>{rep.nombre}</div>
                  <div className="text-[0.72rem] text-[#9a9a9a]">{rep.noTrabajador}</div>
                </td>
                <td className="px-4 py-3 text-[#6b6b6b]">{rep.departamento}</td>
                <td className="px-4 py-3 text-[#6b6b6b]">{rep.perfil}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => seleccionarParaEditar(rep)}
                    className="text-[0.72rem] font-semibold text-[#c9a227] hover:text-[#722F37]"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
            {lista.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-12 text-[#9a9a9a] text-[0.82rem]">
                  <UserCheck className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  No hay representantes registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
