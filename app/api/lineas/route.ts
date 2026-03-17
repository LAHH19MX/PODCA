import { getConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const pool = await getConnection();

    const query = `
      SELECT ${limit ? `TOP ${parseInt(limit)}` : ""} 
        tbl_CA_CuerposAcademicos.id,
        tbl_CA_CuerposAcademicos.vchClvCA,
        UPPER(tbl_CA_CuerposAcademicos.vchNombreCA) AS vchNombreCA,
        tbl_CA_CuerposAcademicos.ImagenLogo,
        tblDepartamentos.vchNomDpto
      FROM tbl_CA_CuerposAcademicos 
      INNER JOIN tblDepartamentos 
        ON tbl_CA_CuerposAcademicos.chrCarrera = tblDepartamentos.chrClvDpto
    `;
    const result = await pool.request().query(query);
    return NextResponse.json({ success: true, data: result.recordset });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}
