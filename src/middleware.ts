/** @format */

import { type NextRequest, NextResponse, URLPattern } from "next/server";
import { refreshSession } from "./lib/supabase/refresh-session";

const publicRoutes = [
  { path: "/login", whenAuthenticated: "redirect" },
  { path: "/register", whenAuthenticated: "redirect" },
  { path: "/", whenAuthenticated: "next" },
  { path: "/post/:slug", whenAuthenticated: "next" },
  { path: "/confirm-email", whenAuthenticated: "redirect" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/login";
const REDIRECT_WHEN_AUTHENTICATED = "/my-profile/posts";

function findPublicRouteByPath(pathname: string) {
  for (const route of publicRoutes) {
    // Cria padrão baseado no path (ex: /post/:slug)
    const urlPattern = new URLPattern({ pathname: route.path });

    // Testa se o pathname bate com o padrão
    if (urlPattern.test({ pathname })) {
      // Retorna a rota correspondente
      return route;
    }
  }

  // Não encontrou -> rota privada
  return null;
}

export async function middleware(request: NextRequest) {
  const { user, supabaseResponse } = await refreshSession(request);
  const path = request.nextUrl.pathname;

  // 2. VERIFICA SE A ROTA ATUAL É PÚBLICA
  const isPublicRoute = findPublicRouteByPath(path);

  // Regra 1: A rota é PRIVADA (não encontrada na lista pública) e o usuário NÃO está logado.
  if (!isPublicRoute && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;

    // Adiciona a URL original para redirecionar de volta após o login
    redirectUrl.searchParams.set("redirectedFrom", path);
    return NextResponse.redirect(redirectUrl);
  }

  // Regra 2: A rota é PÚBLICA, o usuário ESTÁ logado, e a rota deve redirecionar quando autenticado.
  if (user && isPublicRoute && isPublicRoute.whenAuthenticated === "redirect") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_AUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }

  // Se nenhuma das regras de redirecionamento acima for acionada, o acesso é permitido.
  // Isso cobre os seguintes casos:
  // - Usuário logado em rota privada.
  // - Usuário logado em rota pública que não redireciona.
  // - Usuário deslogado em rota pública.
  // Retornamos a resposta do Supabase para garantir que os cookies da sessão sejam atualizados.
  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
