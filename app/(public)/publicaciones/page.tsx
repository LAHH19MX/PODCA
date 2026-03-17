import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getConnection } from "@/lib/db";
import ImagenPublicacion from "@/components/imagen-publicacion";

async function getPublicaciones() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT
        intClvPublicacion,
        vchNombrePublicacion,
        dtmFechaPublicacion,
        vchDescripcion,
        vchRutaImagenPublicacion
      FROM tbl_CA_Publicaciones
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
    month: "short",
    day: "numeric",
  });
}

export default async function PublicacionesPage() {
  const publicaciones = await getPublicaciones();
  const featuredMain = publicaciones[0] ?? null;
  const featuredSide = publicaciones.slice(1, 4);
  const mas = publicaciones.slice(4);

  return (
    <>
      {/* PAGE HEADER */}
      <div className="pt-[7rem] pb-14 bg-[#722F37] border-b border-[rgba(183,140,51,0.18)]">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <div>
              <span className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-[#c9a227] block mb-[0.6rem]">
                Conocimiento Abierto
              </span>
              <h1 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-bold text-[#fff] leading-[1.12]">
                Publicaciones
              </h1>
              <p className="text-[0.9rem] text-[rgba(255,255,255,0.5)] mt-[0.6rem] font-light">
                Investigacion, articulos y divulgacion cientifica de la UTHH
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED BLOCK */}
      {featuredMain && (
        <section className="pt-14 pb-0">
          <div className="max-w-[1240px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[6px]">
              {/* Main featured */}
              <Link
                href={`/publicaciones/${featuredMain.intClvPublicacion}`}
                className="relative overflow-hidden bg-[#fff] flex flex-col border border-[#e8e4df] no-underline text-inherit group"
              >
                <div className="relative overflow-hidden shrink-0 aspect-[3/2.2]">
                  <ImagenPublicacion
                    src={
                      featuredMain.vchRutaImagenPublicacion
                        ? `/Publicaciones/${featuredMain.vchRutaImagenPublicacion}`
                        : null
                    }
                    alt={featuredMain.vchNombrePublicacion}
                    size={52}
                  />
                </div>
                <div className="p-[1.6rem_1.75rem_2rem] flex flex-col flex-1">
                  <span className="text-[0.64rem] tracking-[0.14em] uppercase text-[#c9a227] font-semibold mb-[0.45rem] block">
                    {formatFecha(featuredMain.dtmFechaPublicacion)}
                  </span>
                  <p className="font-serif text-[1.5rem] font-bold text-[#722F37] leading-[1.22] mb-[0.7rem]">
                    {featuredMain.vchNombrePublicacion}
                  </p>
                  <p className="text-[0.88rem] text-[#6b6b6b] leading-[1.72] flex-1 line-clamp-4">
                    {featuredMain.vchDescripcion}
                  </p>
                  <div className="flex items-center justify-end mt-[1.4rem] pt-4 border-t border-[#e8e4df]">
                    <span className="text-[0.74rem] font-semibold text-[#c9a227]">
                      Seguir leyendo
                    </span>
                  </div>
                </div>
              </Link>

              {/* Side cards */}
              <div className="flex flex-col gap-[6px]">
                {featuredSide.map((item: any) => (
                  <Link
                    key={item.intClvPublicacion}
                    href={`/publicaciones/${item.intClvPublicacion}`}
                    className="bg-[#fff] border border-[#e8e4df] grid grid-cols-[1fr_160px] flex-1 no-underline text-inherit transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.1)] overflow-hidden group"
                  >
                    <div className="p-[1.1rem_1.2rem] flex flex-col justify-between">
                      <div>
                        <span className="text-[0.64rem] tracking-[0.14em] uppercase text-[#c9a227] font-semibold mb-[0.45rem] block">
                          {formatFecha(item.dtmFechaPublicacion)}
                        </span>
                        <p className="font-serif text-[0.92rem] font-bold text-[#722F37] leading-[1.3] mb-[0.45rem] line-clamp-2">
                          {item.vchNombrePublicacion}
                        </p>
                        <p className="text-[0.78rem] text-[#6b6b6b] leading-[1.6] line-clamp-2">
                          {item.vchDescripcion}
                        </p>
                      </div>
                      <div className="flex items-center justify-end mt-[0.9rem]">
                        <span className="text-[0.74rem] font-semibold text-[#c9a227]">
                          Seguir leyendo
                        </span>
                      </div>
                    </div>
                    <div className="relative overflow-hidden h-full">
                      <ImagenPublicacion
                        src={
                          item.vchRutaImagenPublicacion
                            ? `/Publicaciones/${item.vchRutaImagenPublicacion}`
                            : null
                        }
                        alt={item.vchNombrePublicacion}
                        size={36}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MORE PUBLICATIONS */}
      {mas.length > 0 && (
        <section className="pt-14 pb-20">
          <div className="max-w-[1240px] mx-auto px-8">
            <div className="mb-10">
              <span className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-[#c9a227] block mb-[0.65rem]">
                Todas las publicaciones
              </span>
              <h2 className="font-serif text-[clamp(1.7rem,2.5vw,2.2rem)] font-bold text-[#722F37] leading-[1.15]">
                Mas articulos
              </h2>
              <div className="w-11 h-[3px] bg-[#c9a227] rounded-[2px] mt-[0.9rem]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[6px]">
              {mas.map((pub: any) => (
                <div
                  key={pub.intClvPublicacion}
                  className="bg-[#fff] border border-[#e8e4df] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] group"
                >
                  <div className="relative overflow-hidden aspect-video bg-[#f8f6f3]">
                    <ImagenPublicacion
                      src={
                        pub.vchRutaImagenPublicacion
                          ? `/Publicaciones/${pub.vchRutaImagenPublicacion}`
                          : null
                      }
                      alt={pub.vchNombrePublicacion}
                      size={32}
                    />
                  </div>
                  <div className="p-[1.1rem_1.15rem_1.2rem] flex flex-col flex-1">
                    <span className="text-[0.64rem] tracking-[0.14em] uppercase text-[#c9a227] font-semibold mb-[0.45rem] block">
                      {formatFecha(pub.dtmFechaPublicacion)}
                    </span>
                    <h3 className="font-serif text-[0.9rem] font-semibold text-[#722F37] leading-[1.35] mb-[0.55rem] line-clamp-2">
                      {pub.vchNombrePublicacion}
                    </h3>
                    <p className="text-[0.78rem] text-[#6b6b6b] leading-[1.65] flex-1 line-clamp-3">
                      {pub.vchDescripcion}
                    </p>
                    <div className="flex items-center justify-end mt-4 pt-[0.85rem] border-t border-[#e8e4df]">
                      <Link
                        href={`/publicaciones/${pub.intClvPublicacion}`}
                        className="text-[0.74rem] font-semibold text-[#c9a227] no-underline inline-flex items-center gap-[0.3rem] transition-all duration-300 hover:text-[#722F37] hover:gap-[0.55rem]"
                      >
                        Seguir leyendo
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
