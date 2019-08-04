module.exports = {
    root: true,
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },
    parserOptions: {
        ecmaVersion: 2017
    },
    extends: [
        'eslint:recommended'
    ],
    rules: {
        'semi': 'warn',
        'no-unused-vars': 'warn',
        'no-multiple-empty-lines': ['warn', { 'max': 1 }],
        'indent': ['warn', 4, { "SwitchCase": 1 }],
        'quotes': ['warn', 'single'],
        'no-console': ['error', { allow: ['error'] }]
    }
}
