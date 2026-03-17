import { getConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input("id", parseInt(params.id)).query(`
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
    if (result.recordset.length === 0) {
      return NextResponse.json(
        { success: false, error: "No encontrado" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: result.recordset[0] });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}
