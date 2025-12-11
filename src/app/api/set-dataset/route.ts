import { DatasetFormType } from "@/feature/data-asset-upload/main-panel/types/formInterfaces";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const dataPath = () => path.join("./public/test-set", "catalog.json");

const readData = () => {
  try {
    const data = fs.readFileSync(dataPath(), "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("파일 읽기 오류:", error);
    return [];
  }
};

const writeData = <T>(data: T) => {
  try {
    fs.writeFileSync(dataPath(), JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("파일 쓰기 오류:", error);
  }
};

export async function POST(request: Request) {
  const item = await request.json();
  const data = readData();
  data.push(item);
  writeData<typeof data>(data);

  return NextResponse.json({ message: "데이터 추가 완료", data });
}

export async function GET(request: NextRequest) {
  const data = readData();
  const { searchParams } = new URL(request.url);
  if (!searchParams.get("id")) return NextResponse.json({ data });
  return NextResponse.json({
    data: data.find((item: DatasetFormType) => item.id === searchParams.get("id")) ?? {},
  });
}
