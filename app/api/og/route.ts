import type { NextRequest } from "next/server";
import { fetchOpenGraph } from "@/lib/open-graph";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return Response.json({ error: "url 파라미터가 필요합니다." }, { status: 400 });
  }

  try {
    return Response.json(await fetchOpenGraph(url));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "오픈 그래프 정보를 가져오지 못했습니다.";
    return Response.json({ error: message }, { status: 422 });
  }
}
