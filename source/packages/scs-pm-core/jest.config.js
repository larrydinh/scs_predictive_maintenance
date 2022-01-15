module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/?(*.)+(spec|test).js?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  displayName: {
    name: 'SCSPMCoreTests',
    color: 'green',
  },
  collectCoverage: true,
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'SCSPMCoreTests',
        outputDirectory: '../test-results',
        outputName: 'scs-pm-core-test-report.xml',
      },
    ],
  ],
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
}
