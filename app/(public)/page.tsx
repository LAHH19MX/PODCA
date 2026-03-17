import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PublicacionesCarousel from "@/components/publicaciones-carousel";
import ImagenCA from "@/components/imagen-ca";
import { getConnection } from "@/lib/db";

async function getCuerposAcademicos() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT TOP 6
        tbl_CA_CuerposAcademicos.id,
        tbl_CA_CuerposAcademicos.vchClvCA,
        UPPER(tbl_CA_CuerposAcademicos.vchNombreCA) AS vchNombreCA,
        tbl_CA_CuerposAcademicos.ImagenLogo,
        tblDepartamentos.vchNomDpto
      FROM tbl_CA_CuerposAcademicos
      INNER JOIN tblDepartamentos
        ON tbl_CA_CuerposAcademicos.chrCarrera = tblDepartamentos.chrClvDpto
    `);
    return result.recordset;
  } catch {
    return [];
  }
}

async function getPublicaciones() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT TOP 8
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

export default async function HomePage() {
  const cuerposAcademicos = await getCuerposAcademicos();
  const publicaciones = await getPublicaciones();

  return (
    <>
      {/* HERO */}
      <section className="relative h-svh min-h-[580px] flex items-end overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Vivero Universitario UTHH"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.82)] via-[rgba(10,10,10,0.28)] to-[rgba(10,10,10,0.05)]" />
        <div className="relative z-10 px-8 lg:px-14 pb-14 max-w-[680px]">
          <h1 className="font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold text-white leading-[1.12] mb-4">
            Formando lideres del{" "}
            <em className="italic text-[#ddb94a]">conocimiento</em>
            <br />y la innovacion
          </h1>
          <p className="text-[1rem] text-[rgba(255,255,255,0.68)] max-w-[480px] leading-[1.75] font-light">
            Investigacion, ciencia y tecnologia al servicio del desarrollo de la
            region Huasteca.
          </p>
        </div>
      </section>

      {/* CUERPOS ACADEMICOS */}
      <section id="cuerpos" className="py-24 bg-[#fdfcfa]">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="flex items-end justify-between gap-8 flex-wrap mb-12">
            <div>
              <span className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-[#c9a227] block mb-[0.65rem]">
                Investigacion & Ciencia
              </span>
              <h2 className="font-serif text-[clamp(1.9rem,3.2vw,2.65rem)] font-bold text-[#722F37] leading-[1.15]">
                Cuerpos Academicos
                <br />
                de la UTHH
              </h2>
              <div className="w-11 h-[3px] bg-[#c9a227] rounded-[2px] mt-4" />
            </div>
            <Link
              href="/cuerpos-academicos"
              className="inline-flex items-center gap-[0.45rem] px-6 py-[0.6rem] bg-transparent text-[#722F37] border-[1.5px] border-[rgba(30,30,30,0.35)] rounded-[50px] text-[0.82rem] font-semibold no-underline transition-all duration-300 hover:bg-[#c9a227] hover:text-white hover:border-[#c9a227] shrink-0"
            >
              Ver todos
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cuerposAcademicos.map((ca: any) => (
              <div
                key={ca.id}
                className="bg-white border border-[#e8e4df] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)] group"
              >
                <div className="relative overflow-hidden aspect-[16/10] bg-[#f0ece6]">
                  <ImagenCA
                    src={ca.ImagenLogo ? `/LogoTiposCA/${ca.ImagenLogo}` : null}
                    alt={ca.vchNombreCA}
                  />
                  <span className="absolute top-4 left-4 font-serif text-[0.78rem] font-bold text-[#c9a227] tracking-[0.12em] bg-[rgba(0,0,0,0.55)] backdrop-blur-[6px] px-[0.65rem] py-1 rounded-[4px] border-l-2 border-[#c9a227]">
                    {ca.vchClvCA}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-[1.05rem] font-semibold text-[#722F37] leading-[1.3] mb-1">
                    {ca.vchNombreCA}
                  </h3>
                  <p className="text-[0.78rem] text-[#6b6b6b] mb-4">
                    {ca.vchNomDpto}
                  </p>
                  <Link
                    href={`/cuerpos-academicos?CA=${ca.vchClvCA}`}
                    className="inline-flex items-center gap-[0.4rem] px-[1.1rem] py-[0.46rem] bg-transparent border border-[rgba(183,140,51,0.65)] text-[#c9a227] rounded-[4px] text-[0.74rem] font-semibold no-underline tracking-[0.02em] transition-all duration-300 hover:bg-[#c9a227] hover:text-white hover:border-[#c9a227]"
                  >
                    <Phone className="w-[10px] h-[10px]" />
                    Contactar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PUBLICACIONES */}
      <section id="publicaciones" className="py-24 bg-[#fdfcfa]">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="flex items-end justify-between gap-8 flex-wrap mb-10">
            <div>
              <span className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-[#c9a227] block mb-[0.65rem]">
                Conocimiento Abierto
              </span>
              <h2 className="font-serif text-[clamp(1.9rem,3.2vw,2.65rem)] font-bold text-[#722F37] leading-[1.15]">
                Ultimas Publicaciones
              </h2>
              <div className="w-11 h-[3px] bg-[#c9a227] rounded-[2px] mt-4" />
            </div>
            <Link
              href="/publicaciones"
              className="inline-flex items-center gap-[0.45rem] px-[1.4rem] py-[0.6rem] bg-[#722F37] text-white rounded-[4px] text-[0.82rem] font-semibold no-underline transition-all duration-300 hover:bg-[#c9a227] shrink-0"
            >
              Ver todas
            </Link>
          </div>
          <PublicacionesCarousel publicaciones={publicaciones} />
        </div>
      </section>
    </>
  );
}
