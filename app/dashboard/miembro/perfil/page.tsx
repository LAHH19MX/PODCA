"use client";

import { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  UserCog,
  Mail,
  Phone,
  Building2,
  BookOpen,
  Award,
  Save,
  Loader2,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  Camera,
} from "lucide-react";

interface PerfilData {
  nombre: string;
  descripcionPuesto: string;
  imagen: string;
  departamento: string;
  cuerpoAcademico: string;
  claveCA: string;
  sexo: string;
  telefono: string;
  correoInstitucional: string;
  lineaActual: number | string;
  perfilProdep: number | string;
  fechaInicioProdep: string | null;
  fechaVencimientoProdep: string | null;
  correoPersonal: string;
  tieneRegistro: boolean;
}

interface Catalogo {
  intClaveLinea: number;
  vchDescripcion: string;
}

interface PerfilProdep {
  intClvPerfilPROMEP: number;
  vchNombrePerfil: string;
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return iso.split("T")[0];
}

export default function MiembroPerfilPage() {
  const [perfil, setPerfil] = useState<PerfilData | null>(null);
  const [lineas, setLineas] = useState<Catalogo[]>([]);
  const [perfilesProdep, setPerfilesProdep] = useState<PerfilProdep[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [mensaje, setMensaje] = useState<{
    tipo: "ok" | "error";
    texto: string;
  } | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [cacheBust, setCacheBust] = useState(Date.now()); // ← nuevo
  const fileRef = useRef<HTMLInputElement>(null);

  // Campos editables
  const [telefono, setTelefono] = useState("");
  const [correoPersonal, setCorreoPersonal] = useState("");
  const [lineaActual, setLineaActual] = useState("");
  const [perfilProdep, setPerfilProdep] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaVenc, setFechaVenc] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/miembro/perfil").then((r) => r.json()),
      fetch("/api/miembro/catalogos").then((r) => r.json()),
    ])
      .then(([perfilRes, catRes]) => {
        if (perfilRes.success) {
          const d: PerfilData = perfilRes.data;
          setPerfil(d);
          setTelefono(d.telefono ?? "");
          setCorreoPersonal(d.correoPersonal ?? "");
          setLineaActual(String(d.lineaActual ?? ""));
          setPerfilProdep(String(d.perfilProdep ?? ""));
          setFechaInicio(formatDate(d.fechaInicioProdep));
          setFechaVenc(formatDate(d.fechaVencimientoProdep));
        }
        if (catRes.success) {
          setLineas(catRes.data.lineas);
          setPerfilesProdep(catRes.data.perfilesProdep);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview local inmediato
    const reader = new FileReader();
    reader.onload = (ev) => setPreviewImg(ev.target?.result as string);
    reader.readAsDataURL(file);

    setUploadingImg(true);
    setMensaje(null);
    try {
      const form = new FormData();
      form.append("imagen", file);
      const res = await fetch("/api/miembro/perfil/imagen", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (data.success) {
        setMensaje({ tipo: "ok", texto: "Foto de perfil actualizada." });
        setPerfil((prev) =>
          prev ? { ...prev, imagen: data.nombreArchivo } : prev,
        );
        setPreviewImg(null); // ← quitar preview, usar URL del servidor
        setCacheBust(Date.now()); // ← forzar recarga sin caché
      } else {
        setMensaje({
          tipo: "error",
          texto: data.error ?? "Error al subir imagen.",
        });
        setPreviewImg(null);
      }
    } catch {
      setMensaje({
        tipo: "error",
        texto: "Error de conexión al subir imagen.",
      });
      setPreviewImg(null);
    } finally {
      setUploadingImg(false);
    }
  };

  const handleGuardar = async () => {
    setSaving(true);
    setMensaje(null);
    try {
      const res = await fetch("/api/miembro/perfil", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telefono,
          correoPersonal,
          lineaActual,
          perfilProdep,
          fechaInicioProdep: fechaInicio || null,
          fechaVencimientoProdep: fechaVenc || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMensaje({ tipo: "ok", texto: "Perfil actualizado correctamente." });
      } else {
        setMensaje({ tipo: "error", texto: "Ocurrió un error al guardar." });
      }
    } catch {
      setMensaje({ tipo: "error", texto: "Error de conexión." });
    } finally {
      setSaving(false);
    }
  };

  // ← cacheBust en la URL para evitar caché del navegador
  const imagenSrc =
    previewImg ??
    (perfil?.imagen && perfil.imagen !== "sin imagen.jpg"
      ? `/ImagenPerfil/${perfil.imagen}?t=${cacheBust}`
      : null);

  if (loading) {
    return (
      <DashboardLayout role="miembro">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-6 h-6 text-[#c9a227] animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="miembro">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">
          Miembro C.A.
        </span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#691B31] leading-tight">
          Mi Perfil
        </h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">
          Actualiza tu información personal y académica.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[6px]">
        {/* ── Tarjeta lateral ───────────────────────────────────────── */}
        <div className="bg-[#fff] border border-[#e4ddd0] p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-[#faf5e4] flex items-center justify-center overflow-hidden border-2 border-[#e4ddd0]">
                {imagenSrc ? (
                  <img
                    src={imagenSrc}
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <User className="w-10 h-10 text-[#c9a227]" />
                )}
              </div>

              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploadingImg}
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#691B31] border-2 border-white flex items-center justify-center transition-colors hover:bg-[#b78c33] disabled:opacity-60"
                title="Cambiar foto"
              >
                {uploadingImg ? (
                  <Loader2 className="w-3 h-3 text-white animate-spin" />
                ) : (
                  <Camera className="w-3 h-3 text-white" />
                )}
              </button>

              <input
                ref={fileRef}
                type="file"
                accept=".jpg,.jpeg,.png,.bmp"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            <h3 className="font-serif text-[1rem] font-semibold text-[#691B31] leading-snug">
              {perfil?.nombre ?? "—"}
            </h3>
            <p className="text-[0.72rem] text-[#6b6b6b] mt-1">
              {perfil?.descripcionPuesto ?? ""}
            </p>
            <span className="text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] bg-[#faf5e4] text-[#c9a227] mt-2">
              Miembro
            </span>
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-[#e4ddd0]">
            <div className="flex items-start gap-2">
              <Mail className="w-3.5 h-3.5 text-[#c9a227] mt-0.5 shrink-0" />
              <span className="text-[0.78rem] text-[#6b6b6b] break-all">
                {perfil?.correoInstitucional || "—"}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="w-3.5 h-3.5 text-[#c9a227] mt-0.5 shrink-0" />
              <span className="text-[0.78rem] text-[#6b6b6b]">
                {perfil?.telefono || "—"}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Building2 className="w-3.5 h-3.5 text-[#c9a227] mt-0.5 shrink-0" />
              <span className="text-[0.78rem] text-[#6b6b6b]">
                {perfil?.claveCA} · {perfil?.cuerpoAcademico}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <BookOpen className="w-3.5 h-3.5 text-[#c9a227] mt-0.5 shrink-0" />
              <span className="text-[0.78rem] text-[#6b6b6b]">
                {perfil?.departamento || "—"}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Award className="w-3.5 h-3.5 text-[#c9a227] mt-0.5 shrink-0" />
              <span className="text-[0.78rem] text-[#6b6b6b]">
                PRODEP ·{" "}
                {perfilesProdep.find(
                  (p) => p.intClvPerfilPROMEP === Number(perfilProdep),
                )?.vchNombrePerfil ?? "—"}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <UserCog className="w-3.5 h-3.5 text-[#c9a227] mt-0.5 shrink-0" />
              <span className="text-[0.78rem] text-[#6b6b6b]">
                Sexo:{" "}
                {perfil?.sexo === "H"
                  ? "Hombre"
                  : perfil?.sexo === "M"
                    ? "Mujer"
                    : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* ── Formulario ────────────────────────────────────────────── */}
        <div className="lg:col-span-2 bg-[#fff] border border-[#e4ddd0] p-6">
          <div className="flex items-center gap-2 mb-6">
            <UserCog className="w-[14px] h-[14px] text-[#c9a227]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">
              Editar información
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1.5">
                Nombre completo
              </label>
              <input
                type="text"
                value={perfil?.nombre ?? ""}
                readOnly
                className="w-full py-[0.6rem] px-3 bg-[#f0ece4] border border-[#e4ddd0] rounded-[3px] text-[0.85rem] text-[#9a9a9a] outline-none cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1.5">
                Correo institucional
              </label>
              <input
                type="email"
                value={perfil?.correoInstitucional ?? ""}
                readOnly
                className="w-full py-[0.6rem] px-3 bg-[#f0ece4] border border-[#e4ddd0] rounded-[3px] text-[0.85rem] text-[#9a9a9a] outline-none cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1.5">
                Cuerpo Académico
              </label>
              <input
                type="text"
                value={perfil?.cuerpoAcademico ?? ""}
                readOnly
                className="w-full py-[0.6rem] px-3 bg-[#f0ece4] border border-[#e4ddd0] rounded-[3px] text-[0.85rem] text-[#9a9a9a] outline-none cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1.5">
                Departamento
              </label>
              <input
                type="text"
                value={perfil?.departamento ?? ""}
                readOnly
                className="w-full py-[0.6rem] px-3 bg-[#f0ece4] border border-[#e4ddd0] rounded-[3px] text-[0.85rem] text-[#9a9a9a] outline-none cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[#e4ddd0]" />
            <span className="text-[0.62rem] tracking-[0.15em] uppercase text-[#9a9a9a] whitespace-nowrap">
              Datos editables
            </span>
            <div className="flex-1 h-px bg-[#e4ddd0]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1.5">
                Teléfono
              </label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                maxLength={10}
                className="w-full py-[0.6rem] px-3 bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.85rem] text-[#2e2e2e] outline-none transition-all duration-200 focus:border-[#b78c33] focus:shadow-[0_0_0_3px_rgba(183,140,51,0.15)]"
              />
            </div>
            <div>
              <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1.5">
                Correo personal
              </label>
              <input
                type="email"
                value={correoPersonal}
                onChange={(e) => setCorreoPersonal(e.target.value)}
                className="w-full py-[0.6rem] px-3 bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.85rem] text-[#2e2e2e] outline-none transition-all duration-200 focus:border-[#b78c33] focus:shadow-[0_0_0_3px_rgba(183,140,51,0.15)]"
              />
            </div>
            <div>
              <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1.5">
                Línea de investigación
              </label>
              <select
                value={lineaActual}
                onChange={(e) => setLineaActual(e.target.value)}
                className="w-full py-[0.6rem] px-3 bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.85rem] text-[#2e2e2e] outline-none transition-all duration-200 focus:border-[#b78c33] focus:shadow-[0_0_0_3px_rgba(183,140,51,0.15)] appearance-none"
              >
                <option value="">-- Seleccionar --</option>
                {lineas.map((l) => (
                  <option key={l.intClaveLinea} value={l.intClaveLinea}>
                    {l.vchDescripcion}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1.5">
                Perfil PRODEP
              </label>
              <select
                value={perfilProdep}
                onChange={(e) => setPerfilProdep(e.target.value)}
                className="w-full py-[0.6rem] px-3 bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.85rem] text-[#2e2e2e] outline-none transition-all duration-200 focus:border-[#b78c33] focus:shadow-[0_0_0_3px_rgba(183,140,51,0.15)] appearance-none"
              >
                <option value="">-- Seleccionar --</option>
                {perfilesProdep.map((p) => (
                  <option
                    key={p.intClvPerfilPROMEP}
                    value={p.intClvPerfilPROMEP}
                  >
                    {p.vchNombrePerfil}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1.5">
                <Calendar className="w-3 h-3 inline mr-1" />
                Fecha inicio PRODEP
              </label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="w-full py-[0.6rem] px-3 bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.85rem] text-[#2e2e2e] outline-none transition-all duration-200 focus:border-[#b78c33] focus:shadow-[0_0_0_3px_rgba(183,140,51,0.15)]"
              />
            </div>
            <div>
              <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1.5">
                <Calendar className="w-3 h-3 inline mr-1" />
                Fecha vencimiento PRODEP
              </label>
              <input
                type="date"
                value={fechaVenc}
                onChange={(e) => setFechaVenc(e.target.value)}
                className="w-full py-[0.6rem] px-3 bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.85rem] text-[#2e2e2e] outline-none transition-all duration-200 focus:border-[#b78c33] focus:shadow-[0_0_0_3px_rgba(183,140,51,0.15)]"
              />
            </div>
          </div>

          {mensaje && (
            <div
              className={`flex items-center gap-2 mt-5 p-3 rounded-[3px] text-[0.78rem] font-medium ${
                mensaje.tipo === "ok"
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-red-50 border border-red-200 text-red-600"
              }`}
            >
              {mensaje.tipo === "ok" ? (
                <CheckCircle className="w-4 h-4 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 shrink-0" />
              )}
              {mensaje.texto}
            </div>
          )}

          <div className="flex justify-end mt-6">
            <button
              onClick={handleGuardar}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-[0.55rem] bg-[#691B31] text-[#fff] rounded-[3px] text-[0.78rem] font-semibold transition-colors duration-300 hover:bg-[#b78c33] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {saving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
