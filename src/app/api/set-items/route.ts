import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const dataPath = (fileName: string) => path.join("./public/test-set", fileName);

const readData = (fileName: string) => {
  try {
    const data = fs.readFileSync(dataPath(fileName), "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("파일 읽기 오류:", error);
    return [];
  }
};

const writeData = <T>(data: T, fileName: string) => {
  try {
    fs.writeFileSync(dataPath(fileName), JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("파일 쓰기 오류:", error);
  }
};

export async function POST(request: Request) {
  const item = await request.json();
  const fileName = `${item.target}.json`;
  const data = readData(fileName);
  data.push(item.data);
  writeData<typeof data>(data, fileName);

  return NextResponse.json({ message: "아이템 추가 완료", data });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileName = `${searchParams.get("target")}.json`;
  const data = readData(fileName);

  return NextResponse.json({ data });
}
