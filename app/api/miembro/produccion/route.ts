import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getConnection, sql } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const clvTrabajador = (session.user as any)?.id ?? session.user?.email;
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("usuario", sql.VarChar, clvTrabajador).query(`
        SELECT 
          pr.intClvProduccion        AS id,
          pr.dtmFechaRegistro        AS fechaRegistro,
          pr.intClvProducto          AS clvProducto,
          p.vchNombreProducto        AS tipoProducto,
          pr.vchTituloProducto       AS titulo,
          pr.vchDescripcionBreve     AS descripcion,
          pr.vchImpacto              AS impacto,
          pr.intClaveLineInvestigacion AS clvLinea,
          l.vchDescripcion           AS lineaInvestigacion,
          pr.intStatus               AS idStatus,
          s.vchNombreStatus          AS status,
          pr.bitPerteneCA            AS perteneceCA,
          pr.vchAutores              AS autores,
          pr.vchColaboradores        AS colaboradores,
          pr.vchCAColaborador1_Int   AS clvCA1,
          ca1.vchNombreCA            AS nombreCA1,
          pr.vchCAColaborador2_Int   AS clvCA2,
          ca2.vchNombreCA            AS nombreCA2,
          pr.vchCAColaborador3_Int   AS clvCA3,
          ca3.vchNombreCA            AS nombreCA3,
          pr.vchCAColaborador1_Ext   AS caExterno,
          pr.vchNombreColaboradorExterno AS nombreColaboradorExt,
          pr.RutaArchivo             AS archivo
        FROM tbl_CA_Produccion AS pr
        INNER JOIN tbl_CA_Productos  AS p  ON p.intClvProducto  = pr.intClvProducto
        INNER JOIN tbl_CA_LineaInvestigacion AS l ON l.intClaveLinea = pr.intClaveLineInvestigacion
        INNER JOIN tbl_CA_Status     AS s  ON s.intClvStatus    = pr.intStatus
        LEFT  JOIN tbl_CA_CuerposAcademicos AS ca1 ON pr.vchCAColaborador1_Int = ca1.vchClvCA
        LEFT  JOIN tbl_CA_CuerposAcademicos AS ca2 ON pr.vchCAColaborador2_Int = ca2.vchClvCA
        LEFT  JOIN tbl_CA_CuerposAcademicos AS ca3 ON pr.vchCAColaborador3_Int = ca3.vchClvCA
        WHERE pr.vchClvTrabajador = @usuario
        ORDER BY pr.dtmFechaRegistro DESC
      `);

    return NextResponse.json({ success: true, data: result.recordset });
  } catch (error) {
    console.error("Error GET produccion:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const clvTrabajador = (session.user as any)?.id ?? session.user?.email;
    const chrCarrera = (session.user as any)?.chrCarrera;
    const claveCA = (session.user as any)?.claveCA;

    const body = await request.json();
    const {
      clvProducto,
      titulo,
      descripcion,
      impacto,
      clvLinea,
      clvStatus,
      perteneceCA,
      autores,
      colaboradores,
      clvCA1,
      clvCA2,
      clvCA3,
      caExterno,
      nombreColaboradorExt,
      archivo,
    } = body;

    const pool = await getConnection();

    const result = await pool
      .request()
      .input("intClvProducto", sql.VarChar, clvProducto)
      .input("vchTituloProducto", sql.VarChar, titulo)
      .input("vchDescripcionBreve", sql.VarChar, descripcion)
      .input("vchImpacto", sql.VarChar, impacto)
      .input("intClaveLineInvestigacion", sql.VarChar, clvLinea)
      .input("intStatus", sql.VarChar, clvStatus)
      .input("bitPerteneCA", sql.VarChar, perteneceCA)
      .input("vchAutores", sql.VarChar, autores)
      .input("vchColaboradores", sql.VarChar, colaboradores ?? "")
      .input("vchClvTrabajador", sql.VarChar, clvTrabajador)
      .input("vchCAColaborador1_Int", sql.VarChar, clvCA1 ?? "Ninguno")
      .input("vchCAColaborador2_Int", sql.VarChar, clvCA2 ?? "Ninguno")
      .input("vchCAColaborador3_Int", sql.VarChar, clvCA3 ?? "Ninguno")
      .input("vchCAColaborador1_Ext", sql.VarChar, caExterno ?? "")
      .input(
        "vchNombreColaboradorExterno",
        sql.VarChar,
        nombreColaboradorExt ?? "",
      )
      .input("RutaArchivo", sql.VarChar, archivo ?? "")
      .input("chrCarrera", sql.VarChar, chrCarrera)
      .input("vchClvCA", sql.VarChar, claveCA)
      .execute("sp_CA_SubirProduccion");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error POST produccion:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const body = await request.json();
    const {
      id,
      clvProducto,
      titulo,
      descripcion,
      impacto,
      clvLinea,
      clvStatus,
      perteneceCA,
      autores,
      colaboradores,
      clvCA1,
      clvCA2,
      clvCA3,
      caExterno,
      nombreColaboradorExt,
      archivo,
    } = body;

    const pool = await getConnection();

    // ── Construir el request con inputs ──────────────────────────
    const req = pool
      .request()
      .input("id", sql.Int, id)
      .input("intClvProducto", sql.VarChar, clvProducto)
      .input("vchTituloProducto", sql.VarChar, titulo)
      .input("vchDescripcionBreve", sql.VarChar, descripcion)
      .input("vchImpacto", sql.VarChar, impacto)
      .input("intClaveLineInvestigacion", sql.VarChar, clvLinea)
      .input("intStatus", sql.VarChar, clvStatus)
      .input("bitPerteneCA", sql.VarChar, perteneceCA)
      .input("vchAutores", sql.VarChar, autores)
      .input("vchColaboradores", sql.VarChar, colaboradores ?? "")
      .input("vchCAColaborador1_Int", sql.VarChar, clvCA1 ?? "Ninguno")
      .input("vchCAColaborador2_Int", sql.VarChar, clvCA2 ?? "Ninguno")
      .input("vchCAColaborador3_Int", sql.VarChar, clvCA3 ?? "Ninguno")
      .input("vchCAColaborador1_Ext", sql.VarChar, caExterno ?? "")
      .input(
        "vchNombreColaboradorExterno",
        sql.VarChar,
        nombreColaboradorExt ?? "",
      );

    // ── Agregar @archivo solo si viene ────────────────────────────
    if (archivo) req.input("archivo", sql.VarChar, archivo);

    await req.query(`
      UPDATE tbl_CA_Produccion SET
        intClvProducto              = @intClvProducto,
        vchTituloProducto           = @vchTituloProducto,
        vchDescripcionBreve         = @vchDescripcionBreve,
        vchImpacto                  = @vchImpacto,
        intClaveLineInvestigacion   = @intClaveLineInvestigacion,
        intStatus                   = @intStatus,
        bitPerteneCA                = @bitPerteneCA,
        dtmFechaRegistro            = GETDATE(),
        vchAutores                  = @vchAutores,
        vchColaboradores            = @vchColaboradores,
        vchCAColaborador1_Int       = @vchCAColaborador1_Int,
        vchCAColaborador2_Int       = @vchCAColaborador2_Int,
        vchCAColaborador3_Int       = @vchCAColaborador3_Int,
        vchCAColaborador1_Ext       = @vchCAColaborador1_Ext,
        vchNombreColaboradorExterno = @vchNombreColaboradorExterno
        ${archivo ? ", RutaArchivo = @archivo" : ""}
      WHERE intClvProduccion = @id
    `);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error PUT produccion:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const clvTrabajador = (session.user as any)?.id ?? session.user?.email;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({ error: "ID requerido" }, { status: 400 });

    const pool = await getConnection();

    // Solo puede eliminar su propia producción
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("usuario", sql.VarChar, clvTrabajador).query(`
        DELETE FROM tbl_CA_Produccion 
        WHERE intClvProduccion = @id 
        AND vchClvTrabajador = @usuario
      `);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error DELETE produccion:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}
