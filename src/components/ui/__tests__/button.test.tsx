// ds-frontend/src/components/ui/__tests__/button.test.tsx

import { Button, buttonVariants } from "@/components/ui/button";
import { render, screen } from "@testing-library/react";
import Link from "next/link";
import { describe, expect, it } from "vitest";

describe("buttonVariants", () => {
  // 기본 클래스 (모든 버튼에 적용되는 공통 스타일)
  const baseClasses =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";

  it("기본 prop으로 올바른 클래스 문자열을 생성해야 합니다 (defaultVariants)", () => {
    // defaultVariants: variant: "default", size: "huge", color: "primary", style: "filled"
    const expectedClasses = `${baseClasses} bg-primary-500 text-primary-500 hover:bg-primary/90 btn-xl px-[1.25rem] py-[17px] bg-primary-500 text-primary-500 border-primary-500 hover:bg-primary-600 focus-visible:bg-primary-700 disabled:bg-primary-100 text-white border-none`;

    // cva 호출 결과는 중복된 클래스를 포함할 수 있으므로, cn으로 병합된 결과를 예상합니다.
    // 하지만 button.tsx에서는 buttonVariants()의 결과를 cn으로 감싸서 사용합니다.
    // cva 자체의 결과가 아닌, cn이 적용된 결과를 테스트하는 것이 더 정확합니다.
    // 여기서는 cva 호출 결과만 테스트하여 각 변형의 클래스가 포함되는지 확인합니다.

    const resultClasses = buttonVariants({});

    expect(resultClasses).toContain("bg-primary-500 text-primary-500 hover:bg-primary/90"); // variant: default
    expect(resultClasses).toContain("btn-xl px-[1.25rem] py-[17px]"); // size: huge
    expect(resultClasses).toContain("text-primary-500 border-primary-500"); // color: primary
    expect(resultClasses).toContain("text-white border-none"); // style: filled
  });

  it("destructive variant와 small size를 올바르게 적용해야 합니다", () => {
    const resultClasses = buttonVariants({ variant: "destructive", size: "small" });

    expect(resultClasses).toContain(
      "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60"
    );
    expect(resultClasses).toContain("caption-lr px-[0.75rem] py-[0.5rem]");
  });

  it("outline style과 secondary color를 올바르게 적용해야 합니다", () => {
    const resultClasses = buttonVariants({ style: "outlined", color: "secondary" });

    expect(resultClasses).toContain(
      "border border-solid border-1 bg-transparent hover:bg-primary-600/8 focus-visible:bg-primary-700/16"
    );
    expect(resultClasses).toContain(
      "bg-neutral-500 text-neutral-500 border-neutral-500 hover:bg-neutral-600 focus-visible:bg-neutral-700 disabled:bg-neutral-100"
    );
  });
});

describe("Button Component", () => {
  it("버튼 텍스트를 올바르게 렌더링해야 합니다", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole("button", { name: /Click Me/i })).toBeInTheDocument();
  });

  it("기본 클래스를 적용해야 합니다", () => {
    // defaultVariants에 해당하는 클래스가 적용되었는지 확인
    render(<Button data-testid="button-test">Test</Button>);
    const button = screen.getByTestId("button-test");
    // 기본 variant: default, size: huge, color: primary, style: filled의 클래스가 포함되어야 합니다.
    expect(button).toHaveClass("btn-xl px-[1.25rem] py-[17px]"); // size: huge
    expect(button).toHaveClass("text-white border-none"); // style: filled
    expect(button).toHaveClass("bg-primary-500"); // color: primary & variant: default의 일부 (cn으로 병합되어 최종적으로 남는 클래스)
  });

  it("사용자 정의 className을 적용해야 합니다", () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole("button", { name: /Custom/i })).toHaveClass("custom-class");
  });

  it("asChild prop이 있을 때 Slot으로 렌더링되어야 합니다", () => {
    // asChild를 사용하려면 button 대신 다른 요소로 렌더링됨을 테스트합니다.
    render(
      <Button asChild>
        <Link href="/test" data-testid="link-test">
          Link Button
        </Link>
      </Button>
    );

    const link = screen.getByTestId("link-test");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/test");

    // 버튼 관련 클래스도 <a> 태그에 적용되어야 합니다.
    expect(link).toHaveClass("inline-flex items-center");
    expect(link).toHaveClass("btn-xl px-[1.25rem] py-[17px]");
  });

  it("disabled prop을 올바르게 적용해야 합니다", () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByRole("button", { name: /Disabled Button/i })).toBeDisabled();
  });
});
