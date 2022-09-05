import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest/presets/js-with-ts',
  collectCoverage: true,

  collectCoverageFrom: [
    'src/helpers/**/*.{ts,tsx}',
    'src/apis/**/*.{ts,tsx}',
    'src/hooks/**/*.{ts,tsx}',
    'src/contexts/**/*.{ts,tsx}',

    // 'src/**/*.{ts,tsx}',
    // '!src/validations/**/*.{ts,tsx}',
    // '!src/typings/**/*.{ts,tsx}',
    // '!src/pages/**/*.{ts,tsx}',
    // '!src/queries/**/*.{ts,tsx}',
    // '!src/styled/**/*.{ts,tsx}',
    // '!src/components/ui/**/*.{ts,tsx}',
    // '!src/components/svgs/**/*.{ts,tsx}',
  ],

  coverageDirectory: 'coverage',
  // testPathIgnorePatterns: ['<rootDir>/src/validations/**/*.{ts,tsx}'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.ts',
    '\\.(css|less)$': '<rootDir>/src/__mocks__/fileMock.ts',
  },
  transform: {
    '^.+\\.[t|j]sx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!(vest|@hookform/resolvers))'],
}

export default config
