"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  Settings,
  LogOut,
  Building2,
  UserCheck,
  FolderOpen,
  BarChart3,
  Bell,
  UserCog,
  GraduationCap,
  ClipboardList,
  Globe,
  Eye,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const roleConfig: Record<
  string,
  { label: string; description: string; items: NavItem[] }
> = {
  admin: {
    label: "Administrador",
    description: "Administracion total del sistema",
    items: [
      { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
      { label: "Usuarios", href: "/dashboard/admin/usuarios", icon: Users },
      {
        label: "Cuerpos Academicos",
        href: "/dashboard/admin/cuerpos",
        icon: Building2,
      },
      {
        label: "Publicaciones",
        href: "/dashboard/admin/publicaciones",
        icon: BookOpen,
      },
      { label: "Reportes", href: "/dashboard/admin/reportes", icon: BarChart3 },
      {
        label: "Configuracion",
        href: "/dashboard/admin/configuracion",
        icon: Settings,
      },
    ],
  },
  direccion: {
    label: "Direccion Academica",
    description: "Gestion academica institucional",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard/direccion",
        icon: LayoutDashboard,
      },
      {
        label: "Cuerpos Academicos",
        href: "/dashboard/direccion/cuerpos",
        icon: Building2,
      },
      {
        label: "Produccion Academica",
        href: "/dashboard/direccion/produccion",
        icon: FileText,
      },
      {
        label: "Reportes",
        href: "/dashboard/direccion/reportes",
        icon: BarChart3,
      },
      {
        label: "Notificaciones",
        href: "/dashboard/direccion/notificaciones",
        icon: Bell,
      },
    ],
  },
  lider: {
    label: "Lider de C.A.",
    description: "Gestion del cuerpo academico",
    items: [
      { label: "Dashboard", href: "/dashboard/lider", icon: LayoutDashboard },
      {
        label: "Mi Cuerpo Academico",
        href: "/dashboard/lider/mi-cuerpo",
        icon: Building2,
      },
      {
        label: "Integrantes",
        href: "/dashboard/lider/integrantes",
        icon: UserCheck,
      },
      {
        label: "Publicaciones",
        href: "/dashboard/lider/publicaciones",
        icon: BookOpen,
      },
      {
        label: "Proyectos",
        href: "/dashboard/lider/proyectos",
        icon: FolderOpen,
      },
      { label: "Mi Perfil", href: "/dashboard/lider/perfil", icon: UserCog },
    ],
  },
  director: {
    label: "Director de Programa",
    description: "Supervision de programas",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard/director",
        icon: LayoutDashboard,
      },
      {
        label: "Programa Educativo",
        href: "/dashboard/director/programa",
        icon: GraduationCap,
      },
      {
        label: "Cuerpos Academicos",
        href: "/dashboard/director/cuerpos",
        icon: Building2,
      },
      {
        label: "Evaluaciones",
        href: "/dashboard/director/evaluaciones",
        icon: ClipboardList,
      },
      {
        label: "Reportes",
        href: "/dashboard/director/reportes",
        icon: BarChart3,
      },
    ],
  },
  externo: {
    label: "Externo",
    description: "Acceso a recursos publicos",
    items: [
      { label: "Dashboard", href: "/dashboard/externo", icon: LayoutDashboard },
      {
        label: "Explorar C.A.",
        href: "/dashboard/externo/explorar",
        icon: Globe,
      },
      {
        label: "Publicaciones",
        href: "/dashboard/externo/publicaciones",
        icon: BookOpen,
      },
      {
        label: "Directorio",
        href: "/dashboard/externo/directorio",
        icon: Users,
      },
      { label: "Mi Perfil", href: "/dashboard/externo/perfil", icon: UserCog },
    ],
  },
  representante: {
    label: "Representante",
    description: "Representacion institucional y vinculacion",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard/representante",
        icon: LayoutDashboard,
      },
      {
        label: "Datos Generales",
        href: "/dashboard/representante/datos",
        icon: Users,
      },
      {
        label: "Cuerpos Academicos",
        href: "/dashboard/representante/cuerpos",
        icon: Building2,
      },
      {
        label: "Publicaciones",
        href: "/dashboard/representante/publicaciones",
        icon: BookOpen,
      },
      {
        label: "Registrar Representantes",
        href: "/dashboard/representante/registrar",
        icon: UserCheck,
      },
      {
        label: "Visor de Produccion",
        href: "/dashboard/representante/produccion",
        icon: Eye,
      },
    ],
  },
  miembro: {
    label: "Miembro de C.A.",
    description: "Participacion en cuerpo academico",
    items: [
      { label: "Dashboard", href: "/dashboard/miembro", icon: LayoutDashboard },
      {
        label: "Mi Produccion",
        href: "/dashboard/miembro/produccion",
        icon: FileText,
      },
      {
        label: "Publicaciones",
        href: "/dashboard/miembro/publicaciones",
        icon: BookOpen,
      },
      {
        label: "Editar Perfil",
        href: "/dashboard/miembro/perfil",
        icon: UserCog,
      },
      {
        label: "Contactar C.A.",
        href: "/dashboard/miembro/contactar",
        icon: Users,
      },
    ],
  },
};

export function DashboardSidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const config = roleConfig[role] || roleConfig.admin;

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  // Inicial del nombre para el avatar
  const nombreCompleto = session?.user?.name ?? "Usuario";
  const inicial = nombreCompleto.charAt(0).toUpperCase();

  return (
    <aside className="w-[260px] h-screen bg-[#722F37] border-r border-[rgba(255,255,255,0.1)] flex flex-col shrink-0 sticky top-0">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[rgba(255,255,255,0.1)]">
        <Link
          href="/"
          className="font-serif text-[1.1rem] font-bold text-[#fff] tracking-[0.04em] no-underline block mb-1"
        >
          UTHH
        </Link>
        <p className="text-[0.65rem] tracking-[0.12em] uppercase text-[#c9a227] font-semibold">
          {config.label}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <p className="text-[0.6rem] tracking-[0.16em] uppercase text-[rgba(255,255,255,0.4)] font-semibold px-3 mb-3">
          Menu principal
        </p>
        <ul className="list-none">
          {config.items.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href} className="mb-[2px]">
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-[0.6rem] rounded-[4px] no-underline text-[0.82rem] font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[rgba(201,162,39,0.2)] text-[#c9a227] border-l-2 border-[#c9a227]"
                      : "text-[rgba(255,255,255,0.65)] hover:bg-[rgba(255,255,255,0.08)] hover:text-[rgba(255,255,255,0.9)]"
                  }`}
                >
                  <Icon className="w-[16px] h-[16px] shrink-0" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 border-t border-[rgba(255,255,255,0.1)] pt-4">
        <div className="flex items-center gap-3 px-3 mb-4">
          {/* Avatar con inicial */}
          <div className="w-8 h-8 rounded-full bg-[rgba(201,162,39,0.25)] flex items-center justify-center shrink-0">
            <span className="text-[0.75rem] font-bold text-[#c9a227]">
              {inicial}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-[0.75rem] text-[rgba(255,255,255,0.9)] font-medium truncate">
              {nombreCompleto}
            </p>
            <p className="text-[0.65rem] text-[rgba(255,255,255,0.45)] truncate">
              {config.description}
            </p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-[0.55rem] rounded-[4px] bg-transparent border-none cursor-pointer text-[0.8rem] font-medium text-[rgba(255,255,255,0.5)] transition-all duration-200 hover:bg-[rgba(255,255,255,0.08)] hover:text-[rgba(255,255,255,0.8)]"
        >
          <LogOut className="w-[14px] h-[14px]" />
          Cerrar sesion
        </button>
      </div>
    </aside>
  );
}
