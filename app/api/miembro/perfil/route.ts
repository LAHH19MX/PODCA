import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getConnection, sql } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const claveCA = (session.user as any)?.claveCA;
    const clvTrabajador = (session.user as any)?.id ?? session.user?.email;

    const pool = await getConnection();

    const [perfil, imagen, departamento, cuerpo] = await Promise.all([
      pool.request().input("usuario", sql.VarChar, clvTrabajador).query(`
          UPDATE tblTrabajadores SET descripcion_puesto='' 
          WHERE (descripcion_puesto IS NULL) AND (vchClvTrabajador=@usuario);
          SELECT vchNombre, vchAPaterno, vchAMaterno, descripcion_puesto 
          FROM tblTrabajadores WHERE vchClvTrabajador=@usuario
        `),

      pool.request().input("usuario", sql.VarChar, clvTrabajador).query(`
          UPDATE tbl_CA_CATrabajador SET ImagenPerfil='sin imagen.jpg' 
          WHERE (ImagenPerfil IS NULL) AND (vchClvTrabajador=@usuario);
          SELECT ImagenPerfil FROM tbl_CA_CATrabajador 
          WHERE vchClvTrabajador=@usuario
        `),

      pool.request().input("usuario", sql.VarChar, clvTrabajador).query(`
          SELECT DISTINCT Dep.chrClvDpto as Clave, Dep.vchNomDpto as Carrera 
          FROM tblDepartamentos AS Dep
          INNER JOIN tblCarreras Carr ON Dep.chrClvDpto = Carr.chrClvDpto
          INNER JOIN tblTrabajadores ON tblTrabajadores.chrClvDptoTrab = Dep.chrClvDpto
          WHERE Dep.chrClvDpto <> '00' AND Carr.bitActiva=1 
          AND tblTrabajadores.vchClvTrabajador=@usuario
        `),

      pool.request().input("claveCA", sql.VarChar, claveCA).query(`
          SELECT vchNombreCA FROM tbl_CA_CuerposAcademicos 
          WHERE vchClvCA=@claveCA
        `),
    ]);

    const perfilDetalle = await pool
      .request()
      .input("usuario", sql.VarChar, clvTrabajador)
      .input("claveCA", sql.VarChar, claveCA)
      .query(`exec paPerfilMiembro @usuario, @claveCA`);

    const trabajador = perfil.recordset[0] ?? null;
    const imagenRow = imagen.recordset[0] ?? null;
    const deptRow = departamento.recordset[0] ?? null;
    const cuerpoRow = cuerpo.recordset[0] ?? null;
    const detalleRow = perfilDetalle.recordset[0] ?? null;

    return NextResponse.json({
      success: true,
      data: {
        nombre: trabajador
          ? `${trabajador.vchNombre} ${trabajador.vchAPaterno} ${trabajador.vchAMaterno}`
          : "",
        descripcionPuesto: trabajador?.descripcion_puesto ?? "",
        imagen:
          detalleRow?.ImagenPerfil ??
          imagenRow?.ImagenPerfil ??
          "sin imagen.jpg",
        departamento: deptRow?.Carrera ?? "",
        cuerpoAcademico:
          detalleRow?.vchNombreCA ?? cuerpoRow?.vchNombreCA ?? "",
        claveCA: detalleRow?.vchClvCA ?? claveCA,
        nombreCA: detalleRow?.vchNombreCA ?? "",
        sexo: detalleRow?.chrSexoTrab ?? "",
        telefono: detalleRow?.vchTelefono ?? "",
        correoInstitucional: detalleRow?.vchEmail ?? "",
        lineaActual: detalleRow?.intLineaInvestigacion ?? "",
        perfilProdep: detalleRow?.intClvPerfilPROMEP ?? "",
        fechaInicioProdep: detalleRow?.dtmFchInicioPROMEP ?? null,
        fechaVencimientoProdep: detalleRow?.dtmFchVencimientoPROMEP ?? null,
        correoPersonal: detalleRow?.vchEmailPersonal ?? "",
        tieneRegistro: !!detalleRow,
      },
    });
  } catch (error) {
    console.error("Error GET perfil miembro:", error);
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

    const clvTrabajador = (session.user as any)?.id ?? session.user?.email;
    const body = await request.json();

    const {
      telefono,
      correoPersonal,
      lineaActual,
      perfilProdep,
      fechaInicioProdep,
      fechaVencimientoProdep,
      imagen,
    } = body;

    const pool = await getConnection();

    const query = `
      UPDATE tbl_CA_CATrabajador SET 
        dtmFchRegistro = GETDATE(),
        dtmFchInicioPROMEP = @fechaInicio,
        dtmFchVencimientoPROMEP = @fechaVenc,
        vchTelefono = @telefono,
        intLineaInvestigacion = @lineaActual,
        intClvPerfilPROMEP = @perfilProdep,
        vchEmailPersonal = @correoPersonal
        ${imagen ? ", ImagenPerfil = @imagen" : ""}
      WHERE vchClvTrabajador = @usuario
    `;

    const req = pool
      .request()
      .input("usuario", sql.VarChar, clvTrabajador)
      .input("telefono", sql.VarChar, telefono)
      .input("correoPersonal", sql.VarChar, correoPersonal)
      .input("lineaActual", sql.VarChar, String(lineaActual))
      .input("perfilProdep", sql.VarChar, String(perfilProdep))
      .input("fechaInicio", sql.Date, fechaInicioProdep)
      .input("fechaVenc", sql.Date, fechaVencimientoProdep);

    if (imagen) req.input("imagen", sql.VarChar, imagen);

    await req.query(query);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error PUT perfil miembro:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}
