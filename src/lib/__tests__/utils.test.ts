// ds-frontend/src/lib/__tests__/utils.test.ts

import { cn } from "@/lib/utils";
import { describe, expect, it } from "vitest";

describe("cn", () => {
  it("클래스 배열과 조건부 클래스를 올바르게 병합해야 합니다", () => {
    // 1. 기본 동작 및 조건부 클래스 테스트
    expect(cn("foo", true && "bar", false && "baz")).toBe("foo bar");
  });

  it("tailwind-merge 규칙에 따라 충돌하는 클래스를 해결해야 합니다", () => {
    // 2. 충돌 클래스 해결 테스트 (예: 'p-4'와 'p-5' 중 마지막이 승리)
    expect(cn("bg-red-500", "p-4", "p-5")).toBe("bg-red-500 p-5");

    // 3. 다양한 타입의 입력 테스트
    expect(cn("text-red-500", null, undefined, ["font-bold", { "text-lg": true }])).toBe(
      "text-red-500 font-bold text-lg"
    );

    // 4. 복잡한 충돌 해결 테스트
    expect(cn("px-2", "py-2", "p-4")).toBe("p-4");
  });

  it("빈 입력이나 정의되지 않은 입력을 처리해야 합니다", () => {
    // 5. 빈 입력 테스트
    expect(cn()).toBe("");
    expect(cn(null, undefined, "", 0, false)).toBe("");
  });
});
