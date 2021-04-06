module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        'no-unused-vars': 'warn',
        'react/prop-types': 'warn',
        indent: ['warn', 4],
        'no-console': 'warn',
    },
};
