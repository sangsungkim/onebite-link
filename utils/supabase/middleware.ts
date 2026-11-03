import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const createClient = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // 세션을 검증하고 필요하면 토큰을 갱신한다.
  const { data } = await supabase.auth.getClaims();

  // 로그인하지 않은 사용자는 보호된 페이지에 접근할 수 없다.
  const { pathname } = request.nextUrl;
  const isProtected =
    pathname === "/" ||
    pathname === "/new" ||
    pathname === "/reset-password" ||
    pathname.startsWith("/folder/");

  if (isProtected && !data?.claims) {
    const redirectResponse = NextResponse.redirect(
      new URL("/login", request.url)
    );
    // 갱신된 세션 쿠키를 리다이렉트 응답에도 유지한다.
    supabaseResponse.cookies.getAll().forEach((cookie) =>
      redirectResponse.cookies.set(cookie)
    );
    return redirectResponse;
  }

  return supabaseResponse;
};
