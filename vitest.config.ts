import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    environment: "jsdom", // 브라우저 환경 시뮬레이션
    globals: true, // describe, it, expect 등을 전역으로 사용
    setupFiles: "./vitest.setup.ts", // 초기 설정 파일 지정
    alias: {
      "@": path.resolve(__dirname, "./src"), // Next.js의 alias(@) 매핑
    },
    // Storybook 관련 설정이 필요하다면 추가 (선택사항)
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    // projects: [
    //   {
    //     extends: true,
    //     plugins: [
    //       // The plugin will run tests for the stories defined in your Storybook config
    //       // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
    //       storybookTest({ configDir: path.join(dirname, ".storybook") }),
    //     ],
    //     test: {
    //       name: "storybook",
    //       browser: {
    //         enabled: true,
    //         headless: true,
    //         provider: playwright({}),
    //         instances: [{ browser: "chromium" }],
    //       },
    //       setupFiles: [".storybook/vitest.setup.ts"],
    //     },
    //   },
    // ],
  },
});
