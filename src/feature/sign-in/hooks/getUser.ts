import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchFromBackend } from "../../../lib/proxyClient";

export async function getUser() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    // 토큰이 없으면 로그인 안 한 상태 (정상)
    if (!accessToken && !refreshToken) return null;

    const { response, newTokens } = await fetchFromBackend(`/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    console.log("MEME", response.status, accessToken, newTokens);

    if (response.status === 401) {
      console.log("Token expired, redirecting to force-logout...");
      redirect("/api/auth/force-logout");
    }

    if (!response.ok) {
      return null;
    } // 에러 나면 그냥 로그인 안 된 걸로 처리

    const userData = await response.json();
    console.log("USERUSERUSER", userData.data);
    return userData.data;
  } catch (error) {
    if (isRedirectError(error)) {
      throw error; // 리다이렉트는 정상 동작이므로 다시 던져서 Next.js가 처리하게 함
    }

    console.warn("User fetch failed (safe handled):", error);
    return null;
  }
}
