import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // DOM 테스트를 위한 환경 설정
    globals: true, // describe, it, expect 등을 전역으로 사용 가능
  },
});
