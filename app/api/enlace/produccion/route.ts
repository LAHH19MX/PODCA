import { getConnection } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import sql from "mssql";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ success: false }, { status: 401 });
    const tipoUser = (session.user as any).tipoUser;
    if (tipoUser !== "2") return NextResponse.json({ success: false }, { status: 403 });

    const { searchParams } = new URL(request.url);
    const claveCA = searchParams.get("ca") ?? "";
    const docente = searchParams.get("docente") ?? "";
    const status = searchParams.get("status") ?? "";
    const tipoProducto = searchParams.get("tipo") ?? "";
    const fechaInicio = searchParams.get("fechaInicio") ?? "";
    const fechaFin = searchParams.get("fechaFin") ?? "";

    const pool = await getConnection();
    const req = pool.request();

    let where = "WHERE 1=1";
    if (claveCA) { where += " AND [CLAVE CA] = @ca"; req.input("ca", sql.VarChar, claveCA) }
    if (docente) { where += " AND [NO. TRABAJADOR] = @docente"; req.input("docente", sql.VarChar, docente) }
    if (status) { where += " AND [ID STATUS] = @status"; req.input("status", sql.VarChar, status) }
    if (tipoProducto) { where += " AND [TIPO PRODUCTO] = @tipo"; req.input("tipo", sql.VarChar, tipoProducto) }
    if (fechaInicio) { where += " AND CAST([FECHA REGISTRO] AS DATE) >= @fi"; req.input("fi", sql.VarChar, fechaInicio) }
    if (fechaFin) { where += " AND CAST([FECHA REGISTRO] AS DATE) <= @ff"; req.input("ff", sql.VarChar, fechaFin) }

    const produccion = await req.query(
      `SELECT * FROM view_CA_ProduccionAcademica ${where} ORDER BY [FECHA REGISTRO] DESC`
    );

    const [cuerpos, statusCat, tiposCat] = await Promise.all([
      pool.request().query("SELECT vchClvCA, vchNombreCA FROM tbl_CA_CuerposAcademicos ORDER BY vchNombreCA"),
      pool.request().query("SELECT intClvStatus, vchNombreStatus FROM tbl_CA_Status"),
      pool.request().query("SELECT intClvProducto, vchNombreProducto FROM tbl_CA_Productos"),
    ]);

    return NextResponse.json({
      success: true,
      data: produccion.recordset,
      catalogos: {
        cuerpos: cuerpos.recordset,
        status: statusCat.recordset,
        tipos: tiposCat.recordset,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
