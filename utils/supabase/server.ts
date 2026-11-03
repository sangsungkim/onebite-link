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

// 현재 로그인된 사용자의 ID와 함께 클라이언트를 반환한다.
// 조회 쿼리에서 user_id로 필터링할 때 사용한다.
export const createUserClient = async () => {
  const supabase = await createRequestClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims.sub;
  if (!userId) throw new Error("로그인이 필요합니다.");
  return { supabase, userId };
};
