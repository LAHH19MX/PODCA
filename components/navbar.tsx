"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 h-[68px] bg-[rgba(105,27,49,0.97)] backdrop-blur-[18px] border-b border-[rgba(201,162,39,0.2)] shadow-[0_2px_20px_rgba(0,0,0,0.25)]">
      <Link href="/" className="flex items-center gap-3 no-underline">
        <span className="font-serif text-[1.3rem] font-bold text-[#fff] tracking-[0.06em]">
          UTHH
        </span>
      </Link>
      <ul className="hidden md:flex items-center gap-10 list-none">
        <li>
          <Link
            href="/cuerpos-academicos"
            className={`text-[rgba(255,255,255,0.7)] no-underline text-[0.875rem] font-medium tracking-[0.02em] transition-colors duration-300 hover:text-[#fff] relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#c9a227] after:rounded-[2px] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${pathname === "/cuerpos-academicos" ? "text-[#fff] after:scale-x-100" : ""}`}
          >
            Cuerpos Academicos
          </Link>
        </li>
        <li>
          <Link
            href="/publicaciones"
            className={`text-[rgba(255,255,255,0.7)] no-underline text-[0.875rem] font-medium tracking-[0.02em] transition-colors duration-300 hover:text-[#fff] relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#c9a227] after:rounded-[2px] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${pathname === "/publicaciones" ? "text-[#fff] after:scale-x-100" : ""}`}
          >
            Divulgacion
          </Link>
        </li>
        <li>
          <Link
            href="/login"
            className="px-[1.4rem] py-[0.48rem] bg-[#c9a227] text-[#1a1a1a] rounded-[50px] font-semibold text-[0.85rem] transition-all duration-300 hover:bg-[#ddb94a] hover:shadow-[0_6px_18px_rgba(201,162,39,0.35)] no-underline"
          >
            Iniciar sesion
          </Link>
        </li>
      </ul>
    </nav>
  )
}
