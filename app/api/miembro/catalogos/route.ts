import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getConnection, sql } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const chrCarrera = (session.user as any)?.chrCarrera;
    const claveCA = (session.user as any)?.claveCA;

    const pool = await getConnection();

    const [productos, status, lineas, cuerpos, lgac, perfilesProdep] =
      await Promise.all([
        pool
          .request()
          .query(
            `SELECT intClvProducto, vchNombreProducto FROM tbl_CA_Productos`,
          ),
        pool
          .request()
          .query(`SELECT intClvStatus, vchNombreStatus FROM tbl_CA_Status`),
        pool
          .request()
          .input("chrCarrera", sql.VarChar, chrCarrera)
          .input("claveCA", sql.VarChar, claveCA).query(`
          SELECT intClaveLinea, vchDescripcion 
          FROM tbl_CA_LineaInvestigacion 
          WHERE chrCarrera = @chrCarrera AND vchClvCA = @claveCA
        `),
        pool
          .request()
          .query(`SELECT vchClvCA, vchNombreCA FROM tbl_CA_CuerposAcademicos`),
        pool
          .request()
          .query(`SELECT intClvLGAC, vchNombreLGAC FROM tbl_CA_CALGAC`),
        pool
          .request()
          .query(
            `SELECT intClvPerfilPROMEP, vchNombrePerfil FROM tbl_CA_PerfilesPROMEP`,
          ),
      ]);

    return NextResponse.json({
      success: true,
      data: {
        productos: productos.recordset,
        status: status.recordset,
        lineas: lineas.recordset,
        cuerpos: cuerpos.recordset,
        lgac: lgac.recordset,
        perfilesProdep: perfilesProdep.recordset,
      },
    });
  } catch (error) {
    console.error("Error GET catalogos:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}
