module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    },
    moduleDirectories: ['node_modules', 'src'],
    modulePaths: ['<rootDir>/src'],
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', { configFile: './babel-jest.config.js' }],
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(react-markdown|' +
        'remark-gfm|' +
        'remark-.*|' +
        'rehype-.*|' +
        'unist-util-.*|' +
        'devlop|' +
        'hast-util-.*|' +
        'estree-util-is-identifier-name|' +
        'property-information|' +
        'space-separated-tokens|' +
        'comma-separated-tokens|' +
        'escape-string-regexp|' +
        'vfile-message|' +
        'html-url-attributes|' +
        'mdast-util-.*|' +
        'micromark.*|' +
        'decode-named-character-reference|' +
        'trim-lines|' +
        'unified|' +
        'bail|' +
        'is-plain-obj|' +
        'trough|' +
        'vfile|' +
        'markdown-table|' +
        'zwitch|' +
        'longest-streak|' +
        'react-syntax-highlighter|' +
        'ccount)/)',
    ],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    collectCoverage: false,
    collectCoverageFrom: [
        'components/**/*.{js,jsx,ts,tsx}',
        'utils/**/*.{js,jsx,ts,tsx}',
        '!**/*.d.ts',
    ],
    // coverageThreshold: {
    //     global: {
    //         branches: 80,
    //         functions: 80,
    //         lines: 80,
    //         statements: 80,
    //     },
    // },
};
