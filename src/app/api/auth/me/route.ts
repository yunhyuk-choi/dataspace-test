import { fetchFromBackend } from "@/lib/proxyClient";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  console.log("MEME", accessToken);

  const { response, newTokens } = await fetchFromBackend(`users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const data = await response.arrayBuffer();

  const nextResponse = new NextResponse(data, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });

  // 6. ★ 중요: 유틸리티가 갱신된 토큰을 반환했다면 쿠키 업데이트
  if (newTokens) {
    // 액세스 토큰 갱신
    nextResponse.cookies.set("accessToken", newTokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      // maxAge 설정이 필요하면 추가
    });

    // 리프레시 토큰도 갱신되었다면 업데이트
    if (newTokens.refreshToken) {
      nextResponse.cookies.set("refreshToken", newTokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
    }
  }

  // 7. (선택 사항) 만약 401로 최종 실패했다면 쿠키 삭제
  if (response.status === 401) {
    nextResponse.cookies.delete("accessToken");
    nextResponse.cookies.delete("refreshToken");
  }

  return nextResponse;
}
