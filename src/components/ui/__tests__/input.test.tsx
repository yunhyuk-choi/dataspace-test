import { Input } from "@/components/ui/input";
import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

describe("Input Component", () => {
  it("올바르게 렌더링되어야 합니다", () => {
    render(<Input placeholder="이메일을 입력하세요" />);
    const input = screen.getByPlaceholderText("이메일을 입력하세요");
    expect(input).toBeInTheDocument();
  });

  it("사용자 입력을 처리해야 합니다", () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} data-testid="input" />);

    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "test@example.com" } });

    // Change 이벤트가 발생했는지 확인 (핸들러 호출 확인)
    expect(handleChange).toHaveBeenCalledTimes(1);
    // 입력된 값이 실제 DOM에 반영되었는지 확인
    expect(input).toHaveValue("test@example.com");
  });

  it("비활성화(disabled) 상태를 반영해야 합니다", () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
  });

  it("type 속성을 올바르게 적용해야 합니다", () => {
    render(<Input type="password" placeholder="Password" />);
    expect(screen.getByPlaceholderText("Password")).toHaveAttribute("type", "password");
  });

  it("ref를 올바르게 전달해야 합니다", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
