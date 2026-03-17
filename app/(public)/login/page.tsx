"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import {
  User,
  Users,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";

interface TipoUsuario {
  intClvTipoUsuario: string;
  vchTipoUsuario: string;
}

function getRedirectPath(tipoUser: string): string {
  switch (tipoUser) {
    case "1":
      return "/dashboard/representante";
    case "2":
      return "/dashboard/enlace";
    case "3":
      return "/dashboard/miembro";
    case "5":
      return "/dashboard/admin";
    case "6":
      return "/dashboard/lider";
    case "7":
      return "/dashboard/externo";
    case "8":
      return "/dashboard/director";
    default:
      return "/dashboard";
  }
}

export default function LoginPage() {
  const router = useRouter();
  const [tipos, setTipos] = useState<TipoUsuario[]>([]);
  const [role, setRole] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/tipos-usuario")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setTipos(json.data);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role || !usuario || !contrasena) return;
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        tipo: role,
        usuario,
        password: contrasena,
        redirect: false,
      });

      if (result?.error) {
        setError("Usuario, contraseña o tipo de usuario incorrecto.");
        setIsLoading(false);
        return;
      }

      // Obtener sesión real para redirigir según el tipo del SP, no del dropdown
      const session = await getSession();
      const tipoReal = (session?.user as any)?.tipoUser ?? role;
      router.push(getRedirectPath(tipoReal));
    } catch {
      setError("Ocurrió un error al iniciar sesión.");
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8 bg-[#fdfcfa] relative"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 15% 85%, rgba(183,140,51,0.06) 0%, transparent 55%), radial-gradient(ellipse at 85% 15%, rgba(183,140,51,0.05) 0%, transparent 50%)",
      }}
    >
      <div className="relative bg-[#fff] w-full max-w-[420px] p-[2.8rem_2.8rem_2.4rem] border border-[#e8e4df] shadow-[0_4px_40px_rgba(0,0,0,0.07)]">
        {/* Gold top bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#c9a227] via-[#ddb94a] to-[#c9a227]" />

        {/* Header */}
        <div className="text-center mb-[2.2rem]">
          <div className="w-[60px] h-[60px] rounded-full bg-[#722F37] flex items-center justify-center mx-auto mb-[1.4rem] relative">
            <div className="absolute inset-[-3px] rounded-full border-[1.5px] border-[rgba(183,140,51,0.45)]" />
            <User className="w-[26px] h-[26px] text-[#c9a227]" />
          </div>
          <span className="text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-[#c9a227] block mb-[0.45rem]">
            Sistema Institucional
          </span>
          <h1 className="font-serif text-[1.75rem] font-bold text-[#722F37] leading-[1.15] mb-[0.35rem]">
            Control de Acceso
          </h1>
          <p className="text-[0.81rem] text-[#6b6b6b] font-light leading-[1.6]">
            Selecciona tu rol e ingresa tus credenciales.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Role Select */}
          <div className="mb-5">
            <label
              className="block text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-[#2e2e2e] mb-2"
              htmlFor="role"
            >
              Tipo de usuario
            </label>
            <div className="relative">
              <Users className="absolute left-[0.85rem] top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#9a9a9a] pointer-events-none" />
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full py-[0.78rem] pl-10 pr-9 bg-[#fdfcfa] border-[1.5px] border-[#e8e4df] rounded-[3px] font-sans text-[0.875rem] text-[#2e2e2e] outline-none appearance-none transition-all duration-300 focus:border-[#c9a227] focus:shadow-[0_0_0_3px_rgba(183,140,51,0.15)] focus:bg-[#fff]"
                required
              >
                <option value="" disabled>
                  {"-- Seleccionar rol --"}
                </option>
                {tipos.map((t) => (
                  <option key={t.intClvTipoUsuario} value={t.intClvTipoUsuario}>
                    {t.vchTipoUsuario}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-[0.8rem] top-1/2 -translate-y-1/2 w-3 h-3 text-[#9a9a9a] pointer-events-none" />
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1 mb-5">
            <div className="flex-1 h-px bg-[#e8e4df]" />
            <span className="text-[0.62rem] tracking-[0.15em] uppercase text-[#9a9a9a] whitespace-nowrap">
              Credenciales
            </span>
            <div className="flex-1 h-px bg-[#e8e4df]" />
          </div>

          {/* Usuario */}
          <div className="mb-5">
            <label
              className="block text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-[#2e2e2e] mb-2"
              htmlFor="usuario"
            >
              Usuario
            </label>
            <div className="relative">
              <User className="absolute left-[0.85rem] top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#9a9a9a] pointer-events-none" />
              <input
                id="usuario"
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ingresa tu usuario"
                autoComplete="username"
                className="w-full py-[0.78rem] pl-10 pr-4 bg-[#fdfcfa] border-[1.5px] border-[#e8e4df] rounded-[3px] font-sans text-[0.875rem] text-[#2e2e2e] outline-none transition-all duration-300 focus:border-[#c9a227] focus:shadow-[0_0_0_3px_rgba(183,140,51,0.15)] focus:bg-[#fff] placeholder:text-[#9a9a9a] placeholder:font-light"
                required
              />
            </div>
          </div>

          {/* Contrasena */}
          <div className="mb-5">
            <label
              className="block text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-[#2e2e2e] mb-2"
              htmlFor="contrasena"
            >
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-[0.85rem] top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#9a9a9a] pointer-events-none" />
              <input
                id="contrasena"
                type={showPassword ? "text" : "password"}
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="--------"
                autoComplete="current-password"
                className="w-full py-[0.78rem] pl-10 pr-10 bg-[#fdfcfa] border-[1.5px] border-[#e8e4df] rounded-[3px] font-sans text-[0.875rem] text-[#2e2e2e] outline-none transition-all duration-300 focus:border-[#c9a227] focus:shadow-[0_0_0_3px_rgba(183,140,51,0.15)] focus:bg-[#fff] placeholder:text-[#9a9a9a] placeholder:font-light"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-[0.8rem] top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[#9a9a9a] p-0 flex transition-colors duration-300 hover:text-[#c9a227]"
              >
                {showPassword ? (
                  <EyeOff className="w-[15px] h-[15px]" />
                ) : (
                  <Eye className="w-[15px] h-[15px]" />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-[0.78rem] text-red-600 text-center mb-4 bg-red-50 border border-red-200 rounded-[3px] py-2 px-3">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-[0.85rem] bg-[#722F37] text-[#fff] border-none rounded-[3px] font-sans text-[0.85rem] font-semibold tracking-[0.08em] uppercase cursor-pointer flex items-center justify-center gap-[0.55rem] transition-all duration-300 hover:bg-[#1a1a1a] hover:shadow-[0_6px_22px_rgba(0,0,0,0.18)] active:scale-[0.98] disabled:opacity-70"
            style={isLoading ? { background: "#c9a227" } : {}}
          >
            <LogIn className="w-[14px] h-[14px]" />
            {isLoading ? "Verificando..." : "Accesar"}
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-[0.35rem] mt-[1.35rem] text-[0.75rem] font-medium text-[#9a9a9a] no-underline transition-colors duration-300 hover:text-[#c9a227]"
          >
            <ChevronLeft className="w-3 h-3" />
            Volver al inicio
          </Link>
        </form>

        <div className="mt-[1.8rem] pt-[1.4rem] border-t border-[#e8e4df] text-[0.7rem] text-[#9a9a9a] text-center leading-[1.65]">
          {"¿Problemas para acceder?"}&nbsp;
          <Link
            href="mailto:rectoria@uthh.edu.mx"
            className="text-[#c9a227] no-underline hover:text-[#722F37]"
          >
            rectoria@uthh.edu.mx
          </Link>
          &nbsp;·&nbsp; 789 896 2088
        </div>
      </div>
    </div>
  );
}
