import { getConnection } from "@/lib/db";
import CuerposAcademicosClient from "@/components/cuerpos-academicos-client";

async function getCuerposAcademicos() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT
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

export default async function CuerposAcademicosPage() {
  const cuerposAcademicos = await getCuerposAcademicos();
  return <CuerposAcademicosClient cuerposAcademicos={cuerposAcademicos} />;
}
