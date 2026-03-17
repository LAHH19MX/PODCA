import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getConnection } from "@/lib/db";
import sql from "mssql";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        tipo: { label: "Tipo" },
        usuario: { label: "Usuario" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const pool = await getConnection();
          const result = await pool
            .request()
            .input("clave", sql.VarChar, credentials.tipo)
            .input("trabajador", sql.VarChar, credentials.usuario)
            .input("password", sql.VarChar, credentials.password)
            .execute("sp_CA_BuscarUsuario");

          if (result.recordset.length === 0) return null;

          const row = result.recordset[result.recordset.length - 1];

          // Si el tipo seleccionado no coincide con el tipo real → acceso denegado
          if (String(row.intClvTipoUsuario) !== String(credentials.tipo)) {
            return null;
          }

          return {
            id: String(credentials.usuario),
            name: String(row.Expr1),
            tipoUser: String(row.intClvTipoUsuario),
            chrCarrera: String(row.chrCarrera),
            claveCA: String(row.vchClvCA),
          };
        } catch (error) {
          console.error("=== Error en authorize ===", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.tipoUser = (user as any).tipoUser;
        token.chrCarrera = (user as any).chrCarrera;
        token.claveCA = (user as any).claveCA;
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as any).tipoUser = token.tipoUser;
      (session.user as any).chrCarrera = token.chrCarrera;
      (session.user as any).claveCA = token.claveCA;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
