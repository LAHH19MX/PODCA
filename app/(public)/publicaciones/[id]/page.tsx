import { getConnection } from "@/lib/db";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import { notFound } from "next/navigation";
import ImagenPublicacion from "@/components/imagen-publicacion";
import PublicacionesCarousel from "@/components/publicaciones-carousel";

async function getPublicacion(id: string) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("id", parseInt(id)).query(`
        SELECT
          intClvPublicacion,
          vchNombrePublicacion,
          dtmFechaPublicacion,
          vchDescripcion,
          vchRutaImagenPublicacion,
          vchRutaImagen1,
          vchRutaImagen2,
          tblTrabajadores.vchNombre,
          tblTrabajadores.vchAPaterno,
          tblTrabajadores.vchAMaterno
        FROM tbl_CA_Publicaciones
        INNER JOIN tblTrabajadores
          ON tbl_CA_Publicaciones.vchClvTrabajador = tblTrabajadores.vchClvTrabajador
        WHERE intClvPublicacion = @id
      `);
    return result.recordset[0] ?? null;
  } catch {
    return null;
  }
}

async function getMasPublicaciones(excludeId: string) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("id", parseInt(excludeId)).query(`
        SELECT TOP 8
          intClvPublicacion,
          vchNombrePublicacion,
          dtmFechaPublicacion,
          vchDescripcion,
          vchRutaImagenPublicacion
        FROM tbl_CA_Publicaciones
        WHERE intClvPublicacion != @id
        ORDER BY dtmFechaPublicacion DESC
      `);
    return result.recordset;
  } catch {
    return [];
  }
}

function formatFecha(fecha: string) {
  return new Date(fecha).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticuloPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pub = await getPublicacion(id);
  if (!pub) notFound();

  const masPublicaciones = await getMasPublicaciones(id);
  const autor = `${pub.vchNombre} ${pub.vchAPaterno} ${pub.vchAMaterno}`.trim();

  const imagenes = [
    pub.vchRutaImagenPublicacion,
    pub.vchRutaImagen1,
    pub.vchRutaImagen2,
  ].filter(Boolean);

  return (
    <>
      {/* ARTICLE HEADER */}
      <div className="pt-[6.5rem]">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="mb-8">
            {/* Breadcrumb */}
            <div className="text-[0.75rem] text-[#9a9a9a] mb-5 flex items-center gap-2">
              <Link
                href="/"
                className="text-[#c9a227] no-underline hover:text-[#722F37]"
              >
                Inicio
              </Link>
              <span>/</span>
              <Link
                href="/publicaciones"
                className="text-[#c9a227] no-underline hover:text-[#722F37]"
              >
                Publicaciones
              </Link>
              <span>/</span>
              <span className="line-clamp-1">{pub.vchNombrePublicacion}</span>
            </div>

            <h1 className="font-serif text-[clamp(1.9rem,3.5vw,3rem)] font-bold text-[#722F37] leading-[1.1] max-w-[820px] mb-5">
              {pub.vchNombrePublicacion}
            </h1>

            <div className="flex items-center gap-6 flex-wrap">
              <div className="text-[0.8rem] text-[#9a9a9a] flex items-center gap-[0.4rem]">
                <Calendar className="w-[14px] h-[14px] text-[#c9a227] shrink-0" />
                <span>{formatFecha(pub.dtmFechaPublicacion)}</span>
              </div>
              <div className="text-[0.8rem] text-[#9a9a9a] flex items-center gap-[0.4rem]">
                <User className="w-[14px] h-[14px] text-[#c9a227] shrink-0" />
                <span>{autor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="max-w-[1240px] mx-auto px-8 mb-12">
          <div className="relative overflow-hidden aspect-[21/8] bg-[#f8f6f3]">
            <ImagenPublicacion
              src={
                pub.vchRutaImagenPublicacion
                  ? `/Publicaciones/${pub.vchRutaImagenPublicacion}`
                  : null
              }
              alt={pub.vchNombrePublicacion}
              size={52}
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] items-start pb-20">
            {/* LEFT */}
            <div className="pr-0 lg:pr-16 lg:border-r lg:border-[#e8e4df]">
              <div className="flex items-center gap-6 flex-wrap py-[1.4rem] border-t border-b border-[#e8e4df] mb-10">
                <span className="text-[0.8rem] text-[#9a9a9a]">
                  <strong className="text-[#2e2e2e]">Publicado:</strong>{" "}
                  {formatFecha(pub.dtmFechaPublicacion)}
                </span>
                <span className="text-[0.8rem] text-[#9a9a9a]">
                  <strong className="text-[#2e2e2e]">Autor:</strong> {autor}
                </span>
              </div>

              <div className="text-[1rem] leading-[1.9] text-[#2e2e2e] whitespace-pre-line mb-10">
                {pub.vchDescripcion}
              </div>

              {(pub.vchRutaImagen1 || pub.vchRutaImagen2) && (
                <>
                  <h2 className="font-serif text-[1.5rem] font-bold text-[#722F37] mt-10 mb-4 leading-[1.2]">
                    Galeria del proyecto
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {pub.vchRutaImagen1 && (
                      <div className="relative overflow-hidden aspect-[4/3] rounded-[4px] bg-[#f8f6f3]">
                        <ImagenPublicacion
                          src={`/Publicaciones/${pub.vchRutaImagen1}`}
                          alt="Imagen adicional 1"
                          size={32}
                        />
                      </div>
                    )}
                    {pub.vchRutaImagen2 && (
                      <div className="relative overflow-hidden aspect-[4/3] rounded-[4px] bg-[#f8f6f3]">
                        <ImagenPublicacion
                          src={`/Publicaciones/${pub.vchRutaImagen2}`}
                          alt="Imagen adicional 2"
                          size={32}
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* RIGHT: Sidebar */}
            <div className="pl-0 lg:pl-10 mt-12 lg:mt-0 lg:sticky lg:top-[88px]">
              <div className="bg-[#fff] border border-[#e8e4df] p-[1.4rem] mb-10">
                <div className="w-[60px] h-[60px] rounded-full bg-[#faf5e4] flex items-center justify-center mb-[0.9rem]">
                  <User className="w-[30px] h-[30px] text-[#c9a227] opacity-40" />
                </div>
                <p className="font-serif text-[1rem] font-bold text-[#722F37] mb-[0.2rem]">
                  {autor}
                </p>
                <p className="text-[0.75rem] text-[#c9a227] font-semibold tracking-[0.06em]">
                  Autor
                </p>
              </div>

              {imagenes.length > 0 && (
                <div className="bg-[#fff] border border-[#e8e4df] p-[1.4rem]">
                  <p className="font-serif text-[0.95rem] font-bold text-[#722F37] mb-4">
                    Imagenes
                  </p>
                  <div className="flex flex-col gap-3">
                    {imagenes.map((img, i) => (
                      <div
                        key={i}
                        className="relative overflow-hidden aspect-video rounded-[4px] bg-[#f8f6f3]"
                      >
                        <ImagenPublicacion
                          src={`/Publicaciones/${img}`}
                          alt={`Imagen ${i + 1}`}
                          size={24}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MAS PUBLICACIONES */}
      {masPublicaciones.length > 0 && (
        <section className="bg-[#f8f6f3] py-20 border-t border-[#e8e4df]">
          <div className="max-w-[1240px] mx-auto px-8">
            <div className="flex items-end justify-between gap-8 mb-10 flex-wrap">
              <div>
                <span className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-[#c9a227] block mb-[0.65rem]">
                  Explorar
                </span>
                <h2 className="font-serif text-[clamp(1.7rem,2.5vw,2.2rem)] font-bold text-[#722F37] leading-[1.15]">
                  Mas publicaciones
                </h2>
                <div className="w-11 h-[3px] bg-[#c9a227] rounded-[2px] mt-[0.9rem]" />
              </div>
              <Link
                href="/publicaciones"
                className="inline-flex items-center gap-[0.45rem] px-[1.35rem] py-[0.55rem] bg-[#722F37] text-[#fff] rounded-[4px] text-[0.8rem] font-semibold no-underline transition-colors duration-300 hover:bg-[#c9a227]"
              >
                Ver todas
              </Link>
            </div>
            <PublicacionesCarousel publicaciones={masPublicaciones} />
          </div>
        </section>
      )}
    </>
  );
}
