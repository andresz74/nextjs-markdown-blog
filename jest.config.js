module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '^.+\\.module\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js', // CSS Modules
        '^@/(.*)$': '<rootDir>/$1',
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // regular CSS (optional)
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
        'app/rss.xml/route.ts',
        'app/atom.xml/route.ts',
        'app/feed.json/route.ts',
        'app/tags/page.tsx',
        'app/tags/[tag]/page.tsx',
        '!**/*.d.ts',
    ],
    coverageThreshold: {
        global: {
            branches: 50,
            functions: 60,
            lines: 65,
            statements: 65,
        },
    },
};
