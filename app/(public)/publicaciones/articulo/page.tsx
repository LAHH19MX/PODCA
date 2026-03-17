"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const relatedArticles = [
  { tag: "Innovacion", title: "Automatizacion Agricola Mediante Sensores IoT", author: "Dr. M. Hernandez · 2024" },
  { tag: "Educacion", title: "Competencias Digitales Docentes Post-Pandemia", author: "Dr. M. Hernandez · 2024" },
  { tag: "Tecnologia", title: "Blockchain para Trazabilidad Agroalimentaria", author: "Dr. M. Hernandez · 2023" },
  { tag: "Salud", title: "Telemedicina Rural: Experiencias en la Huasteca", author: "Dr. M. Hernandez · 2023" },
]

const morePublications = [
  { tag: "Educacion", title: "Competencias Digitales Docentes Post-Pandemia", excerpt: "Evaluacion de la adopcion de herramientas digitales en el personal docente, identificando brechas formativas.", author: "Mtra. A. Ramirez", image: "/images/pub-1.jpg" },
  { tag: "Gestion", title: "Modelos Agiles en PyMEs de la Region Huasteca", excerpt: "Estudio comparativo de metodologias agiles midiendo efectos en productividad y satisfaccion del cliente.", author: "Dr. J. Mendoza", image: "/images/pub-2.jpg" },
  { tag: "Mecatronica", title: "Robotica Colaborativa en Lineas de Manufactura Local", excerpt: "Implementacion de brazos roboticos colaborativos en empresas del parque industrial de Huejutla.", author: "Ing. P. Soto", image: "/images/pub-3.jpg" },
  { tag: "Matematicas", title: "Modelos Predictivos para Gestion de Recursos Hidricos", excerpt: "Aplicacion de modelos estadisticos para optimizar la distribucion del agua en la region Huasteca.", author: "Dr. H. Torres", image: "/images/pub-4.jpg" },
  { tag: "Sustentabilidad", title: "Energia Solar Fotovoltaica: Caso Huasteca Hidalguense", excerpt: "Analisis tecnico-economico de sistemas fotovoltaicos en viviendas rurales de la Huasteca Hidalguense.", author: "Mtra. L. Gutierrez", image: "/images/pub-1.jpg" },
  { tag: "Salud", title: "Deteccion Temprana de Enfermedades Cronicas con ML", excerpt: "Modelo de machine learning aplicado a datos clinicos para anticipar diabetes e hipertension.", author: "Dr. R. Perez", image: "/images/pub-2.jpg" },
  { tag: "Innovacion", title: "Automatizacion Agricola Mediante Sensores IoT", excerpt: "Red de sensores inalambricos para monitoreo de cultivos en tiempo real, reduciendo costos.", author: "Ing. C. Flores", image: "/images/pub-3.jpg" },
  { tag: "Negocios", title: "Emprendimiento Universitario en Zonas Rurales", excerpt: "Analisis de factores que impulsan o limitan el emprendimiento entre egresados universitarios.", author: "Mtra. S. Cruz", image: "/images/pub-4.jpg" },
]

export default function ArticuloPage() {
  const [morePubPage, setMorePubPage] = useState(0)
  const pubsPerPage = 4
  const totalPages = Math.ceil(morePublications.length / pubsPerPage)
  const visiblePubs = morePublications.slice(morePubPage * pubsPerPage, morePubPage * pubsPerPage + pubsPerPage)

  return (
    <>
      {/* ARTICLE HEADER */}
      <div className="pt-[6.5rem]">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="mb-8">
            {/* Breadcrumb */}
            <div className="text-[0.75rem] text-[#9a9a9a] mb-5 flex items-center gap-2">
              <Link href="/" className="text-[#c9a227] no-underline hover:text-[#722F37]">Inicio</Link>
              <span>/</span>
              <Link href="/publicaciones" className="text-[#c9a227] no-underline hover:text-[#722F37]">Publicaciones</Link>
              <span>/</span>
              <span>Articulo</span>
            </div>

            <span className="inline-block text-[0.64rem] font-bold tracking-[0.18em] uppercase text-[#c9a227] border border-[rgba(183,140,51,0.4)] px-3 py-1 rounded-[3px] mb-4">
              Tecnologia
            </span>

            <h1 className="font-serif text-[clamp(1.9rem,3.5vw,3rem)] font-bold text-[#722F37] leading-[1.1] max-w-[820px] mb-5">
              Inteligencia Artificial en Entornos Educativos Rurales de la Huasteca Hidalguense: Retos, Avances y Perspectivas
            </h1>

            <div className="flex items-center gap-6 flex-wrap">
              <div className="text-[0.8rem] text-[#9a9a9a] flex items-center gap-[0.4rem]">
                <Clock className="w-[14px] h-[14px] text-[#c9a227] shrink-0" />
                <span>8 min de lectura</span>
              </div>
              <div className="text-[0.8rem] text-[#9a9a9a] flex items-center gap-[0.4rem]">
                <Calendar className="w-[14px] h-[14px] text-[#c9a227] shrink-0" />
                <span>12 de enero, 2025</span>
              </div>
              <div className="text-[0.8rem] text-[#9a9a9a] flex items-center gap-[0.4rem]">
                <User className="w-[14px] h-[14px] text-[#c9a227] shrink-0" />
                <span>Dr. Miguel Hernandez Reyes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="relative overflow-hidden aspect-[21/8]">
            <Image
              src="/images/pub-1.jpg"
              alt="Imagen principal del articulo"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* TWO COLUMNS */}
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] items-start py-12 pb-20">
            {/* LEFT: Article content */}
            <div className="pr-0 lg:pr-16 lg:border-r lg:border-[#e8e4df]">
              <div className="flex items-center gap-6 flex-wrap py-[1.4rem] border-t border-b border-[#e8e4df] mb-10">
                <span className="text-[0.8rem] text-[#9a9a9a]"><strong className="text-[#2e2e2e]">Publicado:</strong> 12 de enero de 2025</span>
                <span className="text-[0.8rem] text-[#9a9a9a]"><strong className="text-[#2e2e2e]">Autor:</strong> Dr. Miguel Hernandez Reyes</span>
                <span className="text-[0.8rem] text-[#9a9a9a]"><strong className="text-[#2e2e2e]">CA:</strong> Tecnologias de Informacion y Comunicacion</span>
              </div>

              <div className="text-[1rem] leading-[1.9] text-[#2e2e2e]">
                <p className="mb-6">
                  La incorporacion de herramientas de inteligencia artificial (IA) en el ambito educativo representa uno de los cambios mas significativos de la ultima decada. Sin embargo, su adopcion en zonas rurales de Mexico, y particularmente en la region de la Huasteca Hidalguense, enfrenta desafios estructurales que van mas alla de la simple disponibilidad tecnologica. Conectividad limitada, infraestructura obsoleta, formacion docente insuficiente y barreras culturales configuran un panorama complejo donde la tecnologia, por si sola, resulta insuficiente.
                </p>
                <p className="mb-6">
                  Este articulo presenta los resultados de una investigacion de dos anos llevada a cabo en colaboracion con seis instituciones educativas del municipio de Huejutla de Reyes y comunidades aledanas. El objetivo principal fue evaluar la viabilidad tecnica, pedagogica y social de implementar sistemas de IA adaptativa en entornos con conectividad intermitente y recursos computacionales limitados.
                </p>

                <h2 className="font-serif text-[1.5rem] font-bold text-[#722F37] mt-10 mb-4 leading-[1.2]">Contexto y justificacion</h2>
                <p className="mb-6">
                  La Huasteca Hidalguense alberga a mas de 400,000 personas, de las cuales aproximadamente el 38% habita en localidades con acceso deficiente a servicios de internet. Segun datos del INEGI 2020, el 54% de los hogares en zonas rurales del municipio de Huejutla carece de computadora, y solo el 23% cuenta con acceso a internet fijo.
                </p>

                <blockquote className="border-l-[3px] border-[#c9a227] px-6 py-2 my-8 italic text-[#6b6b6b] bg-[#faf5e4] rounded-r-[4px]">
                  {'"La inteligencia artificial no puede ser un privilegio de las ciudades. Si no resolvemos la brecha tecnologica en las comunidades rurales, estaremos ensanchando la desigualdad educativa, no reduciendola."'}
                  <br /><br />{"-- Dr. Miguel Hernandez Reyes"}
                </blockquote>

                <h2 className="font-serif text-[1.5rem] font-bold text-[#722F37] mt-10 mb-4 leading-[1.2]">Metodologia</h2>
                <p className="mb-6">
                  La investigacion adopto un enfoque mixto que combino analisis cuantitativo del desempeno academico con observacion etnografica y entrevistas a profundidad con docentes, estudiantes y padres de familia. En total, participaron 847 alumnos de nivel primaria y secundaria, 64 docentes y 12 directivos escolares distribuidos en las seis instituciones participantes.
                </p>

                <h3 className="font-serif text-[1.15rem] font-semibold text-[#722F37] mt-8 mb-[0.8rem]">Fases del estudio</h3>
                <ul className="ml-6 mb-6">
                  <li className="mb-2 text-[0.97rem]"><strong>Fase I - Diagnostico:</strong> Inventario de dispositivos, analisis de conectividad, evaluaciones diagnosticas a alumnos.</li>
                  <li className="mb-2 text-[0.97rem]"><strong>Fase II - Implementacion:</strong> Instalacion del sistema, capacitacion docente, seguimiento semanal de metricas de uso.</li>
                  <li className="mb-2 text-[0.97rem]"><strong>Fase III - Evaluacion:</strong> Comparacion de resultados pre y post intervencion, focus groups, ajustes al modelo.</li>
                </ul>

                {/* ADDITIONAL IMAGES SECTION */}
                <h2 className="font-serif text-[1.5rem] font-bold text-[#722F37] mt-10 mb-4 leading-[1.2]">Galeria del proyecto</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="relative overflow-hidden aspect-[4/3] rounded-[4px]">
                    <Image
                      src="/images/pub-3.jpg"
                      alt="Imagen adicional del articulo 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative overflow-hidden aspect-[4/3] rounded-[4px]">
                    <Image
                      src="/images/pub-4.jpg"
                      alt="Imagen adicional del articulo 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <h2 className="font-serif text-[1.5rem] font-bold text-[#722F37] mt-10 mb-4 leading-[1.2]">Resultados principales</h2>
                <p className="mb-6">
                  Los datos recabados al concluir el ciclo de implementacion mostraron resultados alentadores. En promedio, los alumnos que utilizaron AulaAdaptativa de manera regular mejoraron su puntuacion en evaluaciones estandarizadas de matematicas en un 18.4% respecto al grupo de control. En comprension lectora, la mejora fue del 12.7%.
                </p>

                <h2 className="font-serif text-[1.5rem] font-bold text-[#722F37] mt-10 mb-4 leading-[1.2]">Conclusiones y proyecciones</h2>
                <p className="mb-6">
                  La evidencia recabada permite sostener que la IA tiene potencial real para contribuir a la mejora educativa en contextos rurales, siempre y cuando su implementacion este guiada por un profundo conocimiento del contexto local, una formacion docente continua y sostenida, y una infraestructura tecnologica minima pero confiable.
                </p>
              </div>
            </div>

            {/* RIGHT: Sidebar */}
            <div className="pl-0 lg:pl-10 mt-12 lg:mt-0 lg:sticky lg:top-[88px]">
              {/* Author card */}
              <div className="bg-[#fff] border border-[#e8e4df] p-[1.4rem] mb-10">
                <div className="w-[60px] h-[60px] rounded-full bg-[#faf5e4] flex items-center justify-center mb-[0.9rem] overflow-hidden border-2 border-[#faf5e4]">
                  <User className="w-[30px] h-[30px] text-[#c9a227] opacity-40" />
                </div>
                <p className="font-serif text-[1rem] font-bold text-[#722F37] mb-[0.2rem]">Dr. Miguel Hernandez Reyes</p>
                <p className="text-[0.75rem] text-[#c9a227] font-semibold tracking-[0.06em] mb-3">{"Cuerpo Academico CA · 01 - Tecnologia"}</p>
                <p className="text-[0.8rem] text-[#6b6b6b] leading-[1.65]">
                  Doctor en Ciencias Computacionales por el CINVESTAV. Investigador SNI Nivel I. Especialista en inteligencia artificial aplicada a entornos educativos de bajo recurso y comunidades rurales de Mexico.
                </p>
              </div>

              {/* Related articles */}
              <div className="mb-10">
                <p className="font-serif text-[0.95rem] font-bold text-[#722F37] mb-5 pb-[0.65rem] border-b-2 border-[#faf5e4] flex items-center gap-2">
                  <span className="inline-block w-3 h-[2px] bg-[#c9a227] shrink-0" />
                  Articulos del autor
                </p>

                {relatedArticles.map((article, i) => (
                  <Link key={i} href="/publicaciones/articulo" className="grid grid-cols-[80px_1fr] gap-[0.9rem] py-[0.95rem] border-b border-[#e8e4df] no-underline text-inherit transition-colors duration-300 group first:border-t first:border-[#e8e4df]">
                    <div className="overflow-hidden aspect-square relative">
                      <Image
                        src={`/images/pub-${(i % 4) + 1}.jpg`}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[0.6rem] font-bold tracking-[0.14em] uppercase text-[#c9a227] mb-[0.3rem] block">{article.tag}</span>
                      <p className="font-serif text-[0.85rem] font-semibold text-[#722F37] leading-[1.3] transition-colors duration-300 group-hover:text-[#c9a227] line-clamp-2">{article.title}</p>
                      <p className="text-[0.7rem] text-[#9a9a9a] mt-[0.35rem]">{article.author}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MORE PUBLICATIONS */}
      <section className="bg-[#f8f6f3] py-20 border-t border-[#e8e4df]">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="flex items-end justify-between gap-8 mb-10 flex-wrap">
            <div>
              <span className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-[#c9a227] block mb-[0.65rem]">Explorar</span>
              <h2 className="font-serif text-[clamp(1.7rem,2.5vw,2.2rem)] font-bold text-[#722F37] leading-[1.15]">Mas publicaciones</h2>
              <div className="w-11 h-[3px] bg-[#c9a227] rounded-[2px] mt-[0.9rem]" />
            </div>
            <Link href="/publicaciones" className="inline-flex items-center gap-[0.45rem] px-[1.35rem] py-[0.55rem] bg-[#722F37] text-[#fff] rounded-[4px] text-[0.8rem] font-semibold no-underline transition-colors duration-300 hover:bg-[#c9a227]">
              Ver todas
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Carousel with side buttons */}
          <div className="relative flex items-center gap-3">
            {/* Left button */}
            <button
              onClick={() => setMorePubPage((p) => Math.max(0, p - 1))}
              disabled={morePubPage === 0}
              className="w-10 h-10 flex items-center justify-center border border-[#e8e4df] bg-[#fff] text-[#722F37] rounded-full transition-all duration-300 hover:bg-[#c9a227] hover:text-[#fff] hover:border-[#c9a227] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#fff] disabled:hover:text-[#722F37] disabled:hover:border-[#e8e4df] shrink-0"
              aria-label="Publicaciones anteriores"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[6px] flex-1 min-w-0">
              {visiblePubs.map((pub, i) => (
                <div key={`${morePubPage}-${i}`} className="bg-[#fff] border border-[#e8e4df] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
                  <div className="relative overflow-hidden aspect-video">
                    <Image
                      src={pub.image}
                      alt={pub.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-[1.1rem_1.15rem_1.2rem] flex flex-col flex-1">
                    <span className="text-[0.64rem] tracking-[0.14em] uppercase text-[#c9a227] font-semibold mb-[0.45rem] block">{pub.tag}</span>
                    <h3 className="font-serif text-[0.88rem] font-semibold text-[#722F37] leading-[1.35] mb-2">{pub.title}</h3>
                    <p className="text-[0.78rem] text-[#6b6b6b] leading-[1.65] flex-1 line-clamp-3">{pub.excerpt}</p>
                    <div className="flex items-center justify-between mt-4 pt-[0.85rem] border-t border-[#e8e4df]">
                      <span className="text-[0.73rem] text-[#9a9a9a] font-medium">{pub.author}</span>
                      <Link href="/publicaciones/articulo" className="text-[0.74rem] font-semibold text-[#c9a227] no-underline inline-flex items-center gap-[0.3rem] transition-all duration-300 hover:text-[#722F37]">
                        Seguir leyendo
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right button */}
            <button
              onClick={() => setMorePubPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={morePubPage >= totalPages - 1}
              className="w-10 h-10 flex items-center justify-center border border-[#e8e4df] bg-[#fff] text-[#722F37] rounded-full transition-all duration-300 hover:bg-[#c9a227] hover:text-[#fff] hover:border-[#c9a227] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#fff] disabled:hover:text-[#722F37] disabled:hover:border-[#e8e4df] shrink-0"
              aria-label="Siguientes publicaciones"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Page indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setMorePubPage(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === morePubPage ? "bg-[#c9a227] w-6" : "bg-[#e8e4df] hover:bg-[#9a9a9a]"
                }`}
                aria-label={`Pagina ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
