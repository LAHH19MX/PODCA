import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getConnection, sql } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const claveCA = (session.user as any)?.claveCA;
    const pool = await getConnection();

    const result = await pool.request().input("claveCA", sql.VarChar, claveCA)
      .query(`
        SELECT
          pr.intClvProduccion            AS id,
          pr.dtmFechaRegistro            AS fechaRegistro,
          p.vchNombreProducto            AS tipoProducto,
          pr.vchTituloProducto           AS titulo,
          pr.vchDescripcionBreve         AS descripcion,
          pr.vchImpacto                  AS impacto,
          l.vchDescripcion               AS lineaInvestigacion,
          s.vchNombreStatus              AS status,
          pr.vchAutores                  AS autores,
          pr.vchColaboradores            AS colaboradores,
          pr.RutaArchivo                 AS archivo,
          t.vchNombre + ' ' + t.vchAPaterno + ' ' + t.vchAMaterno AS nombreMiembro
        FROM tbl_CA_Produccion AS pr
        INNER JOIN tbl_CA_Productos           AS p  ON p.intClvProducto   = pr.intClvProducto
        INNER JOIN tbl_CA_LineaInvestigacion  AS l  ON l.intClaveLinea    = pr.intClaveLineInvestigacion
        INNER JOIN tbl_CA_Status              AS s  ON s.intClvStatus     = pr.intStatus
        INNER JOIN tblTrabajadores            AS t  ON t.vchClvTrabajador = pr.vchClvTrabajador
        WHERE pr.vchClvCA = @claveCA
        ORDER BY pr.dtmFechaRegistro DESC
      `);

    return NextResponse.json({ success: true, data: result.recordset });
  } catch (error) {
    console.error("Error GET publicaciones CA:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}
