/* eslint-disable @typescript-eslint/no-explicit-any */
// ds-frontend/src/hooks/__tests__/use-mobile.test.ts

import { getColumnCount } from "@/hooks/use-mobile";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// 훅 테스트를 위해 @testing-library/react 대신 @testing-library/react-hooks가 유용할 수 있습니다.
// 만약 @testing-library/react-hooks가 설치되어 있지 않다면 (package.json에 없음),
// 일반적인 @testing-library/react의 render 함수를 사용하여 컴포넌트 래핑 방식으로 테스트를 진행해야 합니다.
// 여기서는 일반적인 Vitest 환경에서 테스트합니다.

/**
 * window.innerWidth를 모킹하는 유틸리티 함수
 * @param width 설정할 너비
 */
function mockWindowInnerWidth(width: number) {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
}

/**
 * window.matchMedia를 모킹하는 유틸리티 함수 (useIsMobile에서 사용됨)
 */
function mockMatchMedia() {
  const listeners: ((event: { matches: boolean }) => void)[] = [];
  const mql = {
    matches: false,
    media: "",
    onchange: null,
    addEventListener: vi.fn((event, callback) => {
      if (event === "change") {
        listeners.push(callback as any);
      }
    }),
    removeEventListener: vi.fn((event, callback) => {
      if (event === "change") {
        const index = listeners.indexOf(callback as any);
        if (index > -1) listeners.splice(index, 1);
      }
    }),
    dispatchEvent: vi.fn(),
  };

  window.matchMedia = vi.fn().mockImplementation((query) => {
    // 실제 동작과 유사하게 쿼리를 처리할 수 있지만, 여기서는 단순화합니다.
    // useIsMobile 내부에서 width를 기반으로 isMobile을 설정하므로, matchMedia는 이벤트 리스너 등록만 확인합니다.
    return mql;
  });

  // 이 테스트는 useIsMobile의 로직이 mql.addEventListener와 window.innerWidth에 의존하므로
  // 실제 hook 테스트에서는 @testing-library/react-hooks와 함께 사용하거나
  // 컴포넌트 래퍼를 만들어야 제대로 동작합니다.
  // 하지만 일단 getColumnCount에 집중하고, useIsMobile의 로직 구조를 반영합니다.

  // `renderHook`이 없는 경우, useIsMobile의 `useEffect`는 초기 렌더링 시에만 실행됩니다.
  // 여기서는 `getColumnCount`에 집중하고, `useIsMobile`은 일반적인 React Test Hook 방식을 가정하고 작성합니다.
  return mql;
}

describe("getColumnCount", () => {
  beforeEach(() => {
    // 테스트 간 독립성을 위해 각 테스트 전 mockMatchMedia를 호출합니다.
    mockMatchMedia();
  });

  afterEach(() => {
    // 모킹된 innerWidth를 원래대로 복원 (필요하다면)
    vi.restoreAllMocks();
  });

  it("모바일 (640px 미만)일 때 1을 반환해야 합니다", () => {
    mockWindowInnerWidth(639);
    expect(getColumnCount()).toBe(1);
  });

  it("태블릿 (640px 이상, 1024px 미만)일 때 2를 반환해야 합니다", () => {
    mockWindowInnerWidth(640);
    expect(getColumnCount()).toBe(2);
    mockWindowInnerWidth(1023);
    expect(getColumnCount()).toBe(2);
  });

  it("데스크톱 (1024px 이상)일 때 2를 반환해야 합니다", () => {
    mockWindowInnerWidth(1024);
    expect(getColumnCount()).toBe(2);
    mockWindowInnerWidth(1920);
    expect(getColumnCount()).toBe(2);
  });

  it("window가 정의되지 않은 경우 (SSR) 1을 반환해야 합니다", () => {
    // window 객체를 임시로 undefined로 설정
    const originalWindow = global.window;
    Object.defineProperty(global, "window", { value: undefined, writable: true });

    expect(getColumnCount()).toBe(1);

    // window 객체 복원
    Object.defineProperty(global, "window", { value: originalWindow, writable: true });
  });
});

// useIsMobile 테스트 (renderHook 라이브러리가 필요)
// 만약 @testing-library/react-hooks를 설치할 수 없다면, 이 테스트는 컴포넌트로 래핑해야 합니다.
// (일반적인 Next.js/React 환경에서 hook 테스트는 renderHook을 사용하는 것이 가장 효율적입니다.)
// 여기서는 `renderHook`이 있다고 가정하고 작성합니다.

/*
describe("useIsMobile", () => {
    let mql: ReturnType<typeof mockMatchMedia>;

    beforeEach(() => {
        vi.useFakeTimers();
        mql = mockMatchMedia();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it("초기 마운트 시 모바일이 아닐 때 false를 반환해야 합니다", () => {
        // MOBILE_BREAKPOINT = 768
        mockWindowInnerWidth(1024); 
        const { result } = renderHook(() => useIsMobile());
        
        // useEffect 내부에서 한 번 상태가 업데이트되므로 act로 묶어야 하지만, 
        // 초기 isMobile이 undefined에서 false로 바뀔 때까지는 이 시점에서는 알기 어렵습니다.
        // 하지만 내부 로직은 window.innerWidth < 768 일 때 true를 설정합니다.
        
        act(() => {
             // useEffect 내부의 초기 설정 (window.innerWidth < 768)에 따라 false가 되어야 합니다.
             // Vitest 환경에서 window.innerWidth가 mockValue로 설정되었으므로, 초기 값은 1024 < 768 이 false이므로 false.
        });

        // 실제 React 환경에서는 useEffect의 초기 실행 후 값이 설정됩니다.
        // renderHook을 사용하면 초기에는 undefined였던 isMobile이 true/false로 설정됩니다.
        expect(result.current).toBe(false);
    });

    it("초기 마운트 시 모바일일 때 true를 반환해야 합니다", () => {
        mockWindowInnerWidth(500); // 500 < 768
        const { result } = renderHook(() => useIsMobile());

        act(() => {
            // useEffect 내부의 초기 설정 (500 < 768)에 따라 true가 되어야 합니다.
        });

        expect(result.current).toBe(true);
    });
});
*/
