import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getConnection, sql } from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const clvTrabajador = (session.user as any)?.id ?? session.user?.email;

    const formData = await request.formData();
    const file = formData.get("imagen") as File | null;

    if (!file)
      return NextResponse.json(
        { error: "No se recibió archivo" },
        { status: 400 },
      );

    // Validar extensión
    const ext = path.extname(file.name).toLowerCase();
    const validExts = [".jpg", ".jpeg", ".png", ".bmp"];
    if (!validExts.includes(ext))
      return NextResponse.json(
        { error: "Extensión inválida. Solo jpg, jpeg, png, bmp" },
        { status: 400 },
      );

    // Nombre único para evitar colisiones
    const nombreArchivo = `${clvTrabajador}_${Date.now()}${ext}`;
    const rutaDestino = path.join(
      process.cwd(),
      "public",
      "ImagenPerfil",
      nombreArchivo,
    );

    // Guardar el archivo
    const bytes = await file.arrayBuffer();
    await writeFile(rutaDestino, Buffer.from(bytes));

    // Actualizar en BD
    const pool = await getConnection();
    await pool
      .request()
      .input("usuario", sql.VarChar, clvTrabajador)
      .input("imagen", sql.VarChar, nombreArchivo).query(`
        UPDATE tbl_CA_CATrabajador 
        SET ImagenPerfil = @imagen 
        WHERE vchClvTrabajador = @usuario
      `);

    return NextResponse.json({ success: true, nombreArchivo });
  } catch (error) {
    console.error("Error subir imagen:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}
