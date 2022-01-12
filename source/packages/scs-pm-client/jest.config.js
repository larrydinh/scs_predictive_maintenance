module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/?(*.)+(spec|test).js?(x)'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup/setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  // moduleNameMapper: {
  //   '\\.(css|less|sass|scss)$': '<rootDir>/src/__tests__/__mocks__/styleMock.js',
  // },
  displayName: {
    name: 'SCSPMClientTests',
    color: 'blue',
  },
  collectCoverage: true,
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'SCSPMClientTests',
        outputDirectory: '../test-results',
        outputName: 'scs-pm-client-test-report.xml',
      },
    ],
  ],
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/', '<rootDir>/src/_tests_/common'],
}
