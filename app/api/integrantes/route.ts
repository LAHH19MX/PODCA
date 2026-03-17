import { getConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clvCA = searchParams.get("clvCA");
    const pool = await getConnection();

    const result = await pool.request().input("clvCA", clvCA).query(`
        SELECT DISTINCT
          tbl_CA_CATrabajador.vchClvTrabajador AS clave,
          tblTrabajadores.vchAPaterno + ' ' + tblTrabajadores.vchAMaterno + ' ' + tblTrabajadores.vchNombre AS nombre,
          tbl_CA_CATrabajador.vchEmailPersonal AS correo
        FROM tbl_CA_CATrabajador
        INNER JOIN tblTrabajadores ON tbl_CA_CATrabajador.vchClvTrabajador = tblTrabajadores.vchClvTrabajador
        WHERE (intClvTipoUsuario = '3' AND tbl_CA_CATrabajador.vchClvCA = @clvCA)
           OR (intClvTipoUsuario = '6' AND tbl_CA_CATrabajador.vchClvCA = @clvCA)
      `);
    return NextResponse.json({ success: true, data: result.recordset });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}
