import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#722F37] text-[rgba(255,255,255,0.7)] pt-[4.5rem] pb-8 border-t border-[rgba(201,162,39,0.25)]">
      <div className="max-w-[1240px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-[rgba(255,255,255,0.12)]" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
          {/* Brand */}
          <div>
            <p className="font-serif text-[1.4rem] text-[#fff] font-bold mb-5">UTHH</p>
            <p className="text-[0.83rem] leading-[1.85] mb-3">
              Carretera Huejutla-Chalahuiyapa S/N,<br />
              Col. Tepoxteco, Huejutla de Reyes,<br />
              Hidalgo, C.P. 43000
            </p>
            <p className="text-[0.82rem] mb-2">
              Tel: <Link href="tel:7898962088" className="text-[#c9a227] no-underline transition-colors duration-300 hover:text-[#ddb94a]">789 896 2088</Link>
            </p>
            <p className="text-[0.82rem] mb-2">
              Email: <Link href="mailto:rectoria@uthh.edu.mx" className="text-[#c9a227] no-underline transition-colors duration-300 hover:text-[#ddb94a]">rectoria@uthh.edu.mx</Link>
            </p>
            <div className="flex gap-[0.65rem] mt-5">
              {["facebook", "twitter", "instagram"].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="w-9 h-9 bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] rounded-full flex items-center justify-center text-[rgba(255,255,255,0.7)] no-underline transition-all duration-300 hover:bg-[#c9a227] hover:border-[#c9a227] hover:text-[#1a1a1a] hover:-translate-y-0.5"
                  aria-label={social}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {social === "facebook" && <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />}
                    {social === "twitter" && <><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></>}
                    {social === "instagram" && <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>}
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Navegacion */}
          <div>
            <h4 className="text-[0.72rem] tracking-[0.16em] uppercase text-[#fff] font-semibold mb-5">Navegacion</h4>
            <ul className="list-none">
              {[
                { label: "Inicio", href: "/" },
                { label: "Cuerpos Academicos", href: "/cuerpos-academicos" },
                { label: "Publicaciones", href: "/publicaciones" },
                { label: "Iniciar sesion", href: "/login" },
              ].map((item) => (
                <li key={item.href} className="mb-[0.65rem]">
                  <Link href={item.href} className="text-[0.83rem] text-[rgba(255,255,255,0.6)] no-underline transition-colors duration-300 hover:text-[#c9a227]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Investigacion */}
          <div>
            <h4 className="text-[0.72rem] tracking-[0.16em] uppercase text-[#fff] font-semibold mb-5">Investigacion</h4>
            <ul className="list-none">
              {["PRODEP", "CONACYT", "ResearchGate", "Academia.edu"].map((item) => (
                <li key={item} className="mb-[0.65rem]">
                  <Link href="#" className="text-[0.83rem] text-[rgba(255,255,255,0.6)] no-underline transition-colors duration-300 hover:text-[#c9a227]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[0.72rem] tracking-[0.16em] uppercase text-[#fff] font-semibold mb-5">Legal</h4>
            <ul className="list-none">
              {["Aviso de privacidad", "Terminos de uso", "Politica de cookies"].map((item) => (
                <li key={item} className="mb-[0.65rem]">
                  <Link href="#" className="text-[0.83rem] text-[rgba(255,255,255,0.6)] no-underline transition-colors duration-300 hover:text-[#c9a227]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 text-center">
          <p className="text-[0.78rem] text-[rgba(255,255,255,0.45)]">
            &copy; {new Date().getFullYear()} <strong className="text-[rgba(201,162,39,0.9)] font-medium">Universidad Tecnologica de la Huasteca Hidalguense</strong>. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
