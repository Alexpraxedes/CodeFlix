export default {
    displayName: {
      name: 'NEST',
      color: 'magentaBright',
    },
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\..*spec\\.ts$',
    transform: {
      '^.+\\.(t|j)s$': '@swc/jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageProvider: "v8",
    coverageDirectory: '../__coverage',
    testEnvironment: 'node',
    moduleNameMapper: {
        'micro\\-videos/(.*)$': '<rootDir>/../../../node_modules/micro-videos/dist/$1',
    }
};