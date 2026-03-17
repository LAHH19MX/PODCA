"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { Globe, BookOpen, Building2, Users, ArrowRight, Search, FlaskConical } from "lucide-react"
import Link from "next/link"

const caDestacados = [
  { num: "CA·01", nombre: "Tecnologias de Informacion y Comunicacion", area: "Tecnologia", publicaciones: 28 },
  { num: "CA·03", nombre: "Administracion y Gestion Empresarial", area: "Negocios", publicaciones: 18 },
  { num: "CA·06", nombre: "Energias Renovables y Medio Ambiente", area: "Sustentabilidad", publicaciones: 16 },
]

const publicacionesRecientes = [
  { titulo: "IA en Entornos Educativos Rurales de la Huasteca", tag: "Tecnologia", autor: "Dr. M. Hernandez", fecha: "12 ene 2025" },
  { titulo: "Energia Solar Fotovoltaica: Caso Huasteca", tag: "Sustentabilidad", autor: "Mtra. L. Gutierrez", fecha: "08 ene 2025" },
  { titulo: "Deteccion Temprana de Enfermedades con ML", tag: "Salud", autor: "Dr. R. Perez", fecha: "05 ene 2025" },
  { titulo: "Automatizacion Agricola Mediante Sensores IoT", tag: "Innovacion", autor: "Ing. C. Flores", fecha: "28 dic 2024" },
  { titulo: "Modelos Agiles en PyMEs de la Region Huasteca", tag: "Gestion", autor: "Dr. J. Mendoza", fecha: "20 dic 2024" },
]

const lineasInvestigacion = [
  "Aplicacion de las TIC en la Region",
  "Desarrollo de Software e Innovacion",
  "Capital Humano y Competitividad",
  "Procesos de Produccion y Calidad",
  "Metodos Estadisticos Aplicados",
  "Tecnologias Verdes y Eficiencia Energetica",
  "Tecnologias Aplicadas a la Salud",
]

export default function ExternoDashboard() {
  return (
    <DashboardLayout role="externo">
      <div className="mb-8">
        <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#c9a227] block mb-2">Acceso externo</span>
        <h1 className="font-serif text-[1.8rem] font-bold text-[#722F37] leading-tight">Explorar Investigacion</h1>
        <p className="text-[0.85rem] text-[#6b6b6b] mt-1">Accede a la produccion academica y cuerpos academicos de la UTHH.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[6px] mb-8">
        <StatCard icon={Building2} label="Cuerpos academicos" value="7" sub="Activos en la UTHH" />
        <StatCard icon={BookOpen} label="Publicaciones" value="124" sub="Acceso abierto" />
        <StatCard icon={Users} label="Investigadores" value="14" sub="Perfiles disponibles" />
        <StatCard icon={FlaskConical} label="Lineas LGAC" value="7" sub="Areas de investigacion" />
      </div>

      {/* Search */}
      <div className="bg-[#fff] border border-[#e8e4df] p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-[14px] h-[14px] text-[#c9a227]" />
          <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Buscar publicaciones</h3>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#9a9a9a]" />
            <input
              type="text"
              placeholder="Buscar por titulo, autor, area..."
              className="w-full py-[0.7rem] pl-10 pr-4 bg-[#fdfcfa] border-[1.5px] border-[#e8e4df] rounded-[3px] font-sans text-[0.85rem] text-[#2e2e2e] outline-none transition-all duration-300 focus:border-[#c9a227] focus:shadow-[0_0_0_3px_rgba(183,140,51,0.15)] placeholder:text-[#9a9a9a] placeholder:font-light"
            />
          </div>
          <button className="px-5 py-[0.7rem] bg-[#722F37] text-[#fff] rounded-[3px] text-[0.82rem] font-semibold transition-colors duration-300 hover:bg-[#c9a227] cursor-pointer border-none">
            Buscar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[6px] mb-8">
        {/* CA Destacados */}
        <div className="lg:col-span-2 bg-[#fff] border border-[#e8e4df] p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Building2 className="w-[14px] h-[14px] text-[#c9a227]" />
              <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Cuerpos academicos destacados</h3>
            </div>
            <Link href="/dashboard/externo/explorar" className="text-[0.72rem] font-semibold text-[#c9a227] no-underline hover:text-[#722F37] transition-colors duration-300">
              Ver todos
            </Link>
          </div>
          <div className="flex flex-col">
            {caDestacados.map((ca, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-[#e8e4df] last:border-b-0">
                <div className="flex items-center gap-4">
                  <span className="font-serif text-[0.72rem] font-bold text-[#c9a227] tracking-[0.12em] bg-[rgba(0,0,0,0.85)] px-[0.5rem] py-0.5 rounded-[3px] border-l-2 border-[#c9a227] shrink-0">
                    {ca.num}
                  </span>
                  <div>
                    <p className="text-[0.85rem] font-medium text-[#2e2e2e]">{ca.nombre}</p>
                    <p className="text-[0.72rem] text-[#9a9a9a]">{ca.area} · {ca.publicaciones} publicaciones</p>
                  </div>
                </div>
                <Link href="/dashboard/externo/explorar" className="text-[0.72rem] font-semibold text-[#c9a227] no-underline flex items-center gap-1 hover:text-[#722F37] transition-colors duration-300">
                  Ver
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Lineas de investigacion */}
        <div className="bg-[#fff] border border-[#e8e4df] p-6">
          <div className="flex items-center gap-2 mb-5">
            <FlaskConical className="w-[14px] h-[14px] text-[#c9a227]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Lineas de investigacion</h3>
          </div>
          <ul className="list-none">
            {lineasInvestigacion.map((linea, i) => (
              <li key={i} className="flex items-start gap-2 py-2 border-b border-[#e8e4df] last:border-b-0">
                <div className="w-[5px] h-[5px] rounded-full bg-[#c9a227] mt-[7px] shrink-0" />
                <p className="text-[0.82rem] text-[#2e2e2e] leading-[1.5]">{linea}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Publicaciones recientes */}
      <div className="bg-[#fff] border border-[#e8e4df] p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Globe className="w-[14px] h-[14px] text-[#c9a227]" />
            <h3 className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#c9a227]">Publicaciones recientes</h3>
          </div>
          <Link href="/dashboard/externo/publicaciones" className="text-[0.72rem] font-semibold text-[#c9a227] no-underline hover:text-[#722F37] transition-colors duration-300">
            Ver todas
          </Link>
        </div>
        <div className="flex flex-col">
          {publicacionesRecientes.map((pub, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-[#e8e4df] last:border-b-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#faf5e4] flex items-center justify-center rounded-[3px] shrink-0">
                  <BookOpen className="w-[12px] h-[12px] text-[#c9a227]" />
                </div>
                <div>
                  <p className="text-[0.82rem] font-medium text-[#2e2e2e]">{pub.titulo}</p>
                  <p className="text-[0.7rem] text-[#9a9a9a]">{pub.tag} · {pub.autor}</p>
                </div>
              </div>
              <span className="text-[0.7rem] text-[#9a9a9a] shrink-0">{pub.fecha}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
