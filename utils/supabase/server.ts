import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { connection } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const createClient = (cookieStore: Awaited<ReturnType<typeof cookies>>) => {
  return createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if the proxy refreshes user sessions.
        }
      },
    },
  });
};

// 세션이 있으면 Supabase가 토큰 만료 확인에 Date.now()를 사용하므로,
// 프리렌더링 중 호출되지 않도록 요청 시점까지 미룬다.
export const createRequestClient = async () => {
  await connection();
  return createClient(await cookies());
};
