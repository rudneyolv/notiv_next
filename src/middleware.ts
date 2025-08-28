/** @format */

import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  { path: "/login", whenAuthenticated: "redirect" },
  { path: "/register", whenAuthenticated: "redirect" },
  { path: "/pricing", whenAuthenticated: "next" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/login";
const REDIRECT_WHEN_AUTHENTICATED = "/my-profile/posts";

function isTokenExpired(token: string): boolean {
  if (!token) return true;
  const payload = token.split(".")[1];
  if (!payload) return true;

  const { exp } = JSON.parse(Buffer.from(payload, "base64").toString("utf-8"));
  console.log(exp);
  return exp < Math.floor(Date.now() / 1000);
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const token = request.cookies.get("access_token")?.value;
  const redirectUrl = request.nextUrl.clone();

  // Sem token e rota privada
  if (!token && !publicRoute) {
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }

  // Com token e rota pública que não deve ser acessada logado
  if (token && publicRoute && publicRoute.whenAuthenticated === "redirect") {
    redirectUrl.pathname = REDIRECT_WHEN_AUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }

  // Token expirado em rota privada
  if (token && !publicRoute && isTokenExpired(token)) {
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.delete("access_token");
    return response;
  }

  // Qualquer outro caso > deixa seguir
  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
