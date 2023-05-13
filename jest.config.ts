import type { Config } from 'jest';

const config = {
  projects: ['<rootDir>/client', '<rootDir>/server'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/test/'],
} satisfies Config;

export default config;