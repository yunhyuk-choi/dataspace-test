import { fetchFromBackend } from "@/lib/proxyClient";
import { NextRequest, NextResponse } from "next/server";

async function proxyHandler(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    // 1. 경로 및 쿼리 스트링 조립
    const { path } = await params;
    const pathString = path.join("/");
    const searchParams = request.nextUrl.searchParams.toString();
    const endpoint = `/${pathString}${searchParams ? `?${searchParams}` : ""}`;

    // 2. 요청 바디 추출 (GET/HEAD 제외)
    const body =
      request.method !== "GET" && request.method !== "HEAD" ? await request.text() : undefined;

    // 3. fetchFromBackend 유틸리티 호출
    // (여기서 토큰 갱신 및 재요청 로직이 내부적으로 수행됩니다)
    const { response, newTokens } = await fetchFromBackend(endpoint, {
      method: request.method,
      // 클라이언트 헤더를 전달하되, host 등은 fetchFromBackend나 fetch 내부에서 처리됨
      // 주의: fetchFromBackend 내부에서 Authorization 헤더를 덮어씌우므로 여기선 제외해도 됨
      headers: omitHeaders(request.headers, ["host", "content-length"]),
      body: body,
      cache: "no-store",
    });

    // 4. 백엔드 응답 데이터 읽기
    const data = await response.arrayBuffer();

    // 5. 클라이언트로 보낼 응답 생성
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
  } catch (error) {
    console.error("[Proxy Error]", error);
    return NextResponse.json({ message: "Internal Server Error in Proxy" }, { status: 500 });
  }
}

// 헤더 정리용 헬퍼 함수 (선택 사항)
function omitHeaders(headers: Headers, keysToOmit: string[]) {
  const newHeaders: Record<string, string> = {};
  headers.forEach((value, key) => {
    if (!keysToOmit.includes(key.toLowerCase())) {
      newHeaders[key] = value;
    }
  });
  return newHeaders;
}

export const GET = proxyHandler;
export const POST = proxyHandler;
export const PUT = proxyHandler;
export const PATCH = proxyHandler;
export const DELETE = proxyHandler;
