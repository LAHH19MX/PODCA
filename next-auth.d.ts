import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      tipoUser: string;
      chrCarrera: string;
      claveCA: string;
    } & DefaultSession["user"];
  }

  interface User {
    tipoUser: string;
    chrCarrera: string;
    claveCA: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    tipoUser: string;
    chrCarrera: string;
    claveCA: string;
  }
}
