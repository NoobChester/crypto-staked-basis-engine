/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: './',
  server: {
    host: true,
    port: 3000
  },
  test: {
    globals: true,
    environment: 'node'
  }
});
