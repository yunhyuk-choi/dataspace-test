import { cookies } from "next/headers";

export const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:8081/api/v1";

// 백엔드 요청을 처리하는 래퍼 함수
export async function fetchFromBackend(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // 1. 첫 번째 요청 시도
  const initialHeaders = {
    ...options.headers,
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  let response = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers: initialHeaders,
  });

  // 2. 401 발생 시 토큰 갱신 시도
  if (response.status === 401 && refreshToken) {
    console.log("Access Token expired, trying to refresh...");

    // 리프레시 토큰으로 갱신 요청
    const refreshResponse = await fetch(`${BACKEND_URL}/users/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }), // 혹은 헤더에 넣거나 백엔드 스펙에 맞춤
    });

    if (!refreshResponse.ok) {
      console.log("Refresh failed. User must login again.");
      return { response, newTokens: null };
    }

    console.log("<DATA>hello", refreshResponse, refreshResponse.json());
    const data = await refreshResponse.json();
    const newAccessToken = data.accessToken;
    const newRefreshToken = data.refreshToken; // 만약 리프레시 토큰도 같이 갱신된다면

    // 갱신된 토큰 쿠키에 저장 (Next.js 응답에 실어보내기 위해 일단 쿠키 스토어 갱신)
    // 주의: Route Handler에서는 response에 set-cookie 헤더를 심어야 클라이언트에 반영됨
    // 여기서는 '재요청'을 위해 변수만 업데이트하고,
    // 최종 응답을 내보낼 때 쿠키를 세팅하는 로직이 필요함.

    // 3. 갱신된 토큰으로 재요청 (Retry)
    const newHeaders = {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${newAccessToken}`,
    };

    response = await fetch(`${BACKEND_URL}${endpoint}`, {
      ...options,
      headers: newHeaders,
    });

    // 재요청 성공 시, 반환할 응답 객체에 새 토큰 쿠키 세팅 정보를 담아서 반환해야 함
    // (이 부분은 아래 route.ts 예시에서 처리하는 게 깔끔합니다)
    return {
      response,
      newTokens: { accessToken: newAccessToken, refreshToken: newRefreshToken },
    };
  }

  return { response, newTokens: null };
}
