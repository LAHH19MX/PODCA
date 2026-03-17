import { getConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const pool = await getConnection();

    const query = limit
      ? `SELECT TOP ${parseInt(limit)} intClvPublicacion, vchNombrePublicacion, 
         dtmFechaPublicacion, vchDescripcion, vchRutaImagenPublicacion 
         FROM tbl_CA_Publicaciones ORDER BY dtmFechaPublicacion DESC`
      : `SELECT intClvPublicacion, vchNombrePublicacion, 
         dtmFechaPublicacion, vchDescripcion, vchRutaImagenPublicacion 
         FROM tbl_CA_Publicaciones ORDER BY dtmFechaPublicacion DESC`;

    const result = await pool.request().query(query);
    return NextResponse.json({ success: true, data: result.recordset });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}
