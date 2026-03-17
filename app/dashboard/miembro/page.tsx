"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { StatCard } from "@/components/stat-card";
import {
  BookOpen,
  FileText,
  Upload,
  UserCog,
  Users,
  Building2,
  FolderOpen,
  Loader2,
} from "lucide-react";
import Link from "next/link";

interface ProduccionItem {
  id: number;
  fechaRegistro: string;
  tipoProducto: string;
  titulo: string;
  status: string;
}

interface PublicacionItem {
  id: number;
  fechaRegistro: string;
  tipoProducto: string;
  titulo: string;
  autores: string;
  nombreMiembro: string;
}

interface PerfilData {
  nombre: string;
  descripcionPuesto: string;
  cuerpoAcademico: string;
  claveCA: string;
}

function formatFecha(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function MiembroDashboard() {
  const [perfil, setPerfil] = useState<PerfilData | null>(null);
  const [produccion, setProduccion] = useState<ProduccionItem[]>([]);
  const [publicaciones, setPublicaciones] = useState<PublicacionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/miembro/perfil").then((r) => r.json()),
      fetch("/api/miembro/produccion").then((r) => r.json()),
      fetch("/api/miembro/publicaciones").then((r) => r.json()),
    ])
      .then(([perfilRes, prodRes, pubRes]) => {
        if (perfilRes.success) setPerfil(perfilRes.data);
        if (prodRes.success) setProduccion(prodRes.data);
        if (pubRes.success) setPublicaciones(pubRes.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Stats calculados desde datos reales
  const totalProduccion = produccion.length;
  const enRevision = produccion.filter(
    (p) => p.status === "EN DESARROLLO",
  ).length;
  const terminados = produccion.filter((p) => p.status === "TERMINADO").length;
  const totalPublicaciones = publicaciones.length;

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
      {/* Header */}
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">
          Miembro del Cuerpo Académico · {perfil?.claveCA ?? "—"}
        </span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#722F37] leading-tight">
          Bienvenido, {perfil?.nombre ?? "—"}
        </h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">
          {perfil?.cuerpoAcademico ?? "—"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[6px] mb-8">
        <StatCard
          icon={BookOpen}
          label="Publicaciones del C.A."
          value={String(totalPublicaciones)}
          sub="Total del cuerpo académico"
        />
        <StatCard
          icon={FileText}
          label="Mi producción"
          value={String(totalProduccion)}
          sub={`${enRevision} en desarrollo`}
        />
        <StatCard
          icon={FolderOpen}
          label="Terminados"
          value={String(terminados)}
          sub="Productos concluidos"
        />
        <StatCard
          icon={Users}
          label="C.A."
          value={perfil?.claveCA ?? "—"}
          sub={(perfil?.cuerpoAcademico ?? "—").slice(0, 20) + "..."}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[6px] mb-8">
        {/* Mi producción reciente */}
        <div className="bg-[#fff] border border-[#e8e4df] p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Upload className="w-[14px] h-[14px] text-[#c9a227]" />
              <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">
                Mi producción académica
              </h3>
            </div>
            <Link
              href="/dashboard/miembro/produccion"
              className="text-[0.72rem] font-semibold text-[#c9a227] no-underline hover:text-[#722F37] transition-colors duration-300"
            >
              Ver toda
            </Link>
          </div>

          {produccion.length === 0 ? (
            <p className="text-[0.82rem] text-[#9a9a9a] text-center py-6">
              No tienes producción registrada.
            </p>
          ) : (
            <div className="flex flex-col">
              {produccion.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3 border-b border-[#e8e4df] last:border-b-0"
                >
                  <div className="min-w-0 mr-3">
                    <p className="text-[0.82rem] font-medium text-[#2e2e2e] truncate">
                      {item.titulo}
                    </p>
                    <p className="text-[0.7rem] text-[#9a9a9a]">
                      {item.tipoProducto} · {formatFecha(item.fechaRegistro)}
                    </p>
                  </div>
                  <span
                    className={`text-[0.68rem] font-semibold px-2 py-0.5 rounded-[3px] shrink-0 ${
                      item.status === "TERMINADO"
                        ? "bg-[#722F37] text-[#fff]"
                        : "bg-[#faf5e4] text-[#c9a227]"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Publicaciones recientes del C.A. */}
        <div className="bg-[#fff] border border-[#e8e4df] p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <BookOpen className="w-[14px] h-[14px] text-[#c9a227]" />
              <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">
                Publicaciones del C.A.
              </h3>
            </div>
            <Link
              href="/dashboard/miembro/publicaciones"
              className="text-[0.72rem] font-semibold text-[#c9a227] no-underline hover:text-[#722F37] transition-colors duration-300"
            >
              Ver todas
            </Link>
          </div>

          {publicaciones.length === 0 ? (
            <p className="text-[0.82rem] text-[#9a9a9a] text-center py-6">
              No hay publicaciones registradas.
            </p>
          ) : (
            <div className="flex flex-col">
              {publicaciones.slice(0, 4).map((pub) => (
                <div
                  key={pub.id}
                  className="flex items-center justify-between py-3 border-b border-[#e8e4df] last:border-b-0"
                >
                  <div className="min-w-0 mr-3">
                    <p className="text-[0.82rem] font-medium text-[#2e2e2e] truncate">
                      {pub.titulo}
                    </p>
                    <p className="text-[0.7rem] text-[#9a9a9a] truncate">
                      {pub.tipoProducto} · {pub.nombreMiembro}
                    </p>
                  </div>
                  <span className="text-[0.7rem] text-[#9a9a9a] shrink-0">
                    {formatFecha(pub.fechaRegistro)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-[#fff] border border-[#e8e4df] p-6">
        <div className="flex items-center gap-2 mb-5">
          <Building2 className="w-[14px] h-[14px] text-[#c9a227]" />
          <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">
            Acciones rápidas
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              label: "Subir producción",
              href: "/dashboard/miembro/produccion",
              icon: Upload,
            },
            {
              label: "Ver publicaciones",
              href: "/dashboard/miembro/publicaciones",
              icon: BookOpen,
            },
            {
              label: "Editar perfil",
              href: "/dashboard/miembro/perfil",
              icon: UserCog,
            },
            {
              label: "Contactar C.A.",
              href: "/dashboard/miembro/contactar",
              icon: Users,
            },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 p-4 border border-[#e8e4df] rounded-[3px] no-underline text-[#2e2e2e] transition-all duration-300 hover:border-[#c9a227] hover:shadow-[0_2px_12px_rgba(183,140,51,0.1)]"
            >
              <action.icon className="w-[16px] h-[16px] text-[#c9a227] shrink-0" />
              <span className="text-[0.82rem] font-medium">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
