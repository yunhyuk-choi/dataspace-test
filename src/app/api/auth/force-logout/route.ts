// src/app/api/auth/force-logout/route.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const cookieStore = await cookies();

  // 1. 쿠키 강제 삭제
  // (옵션들을 설정했을 경우, 삭제할 때도 똑같은 옵션을 줘야 지워지는 경우가 있으니 주의하세요)
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  // 2. 로그인 페이지로 이동
  // 이제 쿠키가 없으므로 Middleware가 /sign-in 진입을 허용할 것입니다.
  redirect("/sign-in");
}
