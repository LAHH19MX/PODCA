import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const clvTrabajador = (session.user as any)?.id ?? session.user?.email;

    const formData = await request.formData();
    const file = formData.get("archivo") as File | null;

    if (!file)
      return NextResponse.json(
        { error: "No se recibió archivo" },
        { status: 400 },
      );

    const ext = path.extname(file.name).toLowerCase();
    const validExts = [
      ".doc",
      ".docx",
      ".xlsx",
      ".pdf",
      ".pptx",
      ".jpg",
      ".jpeg",
      ".png",
      ".mp4",
    ];
    if (!validExts.includes(ext))
      return NextResponse.json(
        { error: "Extensión inválida" },
        { status: 400 },
      );

    const nombreArchivo = `${clvTrabajador}_${Date.now()}${ext}`;
    const rutaDestino = path.join(
      process.cwd(),
      "public",
      "ProduccionAcademica",
      nombreArchivo,
    );

    const bytes = await file.arrayBuffer();
    await writeFile(rutaDestino, Buffer.from(bytes));

    return NextResponse.json({ success: true, nombreArchivo });
  } catch (error) {
    console.error("Error subir archivo produccion:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}
