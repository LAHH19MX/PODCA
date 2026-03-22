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
    const clave = searchParams.get("clave") ?? "";

    const pool = await getConnection();
    const result = await pool.request()
      .input("clave", sql.VarChar, clave)
      .execute("sp_CA_ObtenerDocentesPorCarrera");

    return NextResponse.json({ success: true, data: result.recordset });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
