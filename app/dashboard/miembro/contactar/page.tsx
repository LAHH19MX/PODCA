"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Users,
  Mail,
  Building2,
  Send,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

interface CA {
  id: number;
  vchClvCA: string;
  vchNombreCA: string;
  vchNomDpto: string;
}

interface Integrante {
  clave: string;
  nombre: string;
  correo: string;
}

export default function MiembroContactarPage() {
  const [cuerpos, setCuerpos] = useState<CA[]>([]);
  const [integrantes, setIntegrantes] = useState<Integrante[]>([]);
  const [selectedCA, setSelectedCA] = useState<CA | null>(null);
  const [selectedMiembro, setSelectedMiembro] = useState(0);
  const [loadingCAs, setLoadingCAs] = useState(true);
  const [loadingIntegrantes, setLoadingIntegrantes] = useState(false);
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [status, setStatus] = useState<{
    tipo: "ok" | "error";
    texto: string;
  } | null>(null);

  // Cargar cuerpos académicos
  useEffect(() => {
    fetch("/api/cuerpos-academicos")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          setCuerpos(json.data);
          if (json.data.length > 0) seleccionarCA(json.data[0]);
        }
        setLoadingCAs(false);
      })
      .catch(() => setLoadingCAs(false));
  }, []);

  const seleccionarCA = async (ca: CA) => {
    setSelectedCA(ca);
    setSelectedMiembro(0);
    setStatus(null);
    setLoadingIntegrantes(true);
    try {
      const res = await fetch(`/api/integrantes?clvCA=${ca.vchClvCA}`);
      const json = await res.json();
      setIntegrantes(json.data ?? []);
    } catch {
      setIntegrantes([]);
    } finally {
      setLoadingIntegrantes(false);
    }
  };

  const handleEnviar = async () => {
    if (!mensaje.trim() || !asunto.trim()) {
      setStatus({
        tipo: "error",
        texto: "El asunto y el mensaje son obligatorios.",
      });
      return;
    }
    const integrante = integrantes[selectedMiembro];
    if (!integrante?.correo) {
      setStatus({
        tipo: "error",
        texto: "El destinatario no tiene correo registrado.",
      });
      return;
    }

    setEnviando(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: integrante.correo,
          nombre: integrante.nombre,
          asunto,
          mensaje,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus({ tipo: "ok", texto: "Mensaje enviado correctamente." });
        setAsunto("");
        setMensaje("");
      } else {
        setStatus({
          tipo: "error",
          texto: json.error ?? "Error al enviar el mensaje.",
        });
      }
    } catch {
      setStatus({ tipo: "error", texto: "Error de conexión." });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <DashboardLayout role="miembro">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">
          Miembro C.A.
        </span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#691B31] leading-tight">
          Contactar Cuerpos Académicos
        </h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">
          Envía un mensaje a miembros de otros cuerpos académicos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[6px]">
        {/* Lista de CAs */}
        <div className="bg-[#fff] border border-[#e4ddd0] p-6">
          <div className="flex items-center gap-2 mb-5">
            <Building2 className="w-[14px] h-[14px] text-[#c9a227]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">
              Cuerpos académicos
            </h3>
          </div>

          {loadingCAs ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-5 h-5 text-[#c9a227] animate-spin" />
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {cuerpos.map((ca) => (
                <button
                  key={ca.id}
                  onClick={() => seleccionarCA(ca)}
                  className={`text-left p-3 rounded-[3px] transition-all duration-200 ${
                    selectedCA?.vchClvCA === ca.vchClvCA
                      ? "bg-[#faf5e4] border border-[#b78c33]"
                      : "border border-transparent hover:bg-[#f7f4ee]"
                  }`}
                >
                  <span className="text-[0.68rem] font-bold tracking-[0.1em] text-[#c9a227]">
                    {ca.vchClvCA}
                  </span>
                  <p className="text-[0.82rem] font-medium text-[#2e2e2e] mt-0.5 leading-snug">
                    {ca.vchNombreCA}
                  </p>
                  <p className="text-[0.7rem] text-[#9a9a9a]">
                    {ca.vchNomDpto}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Formulario */}
        <div className="lg:col-span-2 bg-[#fff] border border-[#e4ddd0] p-6">
          <div className="flex items-center gap-2 mb-5">
            <Mail className="w-[14px] h-[14px] text-[#c9a227]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">
              Enviar mensaje
            </h3>
          </div>

          {/* Destinatarios */}
          <div className="mb-5">
            <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-2">
              Destinatario
            </label>
            {loadingIntegrantes ? (
              <div className="flex justify-center py-4">
                <Loader2 className="w-4 h-4 text-[#c9a227] animate-spin" />
              </div>
            ) : integrantes.length === 0 ? (
              <p className="text-[0.82rem] text-[#9a9a9a] py-2">
                Sin integrantes registrados.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {integrantes.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedMiembro(i);
                      setStatus(null);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-[3px] transition-all duration-200 text-left ${
                      selectedMiembro === i
                        ? "bg-[#691B31] text-[#fff]"
                        : "bg-[#f7f4ee] border border-[#e4ddd0] text-[#2e2e2e] hover:border-[#b78c33]"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        selectedMiembro === i
                          ? "bg-[rgba(183,140,51,0.3)]"
                          : "bg-[#faf5e4]"
                      }`}
                    >
                      <Users className="w-3 h-3 text-[#c9a227]" />
                    </div>
                    <div>
                      <p className="text-[0.78rem] font-medium">{m.nombre}</p>
                      <p
                        className={`text-[0.65rem] ${
                          selectedMiembro === i
                            ? "text-[rgba(255,255,255,0.6)]"
                            : "text-[#9a9a9a]"
                        }`}
                      >
                        {m.correo || "Sin correo"}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Correo destinatario */}
          {integrantes[selectedMiembro] && (
            <div className="mb-4 p-3 bg-[#f7f4ee] rounded-[3px]">
              <p className="text-[0.72rem] text-[#9a9a9a]">
                Correo del destinatario:
              </p>
              <p className="text-[0.85rem] font-medium text-[#2e2e2e]">
                {integrantes[selectedMiembro]?.correo ||
                  "Sin correo registrado"}
              </p>
            </div>
          )}

          {/* Asunto */}
          <div className="mb-4">
            <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1.5">
              Asunto
            </label>
            <input
              type="text"
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              placeholder="Escribe el asunto..."
              className="w-full py-[0.6rem] px-3 bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.85rem] text-[#2e2e2e] placeholder:text-[#9a9a9a] outline-none transition-all duration-200 focus:border-[#b78c33] focus:shadow-[0_0_0_3px_rgba(183,140,51,0.15)]"
            />
          </div>

          {/* Mensaje */}
          <div className="mb-5">
            <label className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] block mb-1.5">
              Mensaje
            </label>
            <textarea
              rows={5}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="w-full py-[0.6rem] px-3 bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.85rem] text-[#2e2e2e] placeholder:text-[#9a9a9a] outline-none transition-all duration-200 focus:border-[#b78c33] focus:shadow-[0_0_0_3px_rgba(183,140,51,0.15)] resize-none"
            />
          </div>

          {/* Feedback */}
          {status && (
            <div
              className={`flex items-center gap-2 mb-4 p-3 rounded-[3px] text-[0.78rem] font-medium ${
                status.tipo === "ok"
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-red-50 border border-red-200 text-red-600"
              }`}
            >
              {status.tipo === "ok" ? (
                <CheckCircle className="w-4 h-4 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 shrink-0" />
              )}
              {status.texto}
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleEnviar}
              disabled={enviando || integrantes.length === 0}
              className="inline-flex items-center gap-2 px-5 py-[0.55rem] bg-[#691B31] text-[#fff] rounded-[3px] text-[0.78rem] font-semibold transition-colors duration-300 hover:bg-[#b78c33] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {enviando ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              {enviando ? "Enviando..." : "Enviar mensaje"}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
