import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Si intenta entrar al dashboard sin sesión → login
  if (pathname.startsWith("/dashboard") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Si ya tiene sesión e intenta ir al login → dashboard
  if (pathname === "/login" && isLoggedIn) {
    const tipoUser = (req.auth?.user as any)?.tipoUser;
    return NextResponse.redirect(new URL(getRedirectPath(tipoUser), req.url));
  }
});

function getRedirectPath(tipoUser: string | undefined): string {
  switch (tipoUser) {
    case "2":
      return "/dashboard/enlace";
    case "3":
      return "/dashboard/miembro";
    case "6":
      return "/dashboard/representante";
    default:
      return "/dashboard";
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
