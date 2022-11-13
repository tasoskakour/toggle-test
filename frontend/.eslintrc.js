module.exports = {
    extends: [
        'airbnb',
        'plugin:react/recommended',
        'airbnb/base',
        'prettier',
        'prettier/prettier',
        'plugin:prettier/recommended',
    ],
    env: {
        browser: true,
        es2021: true,
    },
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks', '@emotion'],
    rules: {
        indent: 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/no-unknown-property': ['error', { ignore: ['css'] }],
        'react/function-component-definition': [
            2,
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function',
            },
        ],
    },
};
