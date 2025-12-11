import { fetchFromBackend } from "@/lib/proxyClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // 1. 프론트엔드에서 보낸 회원가입 데이터 받기
    const body = await request.json();

    // 2. 백엔드 API 호출 (래퍼 함수 사용)
    // 회원가입이므로 토큰 없이 요청이 전송됩니다.
    // 백엔드 엔드포인트가 '/users' 인지 '/auth/sign-up' 인지 확인 필요 (여기선 '/users'로 가정)
    const { response } = await fetchFromBackend("/users/signup", {
      method: "POST",
      body: JSON.stringify(body),
    });

    // 3. 백엔드 응답 처리
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          success: false,
          message: errorData.message || "회원가입 실패",
          error: errorData,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // 4. 성공 응답 반환
    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Signup Proxy Error:", error);
    return NextResponse.json(
      { success: false, message: "서버 내부 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
