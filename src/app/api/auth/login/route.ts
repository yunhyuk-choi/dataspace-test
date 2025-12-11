import { BACKEND_URL } from "@/lib/proxyClient";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.id && body.id.includes("@")) {
      body.email = body.id;
      delete body.id;
    } else {
      body.username = body.id;
      delete body.id;
    }

    const backendRes = await fetch(`${BACKEND_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    console.log("backendRes", backendRes);
    if (!backendRes.ok)
      return NextResponse.json({ message: "Failed Login" }, { status: backendRes.status });

    // const { accessToken, refreshToken } = await backendRes.json();
    const { data: res } = await backendRes.json();

    const cookieStore = await cookies();

    cookieStore.set("accessToken", res.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(res.accessTokenExpiresAt),
      path: "/",
    });

    if (res.refreshToken) {
      cookieStore.set("refreshToken", res.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(res.refreshTokenExpiresAt),
        path: "/",
      });
    }

    return NextResponse.json({ success: true, message: "Login Success" });
  } catch (error) {
    console.error("Login Proxy Error: ", error);
    return NextResponse.json({ message: "Internal Server Error (NEXT)" }, { status: 500 });
  }
}
