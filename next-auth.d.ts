import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
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
    id: string;
    tipoUser: string;
    chrCarrera: string;
    claveCA: string;
  }
}
