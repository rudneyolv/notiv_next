/** @format */

import { type NextRequest, NextResponse } from "next/server";
import { refreshSession } from "./lib/supabase/refresh-session";

// Suas constantes e definições de rotas (mantidas exatamente como estavam)
const publicRoutes = [
  { path: "/login", whenAuthenticated: "redirect" },
  { path: "/register", whenAuthenticated: "redirect" },
  { path: "/", whenAuthenticated: "next" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/login";
const REDIRECT_WHEN_AUTHENTICATED = "/my-profile/posts";

export async function middleware(request: NextRequest) {
  // PASSO 1: Iniciar o processo de atualização de sessão do Supabase.
  // Criamos uma resposta base que será usada para passar os cookies atualizados +.

  // A variável `user` agora é nossa única fonte de verdade sobre a autenticação.
  const { user, supabaseResponse } = await refreshSession(request);

  // PASSO 2: lógica de roteamento customizada.
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);

  // Regra 1: Usuário NÃO está logado e tenta acessar uma rota privada.
  if (!user && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;

    // IMPORTANTE: Retornamos um redirect diretamente. O fluxo do middleware para aqui.
    return NextResponse.redirect(redirectUrl);
  }

  // Regra 2: Usuário ESTÁ logado e tenta acessar uma rota que só pode ser vista deslogado (ex: /login).
  if (user && publicRoute && publicRoute.whenAuthenticated === "redirect") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_AUTHENTICATED;

    // IMPORTANTE: Retornamos um redirect diretamente. O fluxo do middleware para aqui.
    return NextResponse.redirect(redirectUrl);
  }

  // PASSO 4: Se nenhum redirecionamento foi feito, retornar a resposta do Supabase.
  // É VITAL retornar este objeto `response`, pois ele contém os cookies de sessão
  // atualizados que o `getUser()` pode ter definido. Retornar um novo `NextResponse.next()`
  // aqui descartaria a atualização da sessão.
  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    // default matcher
    // "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",

    // supabase matcher
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
