"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

interface Publicacion {
  intClvPublicacion: number
  vchNombrePublicacion: string
  dtmFechaPublicacion: string
  vchDescripcion: string
  vchRutaImagenPublicacion: string
}

export default function PublicacionesCarousel({ publicaciones = [] }: { publicaciones: Publicacion[] }) {
  const [pubPage, setPubPage] = useState(0)
  const pubsPerPage = 4
  const totalPubPages = Math.ceil(publicaciones.length / pubsPerPage)
  const visiblePubs = publicaciones.slice(pubPage * pubsPerPage, pubPage * pubsPerPage + pubsPerPage)

  return (
    <>
      <div className="relative flex items-center gap-3">
        <button
          onClick={() => setPubPage((p) => Math.max(0, p - 1))}
          disabled={pubPage === 0}
          className="w-10 h-10 flex items-center justify-center border border-[#e8e4df] bg-[#fff] text-[#722F37] rounded-full transition-all duration-300 hover:bg-[#c9a227] hover:text-[#fff] hover:border-[#c9a227] disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
          aria-label="Publicaciones anteriores"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[3px] flex-1 min-w-0">
          {visiblePubs.map((pub) => (
            <div key={pub.intClvPublicacion} className="bg-[#fff] border border-[#e8e4df] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_20px_52px_rgba(0,0,0,0.14)] group">
              <div className="relative overflow-hidden aspect-video bg-[#f0ece6]">
                <Image
                  src={`/Publicaciones/${pub.vchRutaImagenPublicacion}`}
                  alt={pub.vchNombrePublicacion}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-[1.2rem_1.25rem_1.3rem] flex flex-col flex-1">
                <span className="text-[0.66rem] tracking-[0.14em] uppercase text-[#c9a227] font-semibold mb-2">
                  {new Date(pub.dtmFechaPublicacion).toLocaleDateString('es-MX', { year: 'numeric', month: 'short' })}
                </span>
                <h3 className="font-serif text-[0.95rem] font-semibold text-[#722F37] leading-[1.35] mb-[0.65rem] line-clamp-2">
                  {pub.vchNombrePublicacion}
                </h3>
                <p className="text-[0.825rem] text-[#6b6b6b] leading-[1.66] flex-1 line-clamp-3">
                  {pub.vchDescripcion}
                </p>
                <div className="flex items-center justify-end mt-[1.1rem] pt-[0.9rem] border-t border-[#e8e4df]">
                  <Link href={`/publicaciones/${pub.intClvPublicacion}`} className="text-[0.76rem] font-semibold text-[#c9a227] no-underline flex items-center gap-[0.3rem] transition-all duration-300 hover:text-[#722F37] hover:gap-[0.55rem]">
                    Leer más
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setPubPage((p) => Math.min(totalPubPages - 1, p + 1))}
          disabled={pubPage >= totalPubPages - 1}
          className="w-10 h-10 flex items-center justify-center border border-[#e8e4df] bg-[#fff] text-[#722F37] rounded-full transition-all duration-300 hover:bg-[#c9a227] hover:text-[#fff] hover:border-[#c9a227] disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
          aria-label="Siguientes publicaciones"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
        {Array.from({ length: totalPubPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPubPage(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === pubPage ? "bg-[#c9a227] w-6" : "bg-[#e8e4df] w-2 hover:bg-[#9a9a9a]"
            }`}
            aria-label={`Pagina ${i + 1}`}
          />
        ))}
      </div>
    </>
  )
}