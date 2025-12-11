import { BACKEND_URL } from "@/lib/proxyClient";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: "No token <NEXT>" }, { status: 401 });
  }
  try {
    const backendRes = await fetch(`${BACKEND_URL}/users/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ refreshToken: refreshToken }),
      cache: "no-store",
    });

    cookieStore.delete("refreshToken");
    cookieStore.delete("accessToken");

    if (!backendRes.ok)
      return NextResponse.json({ message: "Failed Logout" }, { status: backendRes.status });

    const { data: res } = await backendRes.json();

    return NextResponse.json({ success: true, message: "Logout Success", data: res });
  } catch (error) {
    console.log("Logout Proxy Error: ", error);
    return NextResponse.json({ message: "Internal Server Error(NEXT)" });
  }
}
