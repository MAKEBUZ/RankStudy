import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { env: { DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://rankstudy:rankstudy_local@localhost:5432/rankstudy', NODE_ENV: 'test' }, testTimeout: 15000, fileParallelism: false } });
