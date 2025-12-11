import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Card Component", () => {
  it("Card의 모든 서브 컴포넌트가 올바르게 렌더링되어야 합니다", () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>카드 제목</CardTitle>
          <CardDescription>카드 설명입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>카드 내용입니다.</p>
        </CardContent>
        <CardFooter>
          <button>확인</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByText("카드 제목")).toBeInTheDocument();
    expect(screen.getByText("카드 설명입니다.")).toBeInTheDocument();
    expect(screen.getByText("카드 내용입니다.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument();
  });

  it("커스텀 className이 병합되어야 합니다", () => {
    render(
      <Card className="custom-class bg-red-500" data-testid="card">
        <CardContent className="p-10">Content</CardContent>
      </Card>
    );

    const card = screen.getByTestId("card");
    expect(card).toHaveClass("bg-red-500");
    expect(card).toHaveClass("custom-class");
    // 기본 스타일(bg-card 등)도 유지되는지 확인 (실제 구현에 따라 다름)
    // expect(card).toHaveClass('bg-card');
  });
});
