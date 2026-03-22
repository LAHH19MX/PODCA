import { getConnection } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import sql from "mssql";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ success: false }, { status: 401 });
    const tipoUser = (session.user as any).tipoUser;
    if (tipoUser !== "2") return NextResponse.json({ success: false }, { status: 403 });

    const pool = await getConnection();

    const [representantes, perfiles] = await Promise.all([
      pool.request().query(`
        SELECT
          ct.id,
          ct.vchClvCA AS claveCA,
          ct.vchClvTrabajador AS noTrabajador,
          t.vchAPaterno + ' ' + t.vchAMaterno + ' ' + t.vchNombre AS nombre,
          ct.chrCarrera AS claveDpto,
          d.vchNomDpto AS departamento,
          ct.intClvPerfilPROMEP AS clavePerfil,
          p.vchNombrePerfil AS perfil
        FROM tbl_CA_CATrabajador ct
        INNER JOIN tblTrabajadores t ON ct.vchClvTrabajador = t.vchClvTrabajador
        INNER JOIN tbl_CA_PerfilesPROMEP p ON ct.intClvPerfilPROMEP = p.intClvPerfilPROMEP
        LEFT JOIN tblDepartamentos d ON ct.chrCarrera = d.chrClvDpto
        WHERE ct.intClvTipoUsuario = '6'
        ORDER BY t.vchAPaterno
      `),
      pool.request().query("SELECT TOP 200 intClvPerfilPROMEP, vchNombrePerfil FROM tbl_CA_PerfilesPROMEP"),
    ]);

    return NextResponse.json({
      success: true,
      data: representantes.recordset,
      catalogos: { perfiles: perfiles.recordset },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ success: false }, { status: 401 });
    const tipoUser = (session.user as any).tipoUser;
    if (tipoUser !== "2") return NextResponse.json({ success: false }, { status: 403 });

    const body = await request.json();
    const { claveTrab, perfil, carrera } = body;

    if (!claveTrab || !perfil || !carrera)
      return NextResponse.json({ success: false, error: "Faltan datos requeridos" }, { status: 400 });

    const hoy = new Date().toISOString().split("T")[0];
    const pool = await getConnection();
    const result = await pool.request()
      .input("clave", sql.VarChar, claveTrab)
      .input("fecha", sql.VarChar, hoy)
      .input("perfil", sql.VarChar, perfil)
      .input("clave_CA", sql.VarChar, "NA")
      .input("tipoUser", sql.VarChar, "6")
      .input("chrCarrera", sql.VarChar, carrera)
      .input("FechPReg", sql.DateTime, new Date())
      .input("FechPVen", sql.DateTime, new Date())
      .output("CodRetorno", sql.Int)
      .execute("sp_CA_RegistrarRepresentante");

    const codRetorno = result.output.CodRetorno;
    if (codRetorno > 0)
      return NextResponse.json({ success: false, error: "El trabajador ya está registrado como representante." });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ success: false }, { status: 401 });
    const tipoUser = (session.user as any).tipoUser;
    if (tipoUser !== "2") return NextResponse.json({ success: false }, { status: 403 });

    const body = await request.json();
    const { id, claveTrab, perfil, carrera, noTrabajadorAnterior } = body;

    if (!id || !claveTrab || !perfil || !carrera)
      return NextResponse.json({ success: false, error: "Faltan datos requeridos" }, { status: 400 });

    const pool = await getConnection();

    // Verificar que no sea ya representante en esa carrera (distinto registro)
    const check = await pool.request()
      .input("trab", sql.VarChar, claveTrab)
      .input("carr", sql.VarChar, carrera)
      .query(`SELECT id FROM tbl_CA_CATrabajador
              WHERE vchClvTrabajador = @trab AND chrCarrera = @carr AND intClvTipoUsuario = '6'`);

    if (check.recordset.length > 0 && String(check.recordset[0].id) !== String(id))
      return NextResponse.json({ success: false, error: "Este trabajador ya es representante en esta carrera." });

    const updateResult = await pool.request()
      .input("trab", sql.VarChar, claveTrab)
      .input("perfil", sql.VarChar, perfil)
      .input("carrera", sql.VarChar, carrera)
      .input("id", sql.Int, parseInt(id))
      .query(`UPDATE tbl_CA_CATrabajador
              SET vchClvTrabajador = @trab, intClvPerfilPROMEP = @perfil,
                  dtmFchRegistro = GETDATE(), chrCarrera = @carrera
              WHERE id = @id`);

    if (updateResult.rowsAffected[0] === 0)
      return NextResponse.json({ success: false, error: "No se encontró el registro a actualizar" }, { status: 404 });

    // Reasignar representante en cuerpos académicos si cambió el trabajador
    if (noTrabajadorAnterior && noTrabajadorAnterior !== claveTrab) {
      await pool.request()
        .input("nuevo", sql.VarChar, claveTrab)
        .input("anterior", sql.VarChar, noTrabajadorAnterior)
        .query(`UPDATE tbl_CA_CuerposAcademicos
                SET vchClvTrabajadorRepresentante = @nuevo
                WHERE vchClvTrabajadorRepresentante = @anterior`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
