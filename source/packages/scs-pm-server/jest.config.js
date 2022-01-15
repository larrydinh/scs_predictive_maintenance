module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/?(*.)+(spec|test).js?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  displayName: {
    name: 'SCSPMServerTests',
    color: 'magenta',
  },
  collectCoverage: true,
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'SCSPMServerTests',
        outputDirectory: '../test-results',
        outputName: 'scs-pm-server-test-report.xml',
      },
    ],
  ],
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
}
