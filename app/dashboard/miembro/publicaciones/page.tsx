"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  BookOpen,
  Search,
  Eye,
  Calendar,
  Users,
  Loader2,
  FileText,
  X,
  Download,
} from "lucide-react";

interface Publicacion {
  id: number;
  fechaRegistro: string;
  tipoProducto: string;
  titulo: string;
  descripcion: string;
  impacto: string;
  lineaInvestigacion: string;
  status: string;
  autores: string;
  colaboradores: string;
  archivo: string;
  nombreMiembro: string;
}

function formatFecha(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function MiembroPublicacionesPage() {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [seleccionada, setSeleccionada] = useState<Publicacion | null>(null);

  useEffect(() => {
    fetch("/api/miembro/publicaciones")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setPublicaciones(json.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtradas = publicaciones.filter(
    (p) =>
      p.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.autores.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.tipoProducto.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <DashboardLayout role="miembro">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">
          Miembro C.A.
        </span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#691B31] leading-tight">
          Publicaciones
        </h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">
          Producción académica del cuerpo académico.
        </p>
      </div>

      {/* Buscador */}
      <div className="bg-[#fff] border border-[#e4ddd0] p-4 mb-[6px]">
        <div className="relative max-w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#9a9a9a]" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por título, autor o tipo..."
            className="w-full pl-9 pr-4 py-[0.5rem] bg-[#f7f4ee] border border-[#e4ddd0] rounded-[3px] text-[0.82rem] text-[#2e2e2e] placeholder:text-[#9a9a9a] outline-none focus:border-[#b78c33] transition-colors duration-200"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-6 h-6 text-[#c9a227] animate-spin" />
        </div>
      )}

      {/* Sin resultados */}
      {!loading && filtradas.length === 0 && (
        <div className="bg-[#fff] border border-[#e4ddd0] p-12 text-center">
          <BookOpen className="w-8 h-8 text-[#e4ddd0] mx-auto mb-3" />
          <p className="text-[0.85rem] text-[#9a9a9a]">
            {busqueda
              ? "Sin resultados para tu búsqueda."
              : "No hay publicaciones registradas."}
          </p>
        </div>
      )}

      {/* Lista */}
      {!loading && (
        <div className="flex flex-col gap-[6px]">
          {filtradas.map((pub) => (
            <div
              key={pub.id}
              className="bg-[#fff] border border-[#e4ddd0] p-5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300"
            >
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#faf5e4] flex items-center justify-center rounded-[3px] shrink-0 mt-0.5">
                    <BookOpen className="w-[14px] h-[14px] text-[#c9a227]" />
                  </div>
                  <div>
                    <h3 className="text-[0.9rem] font-medium text-[#691B31]">
                      {pub.titulo}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-[0.72rem] text-[#6b6b6b]">
                        {pub.tipoProducto}
                      </span>
                      <span
                        className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] ${
                          pub.status === "TERMINADO"
                            ? "bg-[#691B31] text-white"
                            : "bg-[#faf5e4] text-[#c9a227]"
                        }`}
                      >
                        {pub.status}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSeleccionada(pub)}
                  className="text-[0.72rem] font-semibold text-[#c9a227] flex items-center gap-1 hover:text-[#691B31] transition-colors shrink-0"
                >
                  <Eye className="w-3 h-3" /> Ver
                </button>
              </div>
              <div className="flex items-center gap-5 mt-3 pt-3 border-t border-[#e4ddd0] flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3 h-3 text-[#9a9a9a]" />
                  <span className="text-[0.75rem] text-[#6b6b6b]">
                    {pub.autores}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#9a9a9a]" />
                  <span className="text-[0.75rem] text-[#9a9a9a]">
                    {formatFecha(pub.fechaRegistro)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3 h-3 text-[#9a9a9a]" />
                  <span className="text-[0.75rem] text-[#9a9a9a]">
                    {pub.lineaInvestigacion}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal detalle */}
      {seleccionada && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.4)]"
          onClick={() => setSeleccionada(null)}
        >
          <div
            className="bg-[#fff] border border-[#e4ddd0] w-full max-w-[580px] max-h-[85vh] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.15)] relative"
            onClick={(e) => e.stopPropagation()}
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
                  onClick={() => setSeleccionada(null)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-[#f7f4ee] hover:bg-[#e4ddd0] transition-colors shrink-0 ml-4"
                >
                  <X className="w-3.5 h-3.5 text-[#6b6b6b]" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {seleccionada.descripcion && (
                  <div>
                    <p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] mb-1">
                      Descripción
                    </p>
                    <p className="text-[0.85rem] text-[#2e2e2e] leading-relaxed">
                      {seleccionada.descripcion}
                    </p>
                  </div>
                )}

                {seleccionada.impacto && (
                  <div>
                    <p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] mb-1">
                      Impacto
                    </p>
                    <p className="text-[0.85rem] text-[#2e2e2e] leading-relaxed">
                      {seleccionada.impacto}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] mb-1">
                      Autores
                    </p>
                    <p className="text-[0.82rem] text-[#2e2e2e]">
                      {seleccionada.autores || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] mb-1">
                      Colaboradores
                    </p>
                    <p className="text-[0.82rem] text-[#2e2e2e]">
                      {seleccionada.colaboradores || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] mb-1">
                      Miembro
                    </p>
                    <p className="text-[0.82rem] text-[#2e2e2e]">
                      {seleccionada.nombreMiembro}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] mb-1">
                      Línea de investigación
                    </p>
                    <p className="text-[0.82rem] text-[#2e2e2e]">
                      {seleccionada.lineaInvestigacion}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] mb-1">
                      Fecha de registro
                    </p>
                    <p className="text-[0.82rem] text-[#2e2e2e]">
                      {formatFecha(seleccionada.fechaRegistro)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-[#9a9a9a] mb-1">
                      Estado
                    </p>
                    <span
                      className={`text-[0.72rem] font-semibold px-2 py-0.5 rounded-[3px] ${
                        seleccionada.status === "TERMINADO"
                          ? "bg-[#691B31] text-white"
                          : "bg-[#faf5e4] text-[#c9a227]"
                      }`}
                    >
                      {seleccionada.status}
                    </span>
                  </div>
                </div>

                {seleccionada.archivo && (
                  <a
                    href={`/ProduccionAcademica/${seleccionada.archivo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-[0.55rem] bg-[#691B31] text-white rounded-[3px] text-[0.78rem] font-semibold transition-colors hover:bg-[#b78c33] w-fit mt-2"
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
    </DashboardLayout>
  );
}
