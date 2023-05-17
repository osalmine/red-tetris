/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable max-len */
import type { Config } from 'jest';

export default {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    'test/(.*)': '<rootDir>/src/test/$1',
  },

  // A list of paths to directories that Jest should use to search for files in
  roots: ['src'],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['jest-extended/all', 'core-js', '@testing-library/jest-dom/extend-expect'],

  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}],
  },

  testEnvironment: 'jsdom',
} satisfies Config;
